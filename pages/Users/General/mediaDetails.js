// details that need to be getted from the realtime db

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Firebase configuration
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
const database = getDatabase(app);

const librariesInfo = document.getElementById("libraries-info");
const cityInput = document.getElementById("availability-two");
const townsList = document.getElementById("towns-list");
const mediaNameElement = document.getElementById("media-name");

function loadMediaName() {
  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaArray = snapshot.val();
        if (mediaArray && mediaArray.length > 3) {
          const firstMedia = mediaArray[3]; // to do for testing as no linking yet
          mediaNameElement.textContent =
            firstMedia.MediaName || "No media name available";
        }
      } else {
        console.error("No media data available");
      }
    })
    .catch((error) => {
      console.error("Error fetching media data:", error);
    });
}

function loadCities() {
  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaArray = snapshot.val();
        const cities = new Set();

        for (const media of mediaArray) {
          if (media && media.BranchCity) {
            cities.add(media.BranchCity);
          }
        }

        // populate the datalist with city names
        cities.forEach((city) => {
          const option = document.createElement("option");
          option.value = city;
          townsList.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching city data:", error);
    });
}

// media avaliablity
function searchByCity() {
  const cityName = cityInput.value.trim();
  const targetMediaID = 3; // to do for testing as no linking yet
  librariesInfo.innerHTML = "";

  if (!cityName) {
    librariesInfo.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaArray = snapshot.val();
        let mediaFound = false;

        for (const media of mediaArray) {
          if (
            media &&
            media.BranchCity === cityName &&
            media.MediaID === targetMediaID
          ) {
            mediaFound = true;

            // Update Media Name
            mediaNameElement.textContent =
              media.MediaName || "Media Name not available";

            let stockClass = "";
            let stockText = "";

            if (media.MediaQuantity === 0) {
              stockClass = "low-stock";
              stockText = "Out of stock";
            } else if (media.MediaQuantity <= 3) {
              stockClass = "low-stock";
              stockText = `${media.MediaQuantity} (Low stock)`;
            } else if (media.MediaQuantity <= 5) {
              stockClass = "medium-stock";
              stockText = `${media.MediaQuantity} (Medium stock)`;
            } else {
              stockClass = "high-stock";
              stockText = `${media.MediaQuantity} (High stock)`;
            }

            // populates the details needed
            const libraryBox = document.createElement("div");
            libraryBox.className = "library-box";
            libraryBox.innerHTML = `
                <h4>Branch Name: ${media.BranchName}</h4>
                <p class="${stockClass}"><strong>Stock:</strong> ${stockText}</p>
              `;
            librariesInfo.appendChild(libraryBox);
          }
        }

        if (!mediaFound) {
          librariesInfo.innerHTML = `<p>No media found for MediaID ${targetMediaID} in ${cityName}.</p>`;
        }
      } else {
        librariesInfo.innerHTML = `<p>No media data available in the database.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching media data:", error);
    });
}

// event listener to search by city
document
  .getElementById("search-button")
  .addEventListener("click", searchByCity);

loadCities();
loadMediaName();
