import { getCookie, setCookie } from "./cookies";

// background music
import defaulttheme from "../../assets/music/defaulttheme.mp3";
import coffeetheme from "../../assets/music/coffeetheme.mp3"; 
import fantasytheme from "../../assets/music/fantasytheme.mp3"; 
import tropicaltheme from "../../assets/music/tropicaltheme.mp3";

// sound effects
import buttonSoundEffect from "../../assets/sound/button_press.mp3"


export function addAudioVolumeSliderFunctionality(audioElementID, sliderID){
    var audioElement = document.getElementById(audioElementID);
    var sliderElement = document.getElementById(sliderID);
  
    //set current volume value to slider
    sliderElement.value = audioElement.volume * 100;
  
    sliderElement.addEventListener('change', function(){
      audioElement.volume = Number(this.value/100);
      setCookie('musicVolume', audioElement.volume, 365);
    })
}

export function getAudioSrc(theme){
    switch (theme) {
        case "theme1": //fantasy
            return fantasytheme;
    
        case "theme2": //tropical
            return tropicaltheme;
        
        case "theme3": //coffee
            return coffeetheme;
        
        case "mute": //muted
            return "mute";

        default:
            return defaulttheme;
    }
}

export function addAudioElementToBody(audioElementID, audioSrc){
    if(audioSrc == "mute"){
        return;
    }

    document.getElementById('audioContainer').innerHTML+=
    `
      <audio id="`+audioElementID+`" src="`+audioSrc+`" style="display:none;" loop ></audio>
    `
    var defaultVolume = 0.1

    // get user preferred volume from the cookie
    var cookieVolume = getCookie("musicVolume");
    if(cookieVolume){
        defaultVolume = cookieVolume;
    }

    document.addEventListener('click', function(){
      var audioElement = document.getElementById(audioElementID);
      if (audioElement.paused) {
        audioElement.volume = defaultVolume;
        audioElement.play();
        addAudioVolumeSliderFunctionality(audioElementID,'musicVolume');
      }
    });
}

export function addSFXVolumeSliderFunctionality(sliderID){
    var sliderElement = document.getElementById(sliderID);

    var defaultVolume = 0.3
    var cookieVolume = getCookie("SFXVolume");
    if(cookieVolume){
        defaultVolume = cookieVolume;
    }
    
    //set current volume value to slider
    sliderElement.value = defaultVolume*100;
  
    sliderElement.addEventListener('change', function(){
      setCookie('SFXVolume', Number(sliderElement.value/100), 365);
    })
}

export function addSoundEffect(elementClass){
    var elems = document.getElementsByClassName(elementClass);
    var soundEffect = new Audio(buttonSoundEffect);

    for (let index = 0; index < elems.length; index++) {
        const element = elems[index];
        element.addEventListener('click', function () {
            var defaultVolume = 0.3
            var cookieVolume = getCookie("SFXVolume");
            if(cookieVolume){
                defaultVolume = cookieVolume;
            }
            soundEffect.volume = defaultVolume;
            soundEffect.play();
        });  
    }

    addSFXVolumeSliderFunctionality('sfxVolume');
}