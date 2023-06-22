import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast, showToasts } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, db, signOutUser, checkForBadges } from './firebase/userEssentials';

import { onAuthStateChanged, signOut, multiFactor, getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { isLoggedIn } from './utils/utils';
import { Modal, Toast } from 'bootstrap';
import $, { error } from 'jquery';

import { jsPDF } from "jspdf";

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/profile.css";

import defaultPic from "../assets/images/default_profile_pic.png"

// ********** ESSENTIALS **********
// essentials
isLoggedIn();
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
addAudioElementToBody('background-music', getAudioSrc('mute'));

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

// -------------------------------------
showToasts()

// SHOW CONTENT SELECTION
const radioButtons = document.getElementsByClassName('nes-radio');
const contentContainers = document.getElementsByClassName('contentContainer');

//show selected content when radio button option is clicked
for (let index = 0; index < radioButtons.length; index++) {
    const element = radioButtons[index];
    //show currently selected radio option on page load
    // console.log(element, element.checked);
    if(element.checked){
        // console.log("checked");
        if(element.value=="Profile"){
            document.getElementById('contentTitle').innerHTML = "Profile"
            document.getElementById("profile2").style.display = "block";
        }else{
            document.getElementById('contentTitle').innerHTML = element.value;
            document.getElementById(element.value.toLowerCase()).style.display = "block";
        }
    }
    element.addEventListener('click', function(){
        document.getElementById('contentTitle').innerHTML = this.value;
        for (let index = 0; index < contentContainers.length; index++) {
            const element = contentContainers[index];
            element.style.display = "none";
        }
        if(this.value=="Profile"){
            document.getElementById("profile2").style.display = "block";
        }else{
            document.getElementById(this.value.toLowerCase()).style.display = "block";
        }
        
    });
}

//array of badges/themes/backgrounds
const docRef = doc(db, "badgesList", "badges");
const docSnap = await getDoc(docRef);

//get user info
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);

        //2fa
        showRegisteredFactors(user);
    
        const docRefUser = doc(db, "users", user.uid); //USER
        const docSnapUser = await getDoc(docRefUser);

        //display name
        document.getElementById("displayName").innerHTML = docSnapUser.data().username;

        //display points
        document.getElementById("displayPoints").innerHTML = docSnapUser.data().points;

        //display user image
        if(docSnapUser.data().profilePicture!=""){
            document.getElementById("userProfilePic").src = docSnapUser.data().profilePicture;
            document.getElementById("uploadUserProfileImage").src = docSnapUser.data().profilePicture;
        }else{
            document.getElementById("userProfilePic").src = defaultPic;
            document.getElementById("uploadUserProfileImage").src = defaultPic;
        }
        //display name
        document.getElementById("nameInput").value = docSnapUser.data().username;

        //display email
        document.getElementById("emailInput").value = user.email;

        //display badges
        showBadges(docSnapUser.data().earnedBadges, docSnap.data().badgesArray);
        function showBadges(userBadges, badgesArray){
            console.log("hello")
            var badgesContainer = document.getElementById('badgesContainer');

            if(userBadges == null || userBadges == ""){
                userBadges = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = badgesArray;
            let unlocked = [];
            let locked = [];

            //sort badges
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userBadges.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            let totalEarnedBadges = unlocked.length;
            let totalBadges = arr.length;
            document.getElementById('badgesEarnedProgress').value = totalEarnedBadges;
            document.getElementById('badgesEarnedProgress').max = totalBadges;
            document.getElementById('badgesEarned').innerHTML = totalEarnedBadges+"/"+totalBadges+" Badges Earned";

            //show unlocked badges
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                // var id = element.id;
                var name = element.name;
                var description = element.description;
                var srcPicture = element.srcPicture;
                badgesContainer.innerHTML+=
                `
                <div class="nes-container is-dark" style="background-color: black;height:6rem;padding:0.1rem 0.8rem 0.1rem;display:grid;align-items:center;grid-template-columns: 7% 93%;margin-bottom:1rem;" >
                    <div>
                        <img style="height:5rem;width:5rem" src="`+srcPicture+`">
                    </div>
                    <div style="width:50rem;">
                        <span>`+name+`</span><br>
                        <span style="font-size: small;opacity: 0.9;">`+description+`</span>
                    </div>
                </div>
                `;
            }
            // console.log(locked);
            //show locked badges
            for (let index = 0; index < locked.length; index++) {
                const element = locked[index];
                // var id = element.id;
                var name = element.name;
                var description = element.description;
                var srcPicture = element.srcPicture;
                badgesContainer.innerHTML+=
                `
                <div class="nes-container is-dark" style="background-color: black;height:6rem;padding:0.1rem 0.8rem 0.1rem;display:grid;align-items:center;grid-template-columns: 7% 93%;margin-bottom:1rem;opacity:0.8;" >
                    <div>
                        <img style="height:5rem;width:5rem" src="`+srcPicture+`">
                    </div>
                    <div style="width:50rem;">
                        <span>`+name+`</span><br>
                        <span style="font-size: small;opacity: 0.9;">`+description+`</span>
                    </div>
                </div>
                `;
            }
        }

        //display owned themes + add click event listeners
        showThemes(docSnapUser.data().ownedThemes, docSnap.data().themesArray, docSnapUser.data().theme);
        function showThemes(userThemes, themesArray, selected){
            var themesContainer = document.getElementById('themesContainer');

            if(userThemes == null || userThemes == ""){
                userThemes = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = themesArray;
            let unlocked = [];
            let locked = [];

            //sort themes
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userThemes.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show unlocked themes
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                var id = element.id;
                var name = element.name;
                var srcPicture = element.srcPicture;
                // console.log(selected, id)
                // console.log(selected==id)
                if(selected==id){
                    themesContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title theme-item" data-id="`+id+`" style="background-color: black;height:17rem;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }else{
                    themesContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title theme-item" data-id="`+id+`" style="background-color: black;height:17rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }
                
            }

            var themeItems = document.getElementsByClassName("theme-item")
            for (let index = 0; index < themeItems.length; index++) {
                const element = themeItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");

                    //deselect all
                    for (let index = 0; index < themeItems.length; index++) {
                        const element = themeItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";
                    

                    onAuthStateChanged(auth, async(user) => {
                        if (user) {
                            const ref = doc(db, "users", user.uid); //user
                            await updateDoc(ref, {
                                theme: itemID
                            });
                        }
                    });
                })
            }
        }

        //display owned themes + add click event listeners
        showSkins(docSnapUser.data().ownedSkins, docSnap.data().skinsArray, docSnapUser.data().skin);
        function showSkins(userSkins, skinsArray, selected){
            var skinsContainer = document.getElementById('skinsContainer');

            if(userSkins == null || userSkins == ""){
                userSkins = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = skinsArray;
            let unlocked = [];
            let locked = [];

            //sort themes
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userSkins.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show unlocked themes
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                var id = element.id;
                var name = element.name;
                var srcPicture = element.srcPicture;
                // console.log(selected, id)
                // console.log(selected==id)
                if(selected==id){
                    skinsContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title skin-item" data-id="`+id+`" style="background-color: black;height:17rem;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="height:100%;">
                    </div>
                    `;
                }else{
                    skinsContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title skin-item" data-id="`+id+`" style="background-color: black;height:17rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="height:100%;">
                    </div>
                    `;
                }
                
            }

            var skinItems = document.getElementsByClassName("skin-item")
            for (let index = 0; index < skinItems.length; index++) {
                const element = skinItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");

                    //deselect all
                    for (let index = 0; index < skinItems.length; index++) {
                        const element = skinItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";
                    

                    onAuthStateChanged(auth, async(user) => {
                        if (user) {
                            const ref = doc(db, "users", user.uid); //user
                            await updateDoc(ref, {
                                skin: itemID
                            });
                        }
                    });
                })
            }
        }

        //display owned backgrounds + add click event listeners
        showBackgrounds(docSnapUser.data().ownedBackgrounds, docSnap.data().backgroundsArray, docSnapUser.data().background);
        async function showBackgrounds(userBackgrounds, backgroundsArray, selected){
            var backgroundsContainer = document.getElementById('backgroundsContainer');

            if(userBackgrounds == null || userBackgrounds == ""){
                userBackgrounds = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = backgroundsArray;
            let unlocked = [];
            let locked = [];

            //sort background
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userBackgrounds.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show unlocked background
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                var id = element.id;
                var name = element.name;
                var srcPicture = element.srcPicture;

                if(id==selected){
                    backgroundsContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title background-item" data-id="`+id+`" style="background-color: black;height:17rem;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }else{
                    backgroundsContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title background-item" data-id="`+id+`" style="background-color: black;height:17rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }
                
            }

            var backgroundItems = document.getElementsByClassName("background-item")
            for (let index = 0; index < backgroundItems.length; index++) {
                const element = backgroundItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");

                    //deselect all
                    for (let index = 0; index < backgroundItems.length; index++) {
                        const element = backgroundItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";

                    //update UI
                    displayBackground(itemID);

                    onAuthStateChanged(auth, async(user) => {
                        if (true) {
                            const ref = doc(db, "users", user.uid); //user
                            await updateDoc(ref, {
                                background: itemID
                            });
                        }
                    });
                })
            }
        }

        //display background behind user avatar
        displayBackground(docSnapUser.data().background);
        function displayBackground(background){
            if(background==""||background==null){
                return
            }
            let backgroundsArr = docSnap.data().backgroundsArray;
            for (let index = 0; index < backgroundsArr.length; index++) {
                const element = backgroundsArr[index];
                if(element.id == background){
                    document.getElementById("userBackground").style.backgroundColor = "rgb("+element.rgb+")";
                }
            }
            
        }

        //show reports
        let prog1 = docSnapUser.data().completedLevels1.length
        document.getElementById("progress1").value = prog1;
        document.getElementById("progress1text").innerHTML = "Flowcharts & Pseudocode: "+prog1+"/30";
        let prog2 = docSnapUser.data().completedLevels2.length
        document.getElementById("progress2").value = prog2;
        document.getElementById("progress2text").innerHTML = "Basic Syntax: "+prog2+"/30";
        let prog3 = docSnapUser.data().completedLevels3.length
        document.getElementById("progress3").value = prog3;
        document.getElementById("progress3text").innerHTML = "Variables: "+prog3+"/30";
        let prog4 = docSnapUser.data().completedLevels4.length
        document.getElementById("progress4").value = prog4;
        document.getElementById("progress4text").innerHTML = "Data Types: "+prog4+"/30";
        let prog5 = docSnapUser.data().completedLevels5.length
        document.getElementById("progress5").value = prog5;
        document.getElementById("progress5text").innerHTML = "Operators: "+prog5+"/30";
        let prog6 = docSnapUser.data().completedLevels6.length
        document.getElementById("progress6").value = prog6;
        document.getElementById("progress6text").innerHTML = "Conditional Statements: "+prog6+"/30";
        let prog7 = docSnapUser.data().completedLevels7.length
        document.getElementById("progress7").value = prog7;
        document.getElementById("progress7text").innerHTML = "Loops: "+prog7+"/30";
        let prog8 = docSnapUser.data().completedLevels8.length
        document.getElementById("progress8").value = prog8;
        document.getElementById("progress8text").innerHTML = "Methods: "+prog8+"/30";
        let prog9 = docSnapUser.data().completedLevels9.length
        document.getElementById("progress9").value = prog9;
        document.getElementById("progress9text").innerHTML = "Arrays: "+prog9+"/30";
        let prog10 = docSnapUser.data().completedLevels10.length
        document.getElementById("progress10").value = prog10;
        document.getElementById("progress10text").innerHTML = "String Manipulation: "+prog10+"/30";

        let overallProg = prog1 + prog2 + prog3 + prog4 + prog5 + prog6 + prog7 + prog8 + prog9 + prog10;
        document.getElementById("levelsCompletedProgress").value = overallProg;
        document.getElementById("levelsCompleted").innerHTML = overallProg + "/300 Levels Completed"

        // generateReportPDF
        document.getElementById("print").addEventListener('click', function(){
            generateReportPDF(user, docSnapUser);
        });
        

        let historyArray = docSnapUser.data().history;
        //show newest first
        historyArray.reverse();

        let historyContainer = document.getElementById("historyContainer");
        for (let index = 0; index < historyArray.length; index++) {
            const element = historyArray[index];

            let timestamp = element.dateTime;
            let date = timestamp.toDate();
            let dateFormat = date.getHours() + ":" + ("0"+date.getMinutes()).slice(-2) + " "+ date.toDateString();

            let description = element.description;
            historyContainer.innerHTML +=
            `
            <div class="nes-container is-dark" style="background-color: #121212;width:80rem;display:grid;grid-template-columns: 30% 70%;">
                <span>`+dateFormat+`</span>
                <span>`+description+`</span>
            </div>
            `;
        }

    }
});

// GENERATE PDF
function generateReportPDF(user, docSnapUser){
    let base64Font = "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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAAAEAAAAAgAAAAAAAgACAAIAAgAAAAAAAAAEAAQAAAAAAAAAAAACAAAAAgAAAAAAAgAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAzMCzQADAAAxESERAzMCzf0zAAIBgAAAAoADAAADAAcAAAEhESEVIRUhAYABAP8AAQD/AAMA/gCAgAACAQABgAMAAwAAAwAHAAABMxEjATMRIwEAgIABgICAAwD+gAGA/oAAAgCAAIADgAMAABsAHwAAATMVITUzFTMVIxUzFSMVIzUhFSM1IzUzNSM1MxcVITUBAIABAICAgICAgP8AgICAgICAAQADAICAgICAgICAgICAgICAgIAAAAEAgAAAA4ADgAAbAAABIRUhFSEVIRUzFSMVIxUhNSE1ITUhNSM1MzUzAYABAAEA/YACAICAgP8A/wACgP4AgICAA4CAgICAgICAgICAgICAAAADAAAAAAOAA4AAAwAdACEAABMhESEBMxEjFSMVIxUjFSMVITUzNTM1MzUzNTM1MwMhESGAAQD/AAKAgICAgICA/wCAgICAgICAAQD/AAOA/wABAP8AgICAgICAgICAgID+AP8AAAAEAAAAAAQAAwAAGQAdACEAKQAAASEVMxUhFSMRMxUhNSMVITUjNTM1MzUjNTsBFTM1FxUzNQUVIxUhNSM1AQABgIABAICA/wCA/gCAgICAgICAgID+gIABgIADAICAgP8AgICAgICAgICAgICAgICAgICAAAEBgAGAAwADAAAHAAABIREjFSE1MwIAAQCA/wCAAwD/AICAAAEBgAAAAwADAAALAAABIRUjETMVITUjETMCAAEAgID/AICAAwCA/gCAgAIAAAABAYAAAAMAAwAACwAAASEVMxEjFSE1MxEjAYABAICA/wCAgAMAgP4AgIACAAAAAQCAAIADAAMAABMAABMhFTM1IREjFTMRITUjFSERMzUjgAEAgAEAgID/AID/AICAAwCAgP8AgP8AgIABAIAAAAEAgACAA4ADAAALAAABIREhFSERIREhNSEBgAEAAQD/AP8A/wABAAMA/wCA/wABAIAAAQGAAAADAAGAAAcAAAEhESMVITUzAgABAID/AIABgP8AgIAAAQCAAYADgAIAAAMAABMhFSGAAwD9AAIAgAABAYAAAAKAAQAAAwAAASERIQGAAQD/AAEA/wAAAQCAAIADAAMAABEAAAEhFSMVIxUjFSMVIxEzNTM1MwIAAQCAgICAgICAgAMAgICAgIABAICAAAACAIAAAAOAAwAACwAXAAABIRUzESMVITUjETsBETMVIxUhESM1MzUBAAIAgID+AICAgICAAQCAgAMAgP4AgIACAP8AgIABAICAAAEBAAAAAwADAAALAAABIREzFSE1MxEjNTMBgAEAgP4AgICAAwD9gICAAYCAAAABAIAAAAOAAwAAFQAAASEVMxEjFSEVIRUhETM1IREhFSE1MwEAAgCAgP6AAgD9AIABgP8A/wCAAwCA/wCAgIABAIABAICAAAABAIAAAAOAAwAAGwAAASEVMxUjFTMRIxUhNSM1IRUhESM1MzUhFSE1MwEAAgCAgICA/gCAAQABAICA/wD/AIADAICAgP8AgICAgAEAgICAgAAAAQCAAAADgAMAAA0AABMhETMRIREzFSMRIREhgAEAgAEAgID/AP6AAwD+gAEA/wCA/wABAAAAAQCAAAADgAMAABMAABMhFSEVIRUzESMVITUjNSEVIREhgAMA/YACAICA/gCAAQABAP4AAwCAgID/AICAgIABAAAAAgCAAAADgAMAAA8AEwAAASEVIRUhFTMRIxUhNSMRMxMRIREBAAIA/oABgICA/gCAgIABAAMAgICA/wCAgAIA/wD/AAEAAAEAgAAAA4ADAAALAAATIRUjESMRIREzESGAAwCAgP8AgP6AAwCA/wD+gAGAAQAAAAMAgAAAA4ADAAATABcAGwAAASEVMxUjFTMRIxUhNSMRMzUjNTsBFSE1AREhEQEAAgCAgICA/gCAgICAgAEA/wABAAMAgICA/wCAgAEAgICAgP8A/wABAAACAIAAAAOAAwAADwATAAABIRUzESMVITUhNSE1IxE7AREhEQEAAgCAgP4AAYD+gICAgAEAAwCA/gCAgICAAQD/AAEAAAIBgACAAoADAAADAAcAAAEhESEVIREhAYABAP8AAQD/AAMA/wCA/wAAAAIBgAAAAoADAAADAAkAAAEhESEVIREjFSMBgAEA/wABAICAAwD/AID/AIAAAQEAAIADAAMAABMAAAEhFSMVIxUzFTMVITUjNSM1MzUzAgABAICAgID/AICAgIADAICAgICAgICAgAAAAgEAAIADgAMAAAMABwAAASERIRUhESEBAAKA/YACgP2AAwD/AID/AAAAAQEAAIADAAMAABMAAAEhFTMVMxUjFSMVITUzNTM1IzUjAQABAICAgID/AICAgIADAICAgICAgICAgAAAAgCAAAADgAMAAA8AEwAAASEVMxEjFSE1IREhFSE1MxMhFSEBAAIAgID+gAEA/wD/AICAAQD/AAMAgP8AgIABAICA/gCAAAEAgAAAA4ADAAATAAABIRUzESMVIREzNSERIRUhNSMRMwEAAgCAgP8AgP8AAgD9gICAAwCA/wCAAQCA/gCAgAIAAAIAgAAAA4ADAAALAA8AAAEhFTMRIREhESEROwERIREBAAIAgP8A/wD/AICAAQADAID9gAEA/wACgP8AAQAAAwCAAAADgAMAAAsADwATAAATIRUzFSMVMxEjFSEBFSE1AREhEYACgICAgID9gAEAAQD/AAEAAwCAgID/AIACgICA/wD/AAEAAAABAIAAAAOAAwAAEwAAASEVMxUhNSERITUhFSMVITUjETMBAAIAgP8A/wABAAEAgP4AgIADAICAgP4AgICAgAIAAAACAIAAAAOAAwAABwALAAATIRUzESMVIQERIRGAAoCAgP2AAQABAAMAgP4AgAKA/gACAAAAAQCAAAADgAMAAAsAABMhFSEVIRUhESEVIYADAP4AAQD/AAIA/QADAICAgP8AgAAAAQCAAAADgAMAAAkAABMhFSEVIRUhESGAAwD+AAEA/wD/AAMAgICA/oAAAQCAAAADgAMAABUAAAEhFTMVITUhESE1IzUhESMVITUjETMBAAIAgP8A/wABAIABgID+AICAAwCAgID+AICA/wCAgAIAAAEAgAAAA4ADAAALAAATIREhESERIREhESGAAQABAAEA/wD/AP8AAwD/AAEA/QABgP6AAAABAQAAAAMAAwAACwAAASEVIxEzFSE1MxEjAQACAICA/gCAgAMAgP4AgIACAAAAAQCAAAADgAMAAA8AAAEhFSMRIxUhNSM1IRUzESEBAAKAgID+gIABAID/AAMAgP4AgICAgAIAAAABAIAAAAOAAwAAFwAAEyERMzUzNSEVIxUjETMVMxUhNSM1IxEhgAEAgIABAICAgID/AICA/wADAP8AgICAgP8AgICAgP8AAAABAIAAAAMAAwAABQAAEyERIRUhgAEAAYD9gAMA/YCAAAEAgAAABAADAAATAAATIRUzFTM1MzUhESERIxUjNSMRIYABAICAgAEA/wCAgID/AAMAgICAgP0AAYCAgP6AAAABAIAAAAOAAwAADwAAEyEVMxUzESERITUjNSMRIYABAICAAQD/AICA/wADAICAAQD9AICA/wAAAAIAgAAAA4ADAAALAA8AAAEhFTMRIxUhNSMROwERIREBAAIAgID+AICAgAEAAwCA/gCAgAIA/gACAAACAIAAAAOAAwAACQANAAATIRUzESMVIREhAREhEYACgICA/oD/AAEAAQADAID/AID/AAKA/wABAAAAAgCAAAADgAMAABEAFwAAASEVMxEjFTMVIzUjFSE1IxE7AREzNTMRAQACAICAgICA/oCAgICAgAMAgP6AgICAgIACAP4AgAGAAAACAIAAAAOAAwAADQARAAATIRUzESMVMxEhESERIQERIRGAAoCAgID/AP8A/wABAAEAAwCA/wCA/wABAP8AAoD/AAEAAAIAgAAAA4ADAAAXABsAAAEhFTMVIxUzESMVITUjNSEVIREhNSM1OwEVITUBAAIAgICAgP4AgAEAAQD+gICAgAGAAwCAgID/AICAgIABAICAgIAAAAEAgAAAA4ADAAAHAAATIRUhESERIYADAP8A/wD/AAMAgP2AAoAAAQCAAAADgAMAAAsAABMhESERIREjFSE1I4ABAAEAAQCA/gCAAwD9gAKA/YCAgAAAAQCAAAADgAMAAA8AABMhESERIREjFSMVITUjNSOAAQABAAEAgID/AICAAwD+AAIA/gCAgICAAAABAIAAAAQAAwAAEwAAEyERMzUzFTMRIREhNSM1IxUjFSGAAQCAgIABAP8AgICA/wADAP6AgIABgP0AgICAgAAAAQCAAAADgAMAAB8AABMhFSE1IRUjFSMVMxUzESM1IzUhFSMVIxEzNTM1IzUjgAEAAQABAICAgICAgP8AgICAgICAAwCAgICAgID/AICAgIABAICAgAABAIAAAAOAAwAADwAAEyERIREhESMVIxEhESM1I4ABAAEAAQCAgP8AgIADAP8AAQD/AID+gAGAgAAAAQCAAAADgAMAABUAABMhFSMVIxUjFSMVIRUhETM1MzUzNSGAAwCAgICAAgD9AICAgP6AAwCAgICAgIABAICAgAAAAQGAAAADAAMAAAcAAAEhFSMRMxUhAYABgICA/oADAID+AIAAAQCAAIADAAMAABEAABMhFTMVMxUzESM1IzUjNSM1I4ABAICAgICAgICAAwCAgID/AICAgIAAAQGAAAADAAMAAAcAAAEhESE1MxEjAYABgP6AgIADAP0AgAIAAAABAQACgAOAA4AACwAAASEVMxUhNSMVITUzAYABgID/AID/AIADgICAgICAAAEAgAAAA4AAgAADAAA3IRUhgAMA/QCAgAAAAQEAAYACgAMAAAcAAAEhETMVITUjAQABAID/AIADAP8AgIAAAgCAAAAEAAKAAA0AEQAAASERMxUhNSMVITUjETsBESERAQACgID/AID+gICAgAEAAoD+AICAgIABgP6AAYAAAAIAgAAAA4ADgAAJAA0AABMhESEVMxEjFSEBESERgAEAAYCAgP2AAQABAAOA/wCA/oCAAgD+gAGAAAABAIAAAAOAAoAAEwAAASEVMxUhNSERITUhFSMVITUjETMBAAIAgP8A/wABAAEAgP4AgIACgICAgP6AgICAgAGAAAACAIAAAAOAA4AACQANAAABIREhNSMRMzUhBREhEQKAAQD9gICAAYD/AAEAA4D8gIABgICA/oABgAAAAgCAAAADgAKAAA8AEwAAASEVMxUjFSEVIRUhNSMROwEVITUBAAIAgID+gAIA/YCAgIABAAKAgICAgICAAYCAgAAAAQEAAAADgAMAAA8AAAEhFSEVMxUjESERIzUzNTMCAAGA/wCAgP8AgICAAwCAgID+gAGAgIAAAgCA/4ADgAKAAA0AEQAAASERIxUhNSE1ITUjETsBESERAQACgID+AAGA/oCAgIABAAKA/YCAgICAAQD/AAEAAAEAgAAAA4ADgAALAAATIREhFTMRIREhESGAAQABgID/AP8A/wADgP8AgP4AAgD+AAAAAgGAAAACgAOAAAMABwAAASEVIRUhESEBgAEA/wABAP8AA4CAgP2AAAIAgP+AAwADgAADAA8AAAEhFSEVIREjFSE1IzUhFTMCAAEA/wABAID+gIABAIADgICA/YCAgICAAAABAIAAAAOAA4AAFQAAEyERITUhFSMVIxUzFTMVITUjNSMRIYABAAEAAQCAgICA/wCAgP8AA4D+gICAgICAgICA/wAAAAEBAAAAAwADgAAHAAABIREhFSE1IwEAAQABAP6AgAOA/QCAgAAAAQAAAAADgAKAABEAABEhFTM1IRUzESERIxEjESMRIQGAgAEAgP8AgICA/wACgICAgP4AAgD+AAIA/gAAAQCAAAADgAKAAAkAABMhFTMRIREhESGAAoCA/wD/AP8AAoCA/gACAP4AAAACAIAAAAOAAoAACwAPAAABIRUzESMVITUjETsBESERAQACAICA/gCAgIABAAKAgP6AgIABgP6AAYAAAgCA/4ADgAKAAAkADQAAEyEVMxEjFSERIQERIRGAAoCAgP6A/wABAAEAAoCA/wCA/wACgP8AAQAAAAIAgP+ABAACgAANABEAAAEhETMVIxUhESE1IxE7AREhEQEAAoCAgP8A/oCAgIABAAKA/gCAgAEAgAEA/wABAAABAIAAAAOAAoAADwAAEyEVMzUhFTMVITUjFSMRIYABAIABAID/AICA/wACgICAgICAgP6AAAABAIAAAAOAAoAAEwAAASEVIRUhFTMVIxUhNSE1ITUjNTMBAAIA/oABgICA/YACAP6AgIACgICAgICAgICAgAAAAQCAAAADgAMAABMAAAEhFSEVIREzNSEVIxUhNSMRIzUzAQABAAEA/wCAAQCA/oCAgIADAICA/oCAgICAAYCAAAEAgAAABAACgAAPAAATIREhESERMxUhNSMVITUjgAEAAQABAID/AID+gIACgP4AAgD+AICAgIAAAQCAAAADgAKAAA8AABMhESERIREjFSMVITUjNSOAAQABAAEAgID/AICAAoD+gAGA/oCAgICAAAABAIAAAAQAAoAAEQAAEyERMxEzETMRIREhNSMVITUjgAEAgICAAQD+gID/AIACgP4AAgD+AAIA/YCAgIAAAAEAgAAAA4ACgAATAAATIRUhNSERIxUzESE1IRUhETM1I4ABAAEAAQCAgP8A/wD/AICAAoCAgP8AgP8AgIABAIAAAAEAgP+AA4ACgAAPAAATIREhESERIxUhNSE1ITUjgAEAAQABAID+AAGA/oCAAoD+gAGA/YCAgICAAAABAIAAAAOAAoAAEwAAEyEVIxUjFSMVIRUhNTM1MzUzNSGAAwCAgIABgP0AgICA/oACgICAgICAgICAgAABAIAAAAMAAwAAEwAAASEVIxUjFTMRMxUhNSMRITUhNTMCAAEAgICAgP8AgP8AAQCAAwCAgID/AICAAQCAgAAAAQGAAAACgAMAAAMAAAEhESEBgAEA/wADAP0AAAEBAAAAA4ADAAATAAABIRUzFSEVIREjFSE1MxEzNSM1IwEAAQCAAQD/AID/AICAgIADAICAgP8AgIABAICAAAABAIABAAOAAoAAEwAAASEVMxUzNTMVIxUhNSM1IxUjNTMBAAEAgICAgP8AgICAgAKAgICAgICAgICAAAADAAAAAAOAA4AAEwAfACcAAAEhFTMVMxEjFSMVITUjNSMRMzUzMRUjETMVITUzESM1BSEVIRUhFSEBAAGAgICAgP6AgICAgICAAYCAgP6AAYD/AAEA/oADgICA/oCAgICAAYCAgP6AgIABgICAgICAAAABAID/gAOAAwAAFQAAASEVMxEzESMVITUzESM1MzUhESERMwEAAYCAgID/AICAgP8A/wCAAwCA/wD/AICAAQCAgP0AAwAAAwEAAAAEAAOAAAcAFQAZAAABIRUzFSE1IxEhETMVITUjFSE1IxE7AREzEQGAAQCA/wCAAgCA/wCA/wCAgICAA4CAgID/AP6AgICAgAEA/wABAAAAAwEAAAAEAAOAAAsAGQAdAAABIRUzFSE1IxUhNTMDIREzFSE1IxUhNSMROwERMxECAAGAgP8AgP8AgIACAID/AID/AICAgIADgICAgICA/wD+gICAgIABAP8AAQAAAAQAgAAABAADgAADAAcAFQAZAAABMxUjJTMVIwUhETMVITUjFSE1IxE7AREhEQGAgIABAICA/oACgID/AID+gICAgAEAA4CAgICA/gCAgICAAYD+gAGAAAABAID/gAMAAoAAEQAAASEVIREhFSMRITUzNSE1IxEzAQACAP6AAYCA/wCA/wCAgAKAgP8AgP8AgICAAQAAAAMAgAAAA4ADgAAHABUAGQAAASEVMxUhNSMRIRUzFSEVIRUhNSMROwEVMzUBAAEAgP8AgAGAgP8AAYD9gICAgIADgICAgP8AgICAgIABAICAAAADAIAAAAOAA4AABwAVABkAAAEhFSMVITUzAyEVMxUhFSEVITUjETsBFTM1AYABAID/AICAAYCA/wABgP2AgICAgAOAgICA/wCAgICAgAEAgIAAAwCAAAADgAOAAAsAGQAdAAABIRUzFSE1IxUhNTMRIRUzFSEVIRUhNSMROwEVMzUBAAGAgP8AgP8AgAGAgP8AAYD9gICAgIADgICAgICA/wCAgICAgAEAgIAAAgEAAAADgAOAAAsADwAAASEVMxUhNSMVITUzESERIQGAAYCA/wCA/wCAAQD/AAOAgICAgID/AP4AAAMBAAAAAwADgAADAAcACwAAATMVIyUzFSMFIREhAQCAgAGAgID/AAEA/wADgICAgID9gAADAIAAAAOAA4AACwAXABsAAAEhFTMVITUjFSE1MwMhFTMRIxUhNSMROwERIREBgAGAgP8AgP8AgIACAICA/gCAgIABAAOAgICAgID/AID/AICAAQD/AAEAAAAEAIAAAAOAA4AAAwAHABMAFwAAATMVIyUzFSMFIRUzESMVITUjETsBESERAQCAgAGAgID+gAIAgID+AICAgAEAA4CAgICAgP6AgIABgP6AAYAAAgCAAAAEAAOAAAcAFwAAASEVMxUhNSMDIREhESERMxUhNSMVITUjAQABAID/AICAAQABAAEAgP8AgP6AgAOAgICA/wD+gAGA/oCAgICAAAACAIAAAAQAA4AACwAbAAABIRUzFSE1IxUhNTMBIREhESERMxUhNSMVITUjAYABgID/AID/AID/AAEAAQABAID/AID+gIADgICAgICA/wD+gAGA/oCAgICAAAADAIAAAAOAA4AAAwAHABEAAAEzFSMlMxUjBSERIREhESE1IwEAgIABgICA/gABAAEAAQD9gIADgICAgID+AAIA/YCAAAIAAAEABAADgAAHABMAABEhFSMRIxEjBSERIxEjFSM1IxEjAYCAgIABgAKAgICAgIADgID/AAEAgP6AAQCAgP8AAAAAAAABAAAADAAAACIAAAACAAMAAAB9AAEAfgCAAAIAgQDaAAEABAAAAAIAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAA//8AAQAAAAFmcmFjAAgAAAABAAAAAQAEAAQAAAABAAgAAQAsAAIACgAgAAIABgAOAH8AAwASABUAfgADABIAFwABAAQAgAADABIAFwABAAIAFAAWAAIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAA2wAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEArACjAIQAhQC9AJYA6ACGAI4AiwCdAKkApAECAIoA2gCDAJMA8gDzAI0AlwCIAMMA3gDxAJ4AqgD1APQA9gCiAK0AyQDHAK4AYgBjAJAAZADLAGUAyADKAM8AzADNAM4A6QBmANMA0ADRAK8AZwDwAJEA1gDUANUAaADrAO0AiQBqAGkAawBtAGwAbgCgAG8AcQBwAHIAcwB1AHQAdgB3AOoAeAB6AHkAewB9AHwAuAChAH8AfgCAAIEA7ADuALoAsACxAOQA5QC7AKYA2ADZALIAswC2ALcAxAC0ALUAxQCCAMIAhwCrAMYAvgC/AQMAjApzb2Z0aHlwaGVuBEV1cm8="

    const doc = new jsPDF({
        orientation: 'p',
        unit: 'in',
        format: 'letter',
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or "smart", default is 16
    });
    doc.setFontSize(16);

    doc.addFileToVFS("kongtext.ttf", base64Font); 
    doc.addFont("kongtext.ttf", "kongtext", "normal");
    doc.setFont("kongtext");

    // centered title
    let pageWidth = doc.internal.pageSize.getWidth();
    let titleText = "Code Expresso";
    var textWidth = doc.getTextWidth(titleText);
    let x = (pageWidth - textWidth) / 2;
    doc.text(titleText, x, 1);

    // user info
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);
    //console.log(docSnapUser.data());
    let username = docSnapUser.data().username;
    doc.text(username+"\n"+user.email, 1, 2);

    // user progress report
    let prog1 = docSnapUser.data().completedLevels1.length
    let prog2 = docSnapUser.data().completedLevels2.length
    let prog3 = docSnapUser.data().completedLevels3.length
    let prog4 = docSnapUser.data().completedLevels4.length
    let prog5 = docSnapUser.data().completedLevels5.length
    let prog6 = docSnapUser.data().completedLevels6.length
    let prog7 = docSnapUser.data().completedLevels7.length
    let prog8 = docSnapUser.data().completedLevels8.length
    let prog9 = docSnapUser.data().completedLevels9.length
    let prog10 = docSnapUser.data().completedLevels10.length
    let overallProg = prog1 + prog2 + prog3 + prog4 + prog5 + prog6 + prog7 + prog8 + prog9 + prog10;
    let reportText = `Levels Completed: `+overallProg+`/300\n\nFlowcharts & Pseudocode: `+prog1+`/30\nString Manipulation: `+prog2+`/30\nVariables: `+prog3+`/30\nData Types: `+prog4+`/30\nOperators: `+prog5+`/30\nConditional Statements: `+prog6+`/30\nLoops: `+prog7+`/30\nMethods: `+prog8+`/30\nArrays: `+prog9+`/30\nString Manipulation: `+prog10+`/30\n
    `
    doc.text(reportText, 1, 3);

    // download pdf
    doc.save("reports.pdf");
}

// UPLOAD PROFILE PIC
document.getElementById("uploadUserProfilePicture").addEventListener('change', async function() {
    if(this.files[0].size > 2097152){
        displayToast("File size too big", "Image must be < 2MB");
        return;
    }else{
        document.getElementById("uploadUserProfileImage").src = URL.createObjectURL(this.files[0]);
    }
});

// SAVE PROFILE
document.getElementById("saveProfile").addEventListener("click", function(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            var username = document.getElementById("nameInput").value;

            updateUser(user, user.uid, username);
        }
    });
});

async function updateUser(user, userID, username){
    let imageElement = document.getElementById("uploadUserProfilePicture");
    if(imageElement.value != "" && imageElement != null){        
        if (imageElement.files && imageElement.files[0]) {
            // let filename = makeid(10);
            const storage = getStorage();
            const storageRef = ref(storage, "user-images/"+userID+"/"+userID);
    
            const UploadTask = uploadBytesResumable(storageRef, imageElement.files[0]);
            UploadTask.on('state-changed', (snapshot)=>{},
                (error) =>{
                    console.log(error);
                    displayToast("Error Uploading Image", "Please try again")
                },
                ()=>{
                    getDownloadURL(UploadTask.snapshot.ref).then( async (downloadURL)=>{
                        // console.log(downloadURL);
                        document.getElementById("userProfilePic").src = downloadURL;
                        const userRef = doc(db, "users", userID);
                        await updateDoc(userRef, {
                            profilePicture: downloadURL,
                            username: username
                        }).then(function() {
                            displayToast("Success","Profile Updated")

                            //badge
                            checkForBadges(user);
                        });
                    });
                }
            );
        }
    }else{
        const userRef = doc(db, "users", userID);
        await updateDoc(userRef, {
            username: username
        }).then(function() {
            displayToast("Success","Profile Updated");

            //badge
            checkForBadges(user);
        });
    }
}

// logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) =>{
    signOutUser();
});

//show registered 2FA factors (phone numbers)
function showRegisteredFactors(user){
    const mfaUser = multiFactor(user);
    const enrolledFactors = mfaUser.enrolledFactors;
    const enrolledFactorsContainer = document.getElementById("enrolledFactorsContainer");
    enrolledFactorsContainer.innerHTML = "";
    for (let index = 0; index < enrolledFactors.length; index++) {
        const element = enrolledFactors[index];

        const displayName = element.displayName;
        const phoneNumber = hideCharacters(element.phoneNumber); // makes it into +63********03
        
        enrolledFactorsContainer.innerHTML +=
        `
        <div style="position: relative;display:flex;align-items: center; height:3rem;overflow:hidden;margin-bottom:3rem;">
            <span><i class="nes-smartphone" style="transform: scale(0.3);"></i></span>
            <span style="margin-right: 1rem;width:16rem;">`+displayName+`</span>
            <span style="margin-right: 2rem;">`+phoneNumber+`</span>
            <span style="margin-top: 0.3rem;"><i class="nes-icon close is-small nes-pointer removeFactor" data-id="`+index+`"></i></span>
        </div>
        `
    }

    let removeFactor = document.getElementsByClassName("removeFactor");

    for (let index = 0; index < removeFactor.length; index++) {
        const element = removeFactor[index];
        element.addEventListener('click', function(){
            showRemove2ndFactorModal(element.getAttribute("data-id"));
        })
    }
}

function hideCharacters(str) {
    if (str.length <= 4) {
      // If the string has 4 or fewer characters, return it as is
      return str;
    } else {
      // Replace characters in between first and last two characters with asterisks
      const firstThreeChars = str.slice(0, 3);
      const lastTwoChars = str.slice(-2);
      const middleAsterisks = "*".repeat(str.length - 4);
      return firstThreeChars + middleAsterisks + lastTwoChars;
    }
}

let remove2ndFactorModal = new Modal(document.getElementById("remove2ndFactorModal"));
//cancel button
document.getElementById("remove2ndFactorCancel").addEventListener("click", function(){
    remove2ndFactorModal.toggle();
})

function showRemove2ndFactorModal(dataID){
    remove2ndFactorModal.toggle();

    recreateElement("remove2ndFactorConfirm");
    let remove2ndFactorConfirm = document.getElementById("remove2ndFactorConfirm");
    remove2ndFactorConfirm.addEventListener("click", function(){
        removeSecondFactor(dataID);
    });
}

// Unenroll/remove a second factor
function removeSecondFactor(selectedIndex){
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const multiFactorUser = multiFactor(user);
            const options = multiFactorUser.enrolledFactors
            // Ask user to select from the enrolled options.
            return multiFactorUser.unenroll(options[selectedIndex])
            .then(() =>{
                remove2ndFactorModal.toggle();
                displayToast("Success","2FA Factor Removed");
                showRegisteredFactors(user);
            }).catch( async (error) => {
                var errorCode = error.code
                if(errorCode == "auth/requires-recent-login"){
                    let reAuthModal = new Modal(document.getElementById("reAuthModal"));
                    let credential;
    
                    if (user.providerData.some((provider) => provider.providerId === EmailAuthProvider.PROVIDER_ID)) {
                        // Used Email and Password
    
                        reAuthModal.toggle();
                        document.getElementById("reAuthBtn").addEventListener("click", function(){
                            let email = document.getElementById("reAuthEmail").value;
                            let pass = document.getElementById("reAuthPass").value;
                            credential = EmailAuthProvider.credential(email, pass);
                            reauthenticateWithCredential(user, credential).then(() => {
                                displayToast("Success","User Re-authenticated");
                                reAuthModal.toggle();
                                
                            }).catch((error) => {
                                reAuthModal.toggle();
    
                                var errorCode = error.code;
                                if (errorCode == 'auth/multi-factor-auth-required') {
                                    
                                    multiFactorAuthHandler(error);
    
                                }else{
                                    displayToast("Auth Error","Incorrect Credentials");
                                }
                            });
                        });
                        
                    } else if (user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID)) {
                        // Used Google Login
    
                        const googleProvider = new GoogleAuthProvider();
                        
                        credential = await signInWithPopup(auth, googleProvider);
                        reauthenticateWithCredential(user, credential).then(() => {
                            displayToast("Success","User Re-authenticated");
                            reAuthModal.toggle();
                        }).catch((error) => {
                            reAuthModal.toggle();
    
                            var errorCode = error.code;
                            if (errorCode == 'auth/multi-factor-auth-required') {
                                
                                multiFactorAuthHandler(error);
    
                            }else{
                                displayToast("Auth Error","Incorrect Credentials");
                            }
                            
                        });
                    } else {
                        // Handle other provider types or show an error message
                        console.error("Unsupported provider for re-authentication.");
                        return;
                    }
    
                }else{
                    console.log(error);
                }
            });
        }
    });
}

//show 2fa Modal
let twofaModal = new Modal(document.getElementById("2faModal"));
let otpModal = new Modal(document.getElementById("otpModal"));
document.getElementById("2faButton").addEventListener('click', function(){
    document.getElementById("phoneNum").value = "";
    twofaModal.toggle();
});

document.getElementById("sendSMS").addEventListener('click', function(){
    //recreate the element to get fresh captcha
    document.getElementById("recaptcha-container").innerHTML="";
    recreateElement("recaptcha-container");

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
    }, auth);

    onAuthStateChanged(auth,(user) => {
        multiFactor(user).getSession().then(function (multiFactorSession) {
            // Specify the phone number and pass the MFA session.
            let phoneNumber = "+63" + document.getElementById("phoneNum").value;
            const phoneInfoOptions = {
                phoneNumber: phoneNumber,
                session: multiFactorSession
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);

            // Send SMS verification code.
            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)

        }).then(function (verificationId) {
            //toast
            displayToast('Success','OTP Sent')
            twofaModal.toggle();

            //clear input
            document.getElementById("otpInput").value = "";
            document.getElementById("phoneName").value = "";

            otpModal.toggle();

            //clear all event listeners
            var old_element = document.getElementById("optConfirmBtn");
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);

            recreateElement("otpInput");
            document.getElementById("otpInput").addEventListener("keydown", function(){
                document.getElementById("is-error-feedback-otp").innerHTML = "";
                document.getElementById("is-error-feedback-otp").style.display = "none";

                document.getElementById("otpInput").classList.add("is-dark");
                document.getElementById("otpInput").classList.remove("is-error");
                document.getElementById("otpInput").style.backgroundColor = "";
                document.getElementById("otpInput").style.color = "";
            });

            recreateElement("optConfirmBtn");

            recreateElement("phoneName");
            document.getElementById("phoneName").addEventListener("keydown", function(){
                document.getElementById("phoneName").classList.add("is-dark");
                document.getElementById("phoneName").classList.remove("is-error");
                document.getElementById("phoneName").style.backgroundColor = "";
                document.getElementById("phoneName").style.color = "";
            });

            document.getElementById("optConfirmBtn").addEventListener("click", function(){
                // Ask user for the verification code. Then:
                let verificationCode = document.getElementById("otpInput").value;
                const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                
                let phoneName = document.getElementById("phoneName").value;
                if (phoneName == "" || phoneName == null) {
                    document.getElementById("phoneName").classList.remove("is-dark");
                    document.getElementById("phoneName").classList.add("is-error");
                    document.getElementById("phoneName").style.backgroundColor = "black";
                    document.getElementById("phoneName").style.color = "white";
                    return
                }

                // Complete enrollment.
                return multiFactor(user).enroll(multiFactorAssertion, phoneName)
                .then(function () {
                    otpModal.toggle();
                    displayToast("Success","Phone Registered");
                    showRegisteredFactors(user);
                }).catch((error) => {
                    if(error.code == 'auth/invalid-verification-code'){
                        //responsive styling for invalid input
                        document.getElementById("otpInput").classList.remove("is-dark");
                        document.getElementById("otpInput").classList.add("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "black";
                        document.getElementById("otpInput").style.color = "white";

                        //show error message
                        document.getElementById("is-error-feedback-otp").innerHTML = "Invalid Verification Code";
                        document.getElementById("is-error-feedback-otp").style.display = "block";

                    }else if(error.code == 'auth/code-expired'){
                        //responsive styling for invalid input
                        document.getElementById("otpInput").classList.remove("is-dark");
                        document.getElementById("otpInput").classList.add("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "black";
                        document.getElementById("otpInput").style.color = "white";

                        //show error message
                        document.getElementById("is-error-feedback-otp").innerHTML = "Verification Code Expired";
                        document.getElementById("is-error-feedback-otp").style.display = "block";

                        
                        displayToast("Error", "Expired OTP");
                        //hide modal to restart process
                        otpModal.toggle();

                        //reset styling
                        document.getElementById("is-error-feedback-otp").innerHTML = "";
                        document.getElementById("is-error-feedback-otp").style.display = "none";

                        document.getElementById("otpInput").classList.add("is-dark");
                        document.getElementById("otpInput").classList.remove("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "";
                        document.getElementById("otpInput").style.color = "";
                    };
                });
            });

            
        }).catch(async (error) => {
            var errorCode = error.code
            if(errorCode == "auth/requires-recent-login"){
                let reAuthModal = new Modal(document.getElementById("reAuthModal"));
                let credential;

                if (user.providerData.some((provider) => provider.providerId === EmailAuthProvider.PROVIDER_ID)) {
                    // Used Email and Password

                    reAuthModal.toggle();
                    document.getElementById("reAuthBtn").addEventListener("click", function(){
                        let email = document.getElementById("reAuthEmail").value;
                        let pass = document.getElementById("reAuthPass").value;
                        credential = EmailAuthProvider.credential(email, pass);
                        reauthenticateWithCredential(user, credential).then(() => {
                            displayToast("Success","User Re-authenticated");
                            reAuthModal.toggle();
                            
                        }).catch((error) => {
                            reAuthModal.toggle();

                            var errorCode = error.code;
                            if (errorCode == 'auth/multi-factor-auth-required') {
                                
                                multiFactorAuthHandler(error);

                            }else{
                                displayToast("Auth Error","Incorrect Credentials");
                            }
                        });
                    });
                    
                } else if (user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID)) {
                    // Used Google Login

                    const googleProvider = new GoogleAuthProvider();
                    
                    credential = await signInWithPopup(auth, googleProvider);
                    reauthenticateWithCredential(user, credential).then(() => {
                        displayToast("Success","User Re-authenticated");
                        reAuthModal.toggle();
                    }).catch((error) => {
                        reAuthModal.toggle();

                        var errorCode = error.code;
                        if (errorCode == 'auth/multi-factor-auth-required') {
                            
                            multiFactorAuthHandler(error);

                        }else{
                            displayToast("Auth Error","Incorrect Credentials");
                        }
                        
                    });
                } else {
                    // Handle other provider types or show an error message
                    console.error("Unsupported provider for re-authentication.");
                    return;
                }

            }else if(errorCode == "auth/second-factor-already-in-use"){
                twofaModal.toggle();
                displayToast("Sorry","Number already in use");

            }else if(errorCode == "auth/invalid-phone-number"){
                twofaModal.toggle();
                displayToast("Sorry","Invalid Phone Number");
            }
            else{
                console.log(error);
            }
        });
    })
});

function multiFactorAuthHandler(error){
    //recreate the element to get fresh captcha
    document.getElementById("recaptcha-container").innerHTML="";
    recreateElement("recaptcha-container");

    //initialize captchaVerifier
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
             // console.log(response)
             // reCAPTCHA solved, allow signInWithPhoneNumber.
             // ...
        },
         'expired-callback': () => {
             // Response expired. Ask user to solve reCAPTCHA again.
             // ...
        }
    }, auth);

    //show all registered Factors to choose from
    const resolver = getMultiFactorResolver(auth, error);
    //populate select element with options
    document.getElementById("2faSelect").innerHTML = `<option value="" disabled selected hidden>Select an option</option>`;
    for (let index = 0; index < resolver.hints.length; index++) {
        const element = resolver.hints[index];
 
        document.getElementById("2faSelect").innerHTML+=
        `
        <option value="`+index+`">`+element.displayName+` (`+element.phoneNumber+`)</option>
        `
    }

    //show 2faModal (choose factor)
    let twofaModal = new Modal(document.getElementById("2faModalReAuth"));
    twofaModal.toggle();

    //recreate element to remove all eventListeners (in case of multiple tries)
    recreateElement("2faSelect");
    //responsive styling for input validation
    document.getElementById("2faSelect").addEventListener("change", function(){
        document.getElementById("2faSelectContainer").classList.remove("is-error");
        document.getElementById("2faSelectContainer").classList.add("is-dark");
        document.getElementById("2faSelect").style.backgroundColor = "";
        document.getElementById("2faSelect").style.color = "";
    })
    
    //recreate element to remove all eventListeners (in case of multiple tries)
    recreateElement("2faContinueBtn");
    //responsive styling for input validation
    document.getElementById("2faContinueBtn").addEventListener("click", function(){
        let option = document.getElementById("2faSelect");
        //do not allow when no option is selected
        if(option.value==""){
            document.getElementById("2faSelectContainer").classList.add("is-error");
            document.getElementById("2faSelectContainer").classList.remove("is-dark");
            document.getElementById("2faSelect").style.backgroundColor = "black";
            document.getElementById("2faSelect").style.color = "white";
            return
        }
         
        //double check if an option is selected
        if (resolver.hints[option.value].factorId === PhoneMultiFactorGenerator.FACTOR_ID){
            const phoneInfoOptions = {
                multiFactorHint: resolver.hints[option.value],
                session: resolver.session
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);
            // Send SMS verification code
            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            .then(function (verificationId) {
                //hide first modal after SMS has been sent
                twofaModal.toggle();

                //clear text input in new modal
                document.getElementById("otpReAuthInput").value = "";

                //show new modal for OTP input
                let otpModal = new Modal(document.getElementById("otpModalReAuth"));
                otpModal.toggle();

                //hide invalid error display
                document.getElementById("is-error-feedback").style.display = "none";

                //recreate element to remove all eventListeners (in case of multiple tries)
                recreateElement("otpReAuthInput");
                //hide error message on change
                document.getElementById("otpReAuthInput").addEventListener("keydown", function(){
                    document.getElementById("is-error-feedback").innerHTML = "";
                    document.getElementById("is-error-feedback").style.display = "none";

                    document.getElementById("otpReAuthInput").classList.add("is-dark");
                    document.getElementById("otpReAuthInput").classList.remove("is-error");
                    document.getElementById("otpReAuthInput").style.backgroundColor = "";
                    document.getElementById("otpReAuthInput").style.color = "";
                });

                //recreate element to remove all eventListeners (in case of multiple tries)
                recreateElement("otpConfirmReAuthBtn");
                
                //confirm button
                document.getElementById("otpConfirmReAuthBtn").addEventListener("click", function(){
                    // Ask user for the SMS verification code. Then:
                    let verificationCode = document.getElementById("otpReAuthInput").value;
                    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                    // Complete sign-in.
                    return resolver.resolveSignIn(multiFactorAssertion).then(function(){
                        otpModal.toggle();
                        displayToast("Login Success", "User Re-authenticated");
                        
                    }).catch((error) => {
                        if(error.code == 'auth/invalid-verification-code'){
                            //responsive styling for invalid input
                            document.getElementById("otpReAuthInput").classList.remove("is-dark");
                            document.getElementById("otpReAuthInput").classList.add("is-error");
                            document.getElementById("otpReAuthInput").style.backgroundColor = "black";
                            document.getElementById("otpReAuthInput").style.color = "white";

                            //show error message
                            document.getElementById("is-error-feedback").innerHTML = "Invalid Verification Code";
                            document.getElementById("is-error-feedback").style.display = "block";

                        }else if(error.code == 'auth/code-expired'){
                            //responsive styling for invalid input
                            document.getElementById("otpReAuthInput").classList.remove("is-dark");
                            document.getElementById("otpReAuthInput").classList.add("is-error");
                            document.getElementById("otpReAuthInput").style.backgroundColor = "black";
                            document.getElementById("otpReAuthInput").style.color = "white";

                            //show error message
                            document.getElementById("is-error-feedback").innerHTML = "Verification Code Expired";
                            document.getElementById("is-error-feedback").style.display = "block";

                            
                            displayToast("Error", "Expired OTP");
                            //hide modal to restart process
                            otpModal.toggle();
                        };
                    });
                });
            });

        } else {
            // Unsupported second factor.
            displayToast("Error","Unsupported Factor")
        }
    });
}

function recreateElement(elementID){
    var old_element = document.getElementById(elementID);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

// item shop button
document.getElementById("itemShopButton").addEventListener('click', function(){
    setTimeout(() => {
        location.href = "shop.html";
    }, 300);
});