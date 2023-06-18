import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';

import { auth, getUserTheme, addProfileButtonFunc } from './firebase/userEssentials';
import { onAuthStateChanged } from 'firebase/auth';
import { setCookie, getCookie } from './general/cookies';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

//themes
import fantasyBG from "../assets/themes/fantasy.svg";
import tropicalBG from "../assets/themes/tropical.svg";
import coffeeBG from "../assets/themes/coffee.svg";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        let theme = await getUserTheme(user);
        cuztomizeHomePage(theme);
        addAudioElementToBody('background-music', getAudioSrc(theme));
        
    } else {
        cuztomizeHomePage("defaultTheme");
        addAudioElementToBody('background-music', getAudioSrc('defaultTheme'));
    }
});


function cuztomizeHomePage(theme){
    switch (theme) {
        case "theme1":
            document.body.style.backgroundImage = "url("+fantasyBG+")";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.getElementById("fantasyHome").style.display = "grid";
            break;
        case "theme2":
            document.body.style.backgroundImage = "url("+tropicalBG+")";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.getElementById("tropicalHome").style.display = "grid";
            break;
        case "theme3":
            document.body.style.backgroundImage = "url("+coffeeBG+")";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.getElementById("coffeeHome").style.display = "grid";
            break;
    
        default:
            document.getElementById("defaultHome").style.display = "grid";
            break;
    }
}

// var theme = getCookie('userTheme');

// switch(theme) {
//     case 'defaultTheme':
//         // code block
//         break;
//     case 'theme1':
//         // code block
//         break;
//     case 'theme2':
//         // code block
//         break;
//     case 'theme3':
//         // code block
//         break;
//     default:
//         // code block
// }

// ********** ESSENTIALS **********
// essentials
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
// addAudioElementToBody('background-music', getAudioSrc('defaultTheme'));

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


// ********** INDEX PAGE **********

let levelsButton = document.getElementsByClassName("levels");
for (let index = 0; index < levelsButton.length; index++) {
    const element = levelsButton[index];
    element.addEventListener('click', (e) => {
        setTimeout(function() {
            location.href = "levels.html";
        }, 300);
    });
}