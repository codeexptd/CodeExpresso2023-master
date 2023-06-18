import { Modal, Toast } from 'bootstrap';

// NAVBAR
// navbar images source
import back_default from "../../assets/images/back_default.png";
import back_hover from "../../assets/images/back_hover.png";
import back_pressed from "../../assets/images/back_pressed.png";
import profile_default from "../../assets/images/profile_default.png";
import profile_hover from "../../assets/images/profile_hover.png";
import profile_pressed from "../../assets/images/profile_pressed.png";
import settings_default from "../../assets/images/settings_default.png";
import settings_hover from "../../assets/images/settings_hover.png";
import settings_pressed from "../../assets/images/settings_pressed.png";

// navbar back button animation
export function addBackButtonAnimation() {
  try {
    document.getElementById("back").addEventListener("mouseover", function(){
      document.getElementById("back-button-img").src = back_hover;
    });
    document.getElementById("back").addEventListener("mouseout", function(){
      document.getElementById("back-button-img").src = back_default;
    });
    document.getElementById("back").addEventListener("mousedown", function(){
      document.getElementById("back-button-img").src = back_pressed;
    });
    document.getElementById("back").addEventListener("mouseup", function(){
      document.getElementById("back-button-img").src = back_hover;
    });
  } catch (error) {}
}

export function addProfileButtonAnimation() {
  // navbar profile button animation
  try {
    document.getElementById("profile").addEventListener("mouseover", function(){
      document.getElementById("profile-button-img").src = profile_hover;
    });
    document.getElementById("profile").addEventListener("mouseout", function(){
      document.getElementById("profile-button-img").src = profile_default;
    });
    document.getElementById("profile").addEventListener("mousedown", function(){
      document.getElementById("profile-button-img").src = profile_pressed;
    });
    document.getElementById("profile").addEventListener("mouseup", function(){
      document.getElementById("profile-button-img").src = profile_hover;
    });
  } catch (error) {}
}

export function addSettingsButtonAnimation() {
  // navbar settings button animation
  try {
    document.getElementById("settings").addEventListener("mouseover", function(){
      document.getElementById("settings-button-img").src = settings_hover;
    });
    document.getElementById("settings").addEventListener("mouseout", function(){
      document.getElementById("settings-button-img").src = settings_default;
    });
    document.getElementById("settings").addEventListener("mousedown", function(){
      document.getElementById("settings-button-img").src = settings_pressed;
    });
    document.getElementById("settings").addEventListener("mouseup", function(){
      document.getElementById("settings-button-img").src = settings_hover;
    });
  } catch (error) {}
}

export function addAllNavbarAnimations() {
  addBackButtonAnimation();
  addProfileButtonAnimation();
  addSettingsButtonAnimation();
}

export function addBackButtonFunctionality() {
  try {
    document.getElementById("back").addEventListener('click', function(){
      var milliseconds = 300;
      setTimeout(function() {
        history.back();
      }, milliseconds);
    });
  } catch (error) {}
}

export function addProfileButtonFunctionality(user) {
  var milliseconds = 300;
  if (user) {
    setTimeout(function() {
      location.href = "profile.html";
    }, milliseconds);
  } else {
    setTimeout(function() {
      location.href = "login.html";
    }, milliseconds);
  }
}

export function addSettingsButtonFunctionality(myModal) {
  try {
    document.getElementById("settings").addEventListener('click', (e) =>{
      myModal.toggle();
    });
    document.getElementById("settings-save").addEventListener('click', (e) =>{
      myModal.toggle();
    });
  } catch (error) {}
}

export function addAllNavbarFunctionality() {
  addBackButtonFunctionality();
  // addProfileButtonFunctionality();
  addSettingsButtonFunctionality(new Modal(document.getElementById("exampleModalCenter"), {}));
}

// TOASTS
export function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

export function showToasts(){
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new Toast(toastEl)
  });
  toastList.forEach(toast => toast.show());
}

export function displayToast(header, message){
  removeElementsByClass("hide");
  document.getElementById("toastsContainer").innerHTML += `
  <div class="toast" data-autohide="false">
    <div class="toast-header">
      <h7 class="mr-auto">`+header+`</h7>
    </div>
    <div class="toast-body">
      `+message+`
    </div>
  </div>
  `
  showToasts();
}

export function displayBadgeEarnedToast(imgSrc, badgeName){
  removeElementsByClass("hide");
  document.getElementById("toastsContainer").innerHTML += `
  <div class="toast" data-autohide="false" style="display:grid;align-items:center;grid-template-columns: 25% 75%;">
    <div>
      <img style="height:4.5rem;width:4.5rem" src="`+imgSrc+`">
    </div>
        <div>
          <span class="nes-text is-warning">Badge Earned</span><br>
          <span>`+badgeName+`</span>
        </div>
  </div>
  `
  showToasts();
}


// function changeSelect(elem){
//     var items = document.querySelectorAll('.themeItem');
//     items.forEach(item => {
//         item.classList.remove('selected');
//       });
//     elem.classList.add("selected");
// }