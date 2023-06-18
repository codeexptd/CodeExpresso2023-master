import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, sendPasswordReset } from './firebase/userEssentials';

import { onAuthStateChanged } from 'firebase/auth';

import { validateEmail } from './errorBot';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";
 
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

// account password reset request
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    // submit event detected
    event.preventDefault();
    const txtemail = event.target.elements.email.value;
    sendPasswordReset(txtemail);

    // sendPasswordResetEmail(auth, txtemail)
    // .then(() => {
    //     displayNotif("Email verification sent");
    // })
    // .catch((error) => {
    //     var errorCode = error.code;
    //     if(errorCode=='auth/user-not-found'){
    //     displayNotif("User not found");
    //     }else if(errorCode=='auth/invalid-email'){
    //     displayNotif("Invalid email");
    //     }
    // });
})