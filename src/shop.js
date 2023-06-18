import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, db, checkForBadges, loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';
// import { generateNav, getThemeMusic, createFunctionality, addVolumeSliders } from './themes.js';

import { Modal } from 'bootstrap';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";
// import "../styles/shop.css";

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


//array of badges/themes/backgrounds
const docRef = doc(db, "badgesList", "badges");
const docSnap = await getDoc(docRef);

const purchaseModal = new Modal(document.getElementById("purchaseItemModal"), {});

onAuthStateChanged(auth, async (user) => {
    if (user) {

        const docUserRef = doc(db, "users", user.uid); //USER
        const docUserSnap = await getDoc(docUserRef);

        //show available points
        document.getElementById("displayPoints").innerHTML = docUserSnap.data().points;

        showThemes(docUserSnap.data().ownedThemes, docSnap.data().themesArray);
        function showThemes(userThemes, themesArray){
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

            //show locked/unpurchased themes
            for (let index = 0; index < locked.length; index++) {
                const element = locked[index];
                var id = element.id;
                var name = element.name;
                var price = element.price
                var srcPicture = element.srcPicture;

                themesContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title theme-item" data-id="`+id+`" data-name="`+name+`" data-price="`+price+`" style="background-color: black;height:20rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
            }

            var themeItems = document.getElementsByClassName("theme-item")
            for (let index = 0; index < themeItems.length; index++) {
                const element = themeItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");
                    let itemName = this.getAttribute("data-name")
                    let itemPrice = this.getAttribute("data-price")

                    //deselect all
                    for (let index = 0; index < themeItems.length; index++) {
                        const element = themeItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";

                    purchaseModal.show();

                    purchaseMessage.innerHTML = "Are you sure you want to purchase "+"<span class='nes-text is-warning'>"+itemName+"</span>"+" Theme for <span><i class='nes-icon coin is-small'></i>"+itemPrice+"<span>";

                    var old_element = document.getElementById("purchaseConfirm");
                    var new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);

                    new_element.addEventListener('click', function(){
                        purchaseItem(itemID, "themes");
                    });
                    
                });
            }
        }

        showSkins(docUserSnap.data().ownedSkins, docSnap.data().skinsArray);
        function showSkins(userSkins, skinsArray){
            var skinsContainer = document.getElementById('skinsContainer');

            if(userSkins == null || userSkins == ""){
                userSkins = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = skinsArray;
            let unlocked = [];
            let locked = [];

            //sort skins
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userSkins.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show locked/unpurchased skins
            for (let index = 0; index < locked.length; index++) {
                const element = locked[index];
                var id = element.id;
                var name = element.name;
                var price = element.price
                var srcPicture = element.srcPicture;

                skinsContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title skins-item" data-id="`+id+`" data-name="`+name+`" data-price="`+price+`" style="background-color: black;height:20rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="height:100%;">
                    </div>
                    `;
            }

            var skinsItems = document.getElementsByClassName("skins-item")
            for (let index = 0; index < skinsItems.length; index++) {
                const element = skinsItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");
                    let itemName = this.getAttribute("data-name")
                    let itemPrice = this.getAttribute("data-price")

                    //deselect all
                    for (let index = 0; index < skinsItems.length; index++) {
                        const element = skinsItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";

                    purchaseModal.show();

                    purchaseMessage.innerHTML = "Are you sure you want to purchase "+"<span class='nes-text is-warning'>"+itemName+"</span>"+" Theme for <span><i class='nes-icon coin is-small'></i>"+itemPrice+"<span>";

                    var old_element = document.getElementById("purchaseConfirm");
                    var new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);

                    new_element.addEventListener('click', function(){
                        purchaseItem(itemID, "skins");
                    });
                    
                });
            }
        }

        showBackgrounds(docUserSnap.data().ownedBackgrounds, docSnap.data().backgroundsArray);
        async function showBackgrounds(userBackgrounds, backgroundsArray){
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

            //show locked/unpurchased background
            for (let index = 0; index < locked.length; index++) {
                const element = locked[index];
                var id = element.id;
                var name = element.name;
                var price = element.price
                var srcPicture = element.srcPicture;

                backgroundsContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title background-item" data-id="`+id+`"  data-name="`+name+`" data-price="`+price+`" style="background-color: black;height:20rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                `;
                
            }

            var backgroundItems = document.getElementsByClassName("background-item")
            for (let index = 0; index < backgroundItems.length; index++) {
                const element = backgroundItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");
                    let itemName = this.getAttribute("data-name")
                    let itemPrice = this.getAttribute("data-price")

                    //deselect all
                    for (let index = 0; index < backgroundItems.length; index++) {
                        const element = backgroundItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";

                    purchaseModal.show();

                    purchaseMessage.innerHTML = "Are you sure you want to purchase "+"<span class='nes-text is-warning'>"+itemName+"</span>"+" Background for <span><i class='nes-icon coin is-small'></i>"+itemPrice+"<span>";

                    var old_element = document.getElementById("purchaseConfirm");
                    var new_element = old_element.cloneNode(true);
                    old_element.parentNode.replaceChild(new_element, old_element);

                    new_element.addEventListener('click', function(){
                        purchaseItem(itemID, "backgrounds");
                    });
                });
            }
        }

        checkContainer();
    }
});

document.getElementById("purchaseCancel").addEventListener("click", function(){
    purchaseModal.toggle();
});

async function purchaseItem(itemID, type){
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRefItem = doc(db, type, itemID);
            const docSnapItem = await getDoc(docRefItem);

            let price = docSnapItem.data().price;

            const docRefUser = doc(db, "users", user.uid);
            const docSnapUser = await getDoc(docRefUser);

            let points = docSnapUser.data().points;

            if(points < price){
                displayToast("Purchase Failed", "Insufficient Points");
                return;
            }

            let ownedThemes = docSnapUser.data().ownedThemes;
            let ownedBackgrounds = docSnapUser.data().ownedBackgrounds;
            let ownedSkins = docSnapUser.data().ownedSkins;
            let newPoints = points - price;

            switch (type) {
                case "themes":
                    ownedThemes.push(itemID);
                    await updateDoc(docRefUser, {
                        ownedThemes: ownedThemes,
                        points: newPoints
                    }).then(function(){
                        displayToast("Purchase Completed", "Item Added");
                        purchaseModal.toggle();
                        const el1 = document.querySelector('[data-id='+itemID+']');
                        el1.remove();
                        document.getElementById("displayPoints").innerHTML = newPoints;
                        checkContainer();
                        checkForBadges(user);
                    });
                    break;
                case "skins":
                    ownedSkins.push(itemID);
                    await updateDoc(docRefUser, {
                        ownedSkins: ownedSkins,
                        points: newPoints
                    }).then(function(){
                        displayToast("Purchase Completed", "Item Added");
                        purchaseModal.toggle();
                        const el1 = document.querySelector('[data-id='+itemID+']');
                        el1.remove();
                        document.getElementById("displayPoints").innerHTML = newPoints;
                        checkContainer();
                        checkForBadges(user);
                    });
                    break;
                case "backgrounds":
                    ownedBackgrounds.push(itemID);
                    await updateDoc(docRefUser, {
                        ownedBackgrounds: ownedBackgrounds,
                        points: newPoints
                    }).then(function(){
                        displayToast("Purchase Completed", "Item Added");
                        purchaseModal.toggle();
                        const el1 = document.querySelector('[data-id='+itemID+']');
                        el1.remove();
                        document.getElementById("displayPoints").innerHTML = newPoints;
                        checkContainer();
                        checkForBadges(user);
                    });
                    break;
            
                default:
                    break;
            }
        }
    });
}

function checkContainer(){
    var themesContainer = document.getElementById('themesContainer');
    if (themesContainer.querySelectorAll("*").length==0) {
        themesContainer.innerHTML=`
        <span style="height:5rem;width:100%;display:grid;align-items:center;justify-content:center;">There are no more items left</span>
        `
    }

    var skinsContainer = document.getElementById('skinsContainer');
    if (skinsContainer.querySelectorAll("*").length==0) {
        skinsContainer.innerHTML=`
        <span style="height:5rem;width:100%;display:grid;align-items:center;justify-content:center;">There are no more items left</span>
        `
    }

    var backgroundsContainer = document.getElementById('backgroundsContainer');
    if (backgroundsContainer.querySelectorAll("*").length==0) {
        backgroundsContainer.innerHTML=`
        <span style="height:5rem;width:100%;display:grid;align-items:center;justify-content:center;">There are no more items left</span>
        `
    }
}