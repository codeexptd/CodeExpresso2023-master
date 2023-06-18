import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, updatePassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

const firebaseConfig = {

    apiKey: "AIzaSyDQ5M0TuT6v0JlqhcvZ9tkP5gKYPCCUL2A",
  
    authDomain: "codeexpresso-ae5b5.firebaseapp.com",
  
    projectId: "codeexpresso-ae5b5",
  
    storageBucket: "codeexpresso-ae5b5.appspot.com",
  
    messagingSenderId: "340531525579",
  
    appId: "1:340531525579:web:9a7d69339dd2963386284e",
  
    measurementId: "G-91J9LZ5MXF"
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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

let passwordScore = document.getElementById("passwordScore");
document.getElementById("id_password").addEventListener("keyup", function(){
    // console.log(scorePassword(this.value));
    let newScore = scorePassword(this.value);
    passwordScore.value = newScore;
    if(newScore <= 30){
        passwordScore.classList.remove("is-success");
        passwordScore.classList.remove("is-warning");
        passwordScore.classList.add("is-error");
    }else if(newScore > 30 && newScore <= 70){
        passwordScore.classList.remove("is-success");
        passwordScore.classList.remove("is-error");
        passwordScore.classList.add("is-warning");
    }else{
        passwordScore.classList.remove("is-warning");
        passwordScore.classList.remove("is-error");
        passwordScore.classList.add("is-success");
    }
    // >=8 characters
    if((this.value).length >= 8){
        document.getElementById("passLength").style.color = "white";
        document.getElementById("passLength").style.paddingLeft = "0.2rem";
    }else{
        document.getElementById("passLength").style.color = "black";
        document.getElementById("passLength").style.paddingLeft = "0";
    }
    //lowercase
    if(/[a-z]/.test(this.value)){
        document.getElementById("passLower").style.color = "white";
        document.getElementById("passLower").style.paddingLeft = "0.2rem";
    }else{
        document.getElementById("passLower").style.color = "black";
        document.getElementById("passLower").style.paddingLeft = "0";
    }
    //uppercase
    if(/[A-Z]/.test(this.value)){
        document.getElementById("passUpper").style.color = "white";
        document.getElementById("passUpper").style.paddingLeft = "0.2rem";
    }else{
        document.getElementById("passUpper").style.color = "black";
        document.getElementById("passUpper").style.paddingLeft = "0";
    }
    //number character
    if(/[0-9]/.test(this.value)){
        document.getElementById("passNumber").style.color = "white";
        document.getElementById("passNumber").style.paddingLeft = "0.2rem";
    }else{
        document.getElementById("passNumber").style.color = "black";
        document.getElementById("passNumber").style.paddingLeft = "0";
    }
    //special character
    if(/[^a-zA-Z0-9]/.test(this.value)){
        document.getElementById("passSpecial").style.color = "white";
        document.getElementById("passSpecial").style.paddingLeft = "0.2rem";
    }else{
        document.getElementById("passSpecial").style.color = "black";
        document.getElementById("passSpecial").style.paddingLeft = "0";
    }
});

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}


// activate account
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    // submit event detected
    event.preventDefault();
    const txtpassword = event.target.elements.password.value;
    const txtpassword2 = event.target.elements.password2.value;


    //check if password is matching
    if (txtpassword!==txtpassword2){
        document.getElementById('id_password2').focus();
        displayToast("Task Failed","Passwords do not match");
        return;
    }

    //check if password is complex
    if(!CheckPassword(txtpassword)){
        displayToast("Task Failed","Invalid Password");
        return;
    }
        
    onAuthStateChanged(auth, (user) => {
        if (user) {
            updatePassword(user, txtpassword).then(() => {
                try {
                    console.log(user.uid)
                    getDoc(doc(db, "users", user.uid)).then(docSnap => {
                        if (docSnap.exists()) {
                            displayToast("Please wait","Redirecting...");
                            location.href = "profile.html";
                        } else {
                            displayToast("Please wait","Redirecting...");
                            const userDBRef = doc(db, "users", user.uid);
                            setDoc(userDBRef, {
                                username: "",
                                ownedThemes: ["defaultTheme"],
                                theme: "defaultTheme",
                                ownedSkins: ["defaultSkin"],
                                skin: "defaultSkin",
                                ownedBackgrounds: ["defaultBackground"],
                                background: "defaultBackground",
                                earnedBadges: [],
                                profilePicture: "",
                                completedLevels1: [],
                                completedLevels2: [],
                                completedLevels3: [],
                                completedLevels4: [],
                                completedLevels5: [],
                                completedLevels6: [],
                                completedLevels7: [],
                                completedLevels8: [],
                                completedLevels9: [],
                                completedLevels10: [],
                                points: 0,
                                history: [{dateTime: Timestamp.fromDate(new Date()), description: "Account Created"}]
                            }, { merge: true }).then(function() {
                                location.href = "profile.html";
                            });
                        }
                    });
                }catch(error){
                    console.log(error);
                }
      
            }).catch((error) => {
                displayToast("Error","Expired Link");
                
            });
        }else{
            displayToast("Error","Expired Link");
        }
    });

})

function CheckPassword(inputtxt){ 
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,255}$/;
    if(inputtxt.match(decimal)){ 
      return true;
    }else{
      return false;
    }
} 