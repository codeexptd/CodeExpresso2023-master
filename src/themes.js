function generateNav(theme) {
    switch (theme) {
        case "fantasy":
            
            break;
    
        default:
            try{
                // navbar
                document.getElementById("navbar").innerHTML =
                `<div class="nav-section back-button">
                    <img id="back" src="images/back.svg" alt="back">
                </div>
                <div class="nav-section nav-title">
                <a href="index.html">
                    <img src="assets/images/CodeExpressoNavTitle.svg" alt="CodeExpresso">
                </a>
                </div>
                <div class="nav-section nav-buttons">
                <img id="profile" src="images/profile.svg" alt="profile">
                <img id="settings" src="images/settings.svg" alt="settings">
                </div>
                `
            }catch(error){}
            break;
    }
}

function generateHomeNav(theme) {
    switch (theme) {
        case "theme1": //fantasy
            document.documentElement.style.setProperty('--bgImage', "url('../images/themes/fantasy.svg')")
    
            document.getElementById('homeNavbar').innerHTML =
            `<div class="nav-section back-button">
            </div>
            <div class="nav-section nav-title">
            </div>
            <div class="nav-section nav-buttons">
                <img id="profile" src="images/themes/fantasy_profile_icon.svg" alt="profile">
                <img id="settings" src="images/themes/fantasy_settings_icon.svg" alt="settings">
            </div>`
            
            document.getElementById('content').innerHTML =
            `<img class="fantasyTitle" style="width:120vh;margin: 0;" src = "images/themes/fantasy_title.svg" alt="CodeExpresso"/></div></br>
            <div  class="container" style="display: inline-block;width:min-content;margin:8vh auto 0;position: relative;text-align: center;color: white;">
              <img id="start" class="homeButtonImg" style="width:70vh;display:block;margin:auto;" src = "images/themes/fantasy_start_button.svg" alt="CodeExpresso"/>
            </div></br>
    
            <div class="container" style="width:min-content;margin:3vh auto 0;position: relative;text-align: center;color: white;">
              <img id="levels" class="homeButtonImg" style="width:70vh;display:block;margin:auto;" src = "images/themes/fantasy_levels_button.svg" alt="CodeExpresso"/>
            </div>` 
    
            break;
    
        case "theme2": //tropical
            document.documentElement.style.setProperty('--bgImage', "url('../images/themes/tropical.svg')")
            
            document.getElementById('homeNavbar').innerHTML =
            `<div class="nav-section back-button">
            </div>
            <div class="nav-section nav-title">
            </div>
            <div class="nav-section nav-buttons">
                <img id="profile" src="images/themes/tropical_profile_icon.svg" alt="profile">
                <img id="settings" src="images/themes/tropical_settings_icon.svg" alt="settings">
            </div>`
    
            document.getElementById('content').innerHTML =
            `<img style="width: 100vh;margin:0 auto;transform:rotate(-3.65deg)" src = "images/themes/tropical_title.svg" alt="CodeExpresso"/></br>
          
            <div class="container" style="display:inline-block;width:min-content;margin:0 auto;position: relative;text-align: center;color: white;">
                <img id="start" class="homeButtonImg" style="width:50vh;display:block;margin:5vh auto 0;transform:rotate(-2.84deg);" src = "images/themes/tropical_start_button.svg" alt="CodeExpresso"/>
            </div></br>
              
            <div class="container" style="width:min-content;margin:0 auto;position: relative;text-align: center;color: white;">
              <img id="levels" class="homeButtonImg" style="width:50vh;display:block;margin:5vh auto 0;transform:rotate(3.42deg);" src = "images/themes/tropical_levels_button.svg" alt="CodeExpresso"/>
            </div>`
            break;
    
        case "theme3":
            document.documentElement.style.setProperty('--bgImage', "url('../images/themes/coffee.svg')")
    
            document.getElementById('homeNavbar').innerHTML =
            `<div class="nav-section back-button">
            </div>
            <div class="nav-section nav-title">
            </div>
            <div class="nav-section nav-buttons">
                <img id="profile" src="images/themes/coffee_profile_icon.svg" alt="profile">
                <img id="settings" src="images/themes/coffee_settings_icon.svg" alt="settings">
            </div>`
            
            document.getElementById('content').innerHTML =
            `<h1 id="start"style="color:black;font-size:13vh;cursor:pointer;margin:0;position:absolute;right:42vh;bottom:20vh;transform:rotate(10deg)">Start</h1>
            <h1 id="levels"style="color:black;font-size:13vh;cursor:pointer;margin:0;position:absolute;right:41vh;bottom:8vh;transform:rotate(10deg)">Levels</h1>`
    
            break;
    
        default:
            document.documentElement.style.setProperty('--bgImage', "none")
    
            document.getElementById('homeNavbar').innerHTML =
            `<div class="nav-section back-button">
                
            </div>
            <div class="nav-section nav-title">
            
            </div>
            <div class="nav-section nav-buttons">
                <img id="profile" src="assets/images/profile.svg" alt="profile">
                <img id="settings" src="assets/images/settings.svg" alt="settings">
            </div>`
    
            document.getElementById('content').innerHTML =
            `<img id="title" src=    alt="CodeExpresso"> 
            <button class="menu"id="start">START</button>
            <button class="menu"style="margin-top:1rem;"id="levels">LEVELS</button>`
    
            break;
    }
}

export var isPlaying = false;
export var thememusic = "music/defaulttheme.mp3";
export var music = new Audio(thememusic);

function getThemeMusic(theme){
    switch (theme) {
        case "theme1": //fantasy
            thememusic = "music/fantasytheme.mp3";
            break;
    
        case "theme2": //tropical
            thememusic = "music/tropicaltheme.mp3";
            break;
        
        case "theme3": //coffee
            thememusic = "music/coffeetheme.mp3";
            break;

        default:
            thememusic = "music/defaulttheme.mp3";
            break;
    }
    music = new Audio(thememusic);

    if(theme!="mute"){
        document.addEventListener('click', (e) => {
            if (!isPlaying){
                music.volume = useMusicVolume();
                music.loop = true;
                music.play();
                isPlaying = true;
            }
        });
    }
}

//back, home, settings button functionality
function createFunctionality(){
    //back button
    try{
        document.getElementById("back").addEventListener('click', (e) => {
            history.back();
        });
    }catch(error){}

    //home button
    try{
        document.getElementById("homebutton").addEventListener('click', (e) => {
            location.href = "index.html";
        });
    }catch(error){}
    
    //settings button
    try{
        document.getElementById("settings").addEventListener('click', (e) => {
            var settings = document.getElementById("musicSettings");
            if (settings.style.opacity==0){
                settings.style.display = "block";
                settings.classList.add("musicSettingsAnimateIn");
                setTimeout(function() {
                    settings.classList.remove("musicSettingsAnimateIn");
                }, 250);
                settings.style.opacity = '100';
            }else{
                settings.classList.add("musicSettingsAnimateOut");
                setTimeout(function() {
                    settings.classList.remove("musicSettingsAnimateOut");
                    settings.style.opacity = '0';
                    settings.style.display = "none";
                }, 250);
                
            }  
        });
    }catch(error){console.log(error)}
}

//music volume sliders
function addVolumeSliders(){
    try{
        document.getElementById("musicSettings").innerHTML =
        `<h1>MUSIC</h1>
        <input id="musicVolume" type="range" min="0" max="100" step="1" value="`+getMusicVolume()+`" />
    
        <h1>SOUND EFFECTS</h1>
        <input id="sfxVolume" type="range" min="0" max="100" step="1" value="`+getSFXVolume()+`" style="margin-bottom: 2rem;"/>
        `

        document.getElementById("musicVolume").addEventListener('change', (e) => {
            setCookie('MusicVolume', document.getElementById("musicVolume").value, 365);
            changeMusicVolume();
        });

        document.getElementById("sfxVolume").addEventListener('change', (e) => {
            setCookie('CESFXvolume', document.getElementById("sfxVolume").value, 365);
        });
    }catch(error){}
}

//set music volume when slider is moved
function changeMusicVolume(){
    music.volume = document.getElementById('musicVolume').value/100;
}

export {generateNav, generateHomeNav, getThemeMusic, createFunctionality};