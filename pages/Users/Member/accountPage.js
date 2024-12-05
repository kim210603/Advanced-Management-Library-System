import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,sendEmailVerification,} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {getFirestore,doc,setDoc,} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmcT5fG8Nkny7jlFEN9gn3rRZHxyII_as",
  authDomain: "amllibrary.firebaseapp.com",
  projectId: "amllibrary",
  storageBucket: "amllibrary.firebasestorage.app",
  messagingSenderId: "612435739543",
  appId: "1:612435739543:web:f22564c7487cc71de47ad2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const fetchUsers = async () => {
    const userDisplay = document.getElementById("userDisplay");
    userDisplay.innerHTML = ""; // Clear the list
  
    try {
      // Get all documents from the "users" collection
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const user = doc.data(); // Get user data
        const li = document.createElement("li");
        li.textContent = `Username: ${user.username}, Email: ${user.email}`;
        userDisplay.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  
  // Call the function to fetch users
  fetchUsers();

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



