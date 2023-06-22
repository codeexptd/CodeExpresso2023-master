// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { generateNav, getThemeMusic, createFunctionality, addVolumeSliders } from './themes.js';
// import { getUser, addBackButton, addProfileButtonFunc } from './firebase/userEssentials';
// import { getAudioObj, updateSliderVolume, useMusicVolume, addVolSettingsFunc, addVolumeSliders} from './general/audioEssentials';
import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, db } from './firebase/userEssentials';
import { getCompletedLevels } from './utils/utils';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore';
import { setCookie, getCookie } from './general/cookies';
import { filterByDifficulty } from './utils/utils';
import { getAllTotalLevels } from './utils/utils';
import { getDifficultyPanel } from './utils/utils';
import { isLoggedIn } from "./utils/utils";
// import { displayNotif, closeNotif } from './general/notifs';

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";
import { Categories } from "./utils/categories";
import { getTilesLength } from "./utils/utils";

// -------------------------------------

// ********** ESSENTIALS **********
// essentials
isLoggedIn();
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
addAudioElementToBody("background-music", getAudioSrc("mute"));

// sound effects
addSoundEffect("btn-sound");



document.getElementById("profile").addEventListener("click", function(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
    
        addProfileButtonFunctionality(user);
      } else {
        addProfileButtonFunctionality(user);
      }
    });
});

// -------------------------------------------------


const levelSelect = document.getElementsByClassName("level-select");
for (let index = 0; index < levelSelect.length; index++) {
    const element = levelSelect[index];
    element.addEventListener('mouseover', function(){
        this.style.borderColor = "white";
    });
    element.addEventListener('mouseout', function(){
        this.style.borderColor = "gray";
    });
    element.addEventListener('click', function(){
      var link = this.getAttribute("data-id");
      var diff = this.getAttribute("data-diff");
      var cat = this.getAttribute("data-cat");
      let isDisabled = this.getAttribute("data-disable");
      if (isDisabled == "isdisabled") {
        return;
      } 
        setTimeout(() => {
            location.href = `seqprog.html?cat=${cat}&diff=${diff}`;
        }, 300);
    });
}

//Check if we already unlocked the medium, and hard per category
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      let isCompleted = Object.values(Categories).map(async (cat) => {
        let completedLvl = await getCompletedLevels(docSnap, cat.name);
        return {
          name: cat.name,
          completedLevels: filterByDifficulty(completedLvl),
        };
      })

      let userCompletedLevels = await Promise.all(isCompleted);

      //Total of levels per category and difficulty
      let totalLevels = await getAllTotalLevels();

      
      let finished = [];
      for (let i = 0; i < totalLevels.length; i++) {
        if (totalLevels[i].easy == userCompletedLevels[i].completedLevels.easy) {
          finished.push({ cat: totalLevels[i].name, diff: "medium" });
        } else if (
          totalLevels[i].medium == userCompletedLevels[i].completedLevels.medium
        ) {
          finished.push({ cat: totalLevels[i].name, diff: "hard" });
        } 
      }

      finished.map((fin) => {
        getDifficultyPanel(levelSelect, fin.cat, fin.diff);
      })
    }
  }
});


//add links with button sound effect
// function addButtonFunc(){
//     const buttons = document.getElementsByClassName('menu');

//     Array.from(buttons).forEach(function(element) {
//         element.addEventListener('click', (e) => {
//             const assignedPath = element.id.split("_");
//             const path = assignedPath[0]+"-"+assignedPath[1]+".html";
//             console.log(path);
//             setTimeout(function() {
//                 location.href = path;
//             }, 300);
//         });
//     });
// }
// addButtonFunc();