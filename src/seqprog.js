import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { getCompletedLevels, trimCategoryLvl } from './utils/utils';
import { auth, db } from "./firebase/userEssentials";
import { onAuthStateChanged } from 'firebase/auth';
import { getTiles } from './utils/utils';
import { Modal, Toast } from 'bootstrap';
import $ from 'jquery';
import { isLoggedIn } from "./utils/utils";
import { Categories } from './utils/categories';
import { Token } from "./utils/crypt";
// css
import "bootstrap/dist/css/bootstrap.min.css";
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

//eye icon image sources
import eye_icon_default from "../assets/images/eye_icon.png";
import eye_icon_hide from "../assets/images/eye_icon_hide.png";

// ********** ESSENTIALS **********
// essentials
isLoggedIn();
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
addAudioElementToBody("background-music", getAudioSrc("mute"));

document.getElementById("profile").addEventListener("click", function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      addProfileButtonFunctionality(user);
    } else {
      addProfileButtonFunctionality(user);
    }
  });
});

// ********** ********** **********

//URL Search params
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
let decrypted = "";
try {
  decrypted = JSON.parse(Token.decrypt(decodeURIComponent(token)));
} catch (e) {
  location.href = "index.html";
}
const cat = decrypted.cat;
const diff = decrypted.diff;

if (!cat || !diff || !decrypted) {
  location.href = "index.html";
}

const title = document.getElementById("title");

title.innerHTML = `${
  Object.values(Categories).find((c) => c.name == cat).title
} - ${diff.charAt(0).toUpperCase() + diff.slice(1)}`;
const tiles = await getTiles(cat, diff);

const grid = document.getElementById("grid-tiles");

//getUnlocked
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      let unlockedLevels = [];
      let completedLevels = await getCompletedLevels(docSnap, cat);

      completedLevels = completedLevels
        .map((lvl) => {
          return trimCategoryLvl(diff, lvl);
        })
        .filter((lvl) => lvl != undefined || lvl != null);

      unlockedLevels = [...completedLevels]; // we copy all completed

      //if we have no completed levels yet we unlock the 1st level by default
      if (completedLevels.length <= 0) {
        unlockedLevels.push("1");
      }

      if (completedLevels.length > 0) {
        let highestLevelCompleted = Math.max(...completedLevels);

        //we need to check first the length of all levels before adding
        if (highestLevelCompleted < tiles.length) {
          let latestUnlockedLevel = String(parseInt(highestLevelCompleted) + 1);
          unlockedLevels.push(latestUnlockedLevel); //then append the next level of the highest completed level
        }
      }

      tiles
        .sort((a, b) => a - b)
        .map((tile, idx) => {
          if (unlockedLevels.includes(tile)) {
            grid.innerHTML += `<div style="display:grid;align-items:center;justify-content:center;">
                <button
                class="${
                  unlockedLevels.includes(tile) ? "" : "is-disabled"
                } nes-btn level-select btn-sound" data-level=${tile} style="height:5rem;width:5rem;font-size: 2rem; display: flex;
    align-items: center;
    justify-content: center;">${tile}</button>
            </div>`;
          } else {
            grid.innerHTML += `<div style="display:grid;align-items:center;justify-content:center;">
                <button
                disabled=true
                class="${
                  unlockedLevels.includes(tile) ? "" : "is-disabled"
                } nes-btn level-select btn-sound" data-level=${tile} style="height:5rem;width:5rem;font-size: 2rem; display: flex;
    align-items: center;
    justify-content: center;">${tile}</button>
            </div>`;
          }
          if (idx === length) {
            document.getElementById("container").remove();
          }
        });
    }
    const levelSelect = document.getElementsByClassName("level-select");
    for (let index = 0; index < levelSelect.length; index++) {
      const element = levelSelect[index];
      element.addEventListener("mouseover", function () {
        this.style.borderColor = "white";
      });
      element.addEventListener("mouseout", function () {
        this.style.borderColor = "gray";
      });
      element.addEventListener("click", function () {
        var level = this.getAttribute("data-level");
        const token = new Token(cat, diff, level, null);
        const encrypted = Token.encrypt(JSON.stringify(token));
        if (!element.disabled) {
          setTimeout(() => {
            location.href = `play.html?token=${encodeURIComponent(encrypted)}`;
          }, 300);
        }
      });
    }

    addSoundEffect("btn-sound");
  }
});

  



