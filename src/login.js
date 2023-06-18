import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';

import { onAuthStateChanged } from 'firebase/auth';

import { Modal, Toast } from 'bootstrap';
import $ from 'jquery';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

//eye icon image sources
import eye_icon_default from "../assets/images/eye_icon.png";
import eye_icon_hide from "../assets/images/eye_icon_hide.png";

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



// ********** LOGIN PAGE **********

// toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#id_password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  var icon = this.getAttribute("data-icon");
  if(icon=="default"){
    this.setAttribute("data-icon","hide");
    this.src = eye_icon_hide;
  }else{
    this.setAttribute("data-icon","default");
    this.src = eye_icon_default;
  }
});

// email and password login
const form = document.querySelector('form')
form.addEventListener('submit', event => {
    // submit event detected
    event.preventDefault();
    const txtemail = event.target.elements.email.value;
    const txtpassword = event.target.elements.password.value;

    loginWithEmailAndPassword(txtemail, txtpassword);
})

// const googleProvider = new GoogleAuthProvider();
const googleLogin = document.getElementById('google');
googleLogin.addEventListener('click', (e) => {
  loginWithGoogle();
});