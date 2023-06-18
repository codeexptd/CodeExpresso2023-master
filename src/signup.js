// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth"
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { getThemeMusic, createFunctionality, addVolumeSliders } from './themes.js';
// import { auth, addBackButton, addProfileButtonFunc } from './firebase/userEssentials';
import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth } from './firebase/userEssentials';

import { onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth";

import { validateEmail } from './errorBot';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://codeexpresso-ae5b5.web.app/verify.html',
    // This must be true.
    handleCodeInApp: true,
};

// ********** ESSENTIALS **********
// essentials
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

document.getElementById("email").addEventListener('focusout', (e) => {
  validateEmail();
});

// email signup request
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    // submit event detected
    event.preventDefault();
    const txtemail = event.target.elements.email.value;

    sendSignInLinkToEmail(auth, txtemail, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      displayToast("Success",'Email Sent');
    })
    .catch((error) => {
      var errorCode = error.code;
      if(errorCode=='auth/invalid-email'){
        displayToast("Task Failed",'Invalid email');
      }
    });
})