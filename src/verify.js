import { initializeApp } from "firebase/app";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink} from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";

const firebaseConfig = {

  apiKey: "AIzaSyDQ5M0TuT6v0JlqhcvZ9tkP5gKYPCCUL2A",

  authDomain: "codeexpresso-ae5b5.firebaseapp.com",

  projectId: "codeexpresso-ae5b5",

  storageBucket: "codeexpresso-ae5b5.appspot.com",

  messagingSenderId: "340531525579",

  appId: "1:340531525579:web:9a7d69339dd2963386284e",

  measurementId: "G-91J9LZ5MXF"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
  
// Confirm the link is a sign-in with email link.
if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        location.href = "activate.html";
      })
      .catch((error) => {
        console.log(error);
      });
}