import { firebaseConfig } from "./config";
import { displayToast, displayBadgeEarnedToast } from "../general/essentials";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';

import { Modal, Toast } from 'bootstrap';
import { get } from "jquery";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
export function loginWithGoogle(){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    createDefaultGoogleUser(user);

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    

    if(error.code == 'auth/multi-factor-auth-required'){
      //recreate the element to get fresh captcha
      document.getElementById("recaptcha-container").innerHTML="";
      recreateElement("recaptcha-container");

      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // console.log(response)
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
      }, auth);

      //show all registered Factors to choose from
      const resolver = getMultiFactorResolver(auth, error);
      document.getElementById("2faSelect").innerHTML = `<option value="" disabled selected hidden>Select an option</option>`;
      for (let index = 0; index < resolver.hints.length; index++) {
        const element = resolver.hints[index];
  
        document.getElementById("2faSelect").innerHTML+=
        `
        <option value="`+index+`">`+element.displayName+` (`+element.phoneNumber+`)</option>
        `
      }
      let twofaModal = new Modal(document.getElementById("2faModal"));
      twofaModal.toggle();

      recreateElement("2faSelect");
      document.getElementById("2faSelect").addEventListener("change", function(){
        document.getElementById("2faSelectContainer").classList.remove("is-error");
        document.getElementById("2faSelectContainer").classList.add("is-dark");
        document.getElementById("2faSelect").style.backgroundColor = "";
        document.getElementById("2faSelect").style.color = "";
      })
      
      recreateElement("2faContinueBtn");
      document.getElementById("2faContinueBtn").addEventListener("click", function(){
        let option = document.getElementById("2faSelect");
        if(option.value==""){
          document.getElementById("2faSelectContainer").classList.add("is-error");
          document.getElementById("2faSelectContainer").classList.remove("is-dark");
          document.getElementById("2faSelect").style.backgroundColor = "black";
          document.getElementById("2faSelect").style.color = "white";
          return
        }
        
        if (resolver.hints[option.value].factorId ===
          PhoneMultiFactorGenerator.FACTOR_ID) {
          const phoneInfoOptions = {
              multiFactorHint: resolver.hints[option.value],
              session: resolver.session
          };
          const phoneAuthProvider = new PhoneAuthProvider(auth);
          // Send SMS verification code
          return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          .then(function (verificationId) {
            //hide first modal
            twofaModal.toggle();

            //clear text input
            document.getElementById("otpInput").value = "";

            //show new modal
            let otpModal = new Modal(document.getElementById("otpModal"));
            otpModal.toggle();

            //clear invalid error display
            document.getElementById("is-error-feedback").style.display = "none";

            recreateElement("otpInput");
            //remove error message on change
            document.getElementById("otpInput").addEventListener("keydown", function(){
              document.getElementById("is-error-feedback").innerHTML = "";
              document.getElementById("is-error-feedback").style.display = "none";

              document.getElementById("otpInput").classList.add("is-dark");
              document.getElementById("otpInput").classList.remove("is-error");
              document.getElementById("otpInput").style.backgroundColor = "";
              document.getElementById("otpInput").style.color = "";
            });

            recreateElement("optConfirmBtn");
            document.getElementById("optConfirmBtn").addEventListener("click", function(){
              // Ask user for the SMS verification code. Then:
              let verificationCode = document.getElementById("otpInput").value;
              const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
              const multiFactorAssertion =
                  PhoneMultiFactorGenerator.assertion(cred);
              // Complete sign-in.
              return resolver.resolveSignIn(multiFactorAssertion).then(function(){
                otpModal.toggle();
                displayToast("Login Success", "Redirecting..");
                location.href = "profile.html";
              }).catch((error) => {
                if(error.code == 'auth/invalid-verification-code'){
                  document.getElementById("otpInput").classList.remove("is-dark");
                  document.getElementById("otpInput").classList.add("is-error");
                  document.getElementById("otpInput").style.backgroundColor = "black";
                  document.getElementById("otpInput").style.color = "white";

                  document.getElementById("is-error-feedback").innerHTML = "Invalid Verification Code";
                  document.getElementById("is-error-feedback").style.display = "block";
                }else if(error.code == 'auth/code-expired'){
                  document.getElementById("otpInput").classList.remove("is-dark");
                  document.getElementById("otpInput").classList.add("is-error");
                  document.getElementById("otpInput").style.backgroundColor = "black";
                  document.getElementById("otpInput").style.color = "white";

                  document.getElementById("is-error-feedback").innerHTML = "Verification Code Expired";
                  document.getElementById("is-error-feedback").style.display = "block";
                  displayToast("Error", "Expired OTP");
                  otpModal.toggle();
                };
              });
            });
          });

        } else {
          // Unsupported second factor.
          displayToast("Error","Unsupported Factor")
        }
      });
      
    }else{
      console.log(error);
    }
  });
}

export function loginWithEmailAndPassword(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    displayToast("Login Success", "Redirecting..");
    location.href = "profile.html";
  })
  .catch((error) => {
    var errorCode = error.code; // auth/invalid-email auth/wrong-password auth/user-not-found
    if(errorCode=='auth/wrong-password' || errorCode=='auth/user-not-found' || errorCode=='auth/invalid-email'){
      displayToast("Login Error", "Invalid Credentials");
    }
    else if(error.code == 'auth/multi-factor-auth-required'){
      //recreate the element to get fresh captcha
      document.getElementById("recaptcha-container").innerHTML="";
      recreateElement("recaptcha-container");

      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // console.log(response)
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
      }, auth);

      //show all registered Factors to choose from
      const resolver = getMultiFactorResolver(auth, error);
      document.getElementById("2faSelect").innerHTML = `<option value="" disabled selected hidden>Select an option</option>`;
      for (let index = 0; index < resolver.hints.length; index++) {
        const element = resolver.hints[index];
  
        document.getElementById("2faSelect").innerHTML+=
        `
        <option value="`+index+`">`+element.displayName+` (`+element.phoneNumber+`)</option>
        `
      }
      let twofaModal = new Modal(document.getElementById("2faModal"));
      twofaModal.toggle();

      recreateElement("2faSelect");
      document.getElementById("2faSelect").addEventListener("change", function(){
        document.getElementById("2faSelectContainer").classList.remove("is-error");
        document.getElementById("2faSelectContainer").classList.add("is-dark");
        document.getElementById("2faSelect").style.backgroundColor = "";
        document.getElementById("2faSelect").style.color = "";
      })
      
      recreateElement("2faContinueBtn");
      document.getElementById("2faContinueBtn").addEventListener("click", function(){
        let option = document.getElementById("2faSelect");
        if(option.value==""){
          document.getElementById("2faSelectContainer").classList.add("is-error");
          document.getElementById("2faSelectContainer").classList.remove("is-dark");
          document.getElementById("2faSelect").style.backgroundColor = "black";
          document.getElementById("2faSelect").style.color = "white";
          return
        }
        
        if (resolver.hints[option.value].factorId ===
          PhoneMultiFactorGenerator.FACTOR_ID) {
          const phoneInfoOptions = {
              multiFactorHint: resolver.hints[option.value],
              session: resolver.session
          };
          const phoneAuthProvider = new PhoneAuthProvider(auth);
          // Send SMS verification code
          return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
          .then(function (verificationId) {
            //hide first modal
            twofaModal.toggle();

            //clear text input
            document.getElementById("otpInput").value = "";

            //show new modal
            let otpModal = new Modal(document.getElementById("otpModal"));
            otpModal.toggle();

            //clear invalid error display
            document.getElementById("is-error-feedback").style.display = "none";

            recreateElement("otpInput");
            //remove error message on change
            document.getElementById("otpInput").addEventListener("keydown", function(){
              document.getElementById("is-error-feedback").innerHTML = "";
              document.getElementById("is-error-feedback").style.display = "none";

              document.getElementById("otpInput").classList.add("is-dark");
              document.getElementById("otpInput").classList.remove("is-error");
              document.getElementById("otpInput").style.backgroundColor = "";
              document.getElementById("otpInput").style.color = "";
            });

            recreateElement("optConfirmBtn");
            document.getElementById("optConfirmBtn").addEventListener("click", function(){
              // Ask user for the SMS verification code. Then:
              let verificationCode = document.getElementById("otpInput").value;
              const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
              const multiFactorAssertion =
                  PhoneMultiFactorGenerator.assertion(cred);
              // Complete sign-in.
              return resolver.resolveSignIn(multiFactorAssertion).then(function(){
                otpModal.toggle();
                displayToast("Login Success", "Redirecting..");
                location.href = "profile.html";
              }).catch((error) => {
                if(error.code == 'auth/invalid-verification-code'){
                  document.getElementById("otpInput").classList.remove("is-dark");
                  document.getElementById("otpInput").classList.add("is-error");
                  document.getElementById("otpInput").style.backgroundColor = "black";
                  document.getElementById("otpInput").style.color = "white";

                  document.getElementById("is-error-feedback").innerHTML = "Invalid Verification Code";
                  document.getElementById("is-error-feedback").style.display = "block";
                }else if(error.code == 'auth/code-expired'){
                  document.getElementById("otpInput").classList.remove("is-dark");
                  document.getElementById("otpInput").classList.add("is-error");
                  document.getElementById("otpInput").style.backgroundColor = "black";
                  document.getElementById("otpInput").style.color = "white";

                  document.getElementById("is-error-feedback").innerHTML = "Verification Code Expired";
                  document.getElementById("is-error-feedback").style.display = "block";
                  displayToast("Error", "Expired OTP");
                  otpModal.toggle();
                };
              });
            });
          });

        } else {
          // Unsupported second factor.
          displayToast("Error","Unsupported Factor")
        }
        

      });
    }
  });
}

function recreateElement(elementID){
  var old_element = document.getElementById(elementID);
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
}

export function sendPasswordReset(email){
  sendPasswordResetEmail(auth, email)
  .then(() => {
    displayToast("Success","Email Sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode=='auth/user-not-found'){
      displayToast("Task Failed","No such user");
    }else if(errorCode=='auth/invalid-email'){
      displayToast("Task Failed","Invalid email");
    }    
  });
}

export function signOutUser(){
  signOut(auth).then(() => {
    location.href = "index.html";
  }).catch((error) => {
    // An error happened.
  });
}

async function getUserTheme(user){
  if (user){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().theme;
    }
  }
}

function createDefaultGoogleUser(user){
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
          profilePicture: user.photoURL,
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
}

export async function checkForBadges(user){
  const docRefUser = doc(db, "users", user.uid);
  const docSnapUser = await getDoc(docRefUser);

  let earnedBadges = docSnapUser.data().earnedBadges;
  let history = docSnapUser.data().history;

  let willUpdate = false;

  //array of badges/themes/backgrounds
  const docRef = doc(db, "badgesList", "badges");
  const docSnap = await getDoc(docRef);

  let backgroundsArray = docSnap.data().backgroundsArray;
  let skinsArray = docSnap.data().skinsArray;
  let themesArray = docSnap.data().themesArray;

  let badgesArray = docSnap.data().badgesArray;

  let totalNumberOfShopItems = backgroundsArray.length + skinsArray.length + themesArray.length;
  
  let ownedBackgrounds = docSnapUser.data().ownedBackgrounds;
  let ownedSkins = docSnapUser.data().ownedSkins;
  let ownedThemes = docSnapUser.data().ownedThemes;

  let itemsOwned = ownedBackgrounds.length + ownedSkins.length + ownedThemes.length;
  // badge7: You hoarder - Buy every item from the shop.
  console.log(itemsOwned,totalNumberOfShopItems,itemsOwned == totalNumberOfShopItems)
  if(itemsOwned == totalNumberOfShopItems && !earnedBadges.includes("badge7")){
    earnedBadges.push("badge7");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: You hoarder"})
    displayBadgeEarnedToast(badgesArray[37].srcPicture, "You hoarder");
    willUpdate = true;
  }

  // badge8: I Choose You - Customize your profile.
  let username = docSnapUser.data().username;
  let profilePicture = docSnapUser.data().profilePicture;
  if(username != "" && profilePicture != "" && !earnedBadges.includes("badge8")){
    earnedBadges.push("badge8");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: I Choose You"})
    displayBadgeEarnedToast(badgesArray[38].srcPicture, "I Choose You");
    willUpdate = true;
  }

  // badge9: Make it rain - Buy your first item from the store.
  if(itemsOwned > 3 && !earnedBadges.includes("badge9")){
    earnedBadges.push("badge9");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: Make it rain"})
    displayBadgeEarnedToast(badgesArray[39].srcPicture, "Make it rain");
    willUpdate = true;
  }

  // badge10: Money CAN buy you happiness - Buy 10 items from the item shop.
  if(itemsOwned >= 10 && !earnedBadges.includes("badge10")){
    earnedBadges.push("badge10");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: Money CAN buy you happiness"})
    displayBadgeEarnedToast(badgesArray[1].srcPicture, "Money CAN buy you happiness");
    willUpdate = true;
  }

  // badge11: Hey bro, wanna get coffee in Starbs. - Buy the café theme from the store.
  if(ownedThemes.includes("theme3") >= 1 && !earnedBadges.includes("badge11")){
    earnedBadges.push("badge11");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: Hey bro, wanna get coffee in Starbs."})
    displayBadgeEarnedToast(badgesArray[2].srcPicture, "Hey bro, wanna get coffee in Starbs.");
    willUpdate = true;
  }

  // badge13: Who lives in a pineapple under the sea - Buy the Tropical Theme from the store.
  if(ownedThemes.includes("theme2") >= 1 && !earnedBadges.includes("badge13")){
    earnedBadges.push("badge13");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: Who lives in a pineapple under the sea"})
    displayBadgeEarnedToast(badgesArray[4].srcPicture, "Who lives in a pineapple under the sea");
    willUpdate = true;
  }

  // badge14: You shall PASS!! - Buy the Fantasy Theme from the store.
  if(ownedThemes.includes("theme1") >= 1 && !earnedBadges.includes("badge14")){
    earnedBadges.push("badge14");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: You shall PASS!!"})
    displayBadgeEarnedToast(badgesArray[5].srcPicture, "You shall PASS!!");
    willUpdate = true;
  }

  // badge31: Express your self - Buy a skin in the store.
  if(ownedSkins.length-1 >= 1 && !earnedBadges.includes("badge31")){
    earnedBadges.push("badge31");
    history.push({dateTime: Timestamp.fromDate(new Date()), description: "Badge Earned: Express your self"})
    displayBadgeEarnedToast(badgesArray[24].srcPicture, "Express your self");
    willUpdate = true;
  }

  


  if(willUpdate){
    await updateDoc(docRefUser, {
      earnedBadges: earnedBadges,
      history: history
    });
  }
}

export { getUserTheme, createDefaultGoogleUser};