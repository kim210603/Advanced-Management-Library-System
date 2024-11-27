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
// https://firebase.google.com/docs/firestore/security/get-started

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// registration logic
const submit = document.getElementById("submit");

submit.addEventListener("click", async function (event) {
  event.preventDefault();

  // collect user inputs
  const fullName = document.getElementById("fullName").value.trim();
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // validates form fields
  if (!fullName || !dob || !gender || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // creates user (auth)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // rules are updated for it, may need to change when editing users
    // save user details to firestore database (cloud)
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      dob,
      gender,
      email,
      uid: user.uid,
      createdAt: new Date(), // can use this for the report
    });

    alert("Account created successfully and details saved!");
    window.location.href = "guestHomepage.html";
  } catch (error) {
    console.error("Error during registration:", error);
    alert(`Error: ${error.message}`);
  }
});
