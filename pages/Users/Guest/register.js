// JavaScript to toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute between "password" (hidden) and "text" (visible)
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the eye icon to reflect visibility state
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

// https://firebase.google.com/docs/auth/web/start
// https://www.geeksforgeeks.org/getting-started-with-firebase-email-password-authentication/
// https://www.youtube.com/watch?v=WM178YopjfI

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmcT5fG8Nkny7jlFEN9gn3rRZHxyII_as",
  authDomain: "amllibrary.firebaseapp.com",
  databaseURL:
    "https://amllibrary-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "amllibrary",
  storageBucket: "amllibrary.firebasestorage.app",
  messagingSenderId: "612435739543",
  appId: "1:612435739543:web:f22564c7487cc71de47ad2",
  measurementId: "G-T52D62JS9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// registration logic
const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  // inputs
  const fullName = document.getElementById("fullName").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // input validation
  if (!email || !password || !fullName || !dob || !gender) {
    alert("Please fill in all fields.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // user is created successfully
      const user = userCredential.user;
      alert("Account created successfully!");
      window.location.href = "guestHomepage.html";
    })

    .catch((error) => {
      // handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
      console.error("Error code:", errorCode);
    });
});
