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
        if (mediaArray && mediaArray.length > 1) {
          const firstMedia = mediaArray[1]; // to do for testing as no linking yet
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

function searchByCity() {
  const cityName = cityInput.value.trim();
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
        const filteredMedia = mediaArray.filter(
          (media) =>
            media &&
            media.BranchCity === cityName &&
            media.MediaName === "Pride and Prejudice" //best way to do it for now as it will pull up other branches too with the same title
        );

        if (filteredMedia.length > 0) {
          filteredMedia.forEach((media) => {
            const libraryBox = document.createElement("div");
            libraryBox.className = "library-box";

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

            libraryBox.innerHTML = `
                    <h4>Branch Name: ${media.BranchName}</h4>
                    <p class="${stockClass}"><strong>Stock:</strong> ${stockText}</p>
                  `;

            librariesInfo.appendChild(libraryBox);
          });
        } else {
          librariesInfo.innerHTML = `<p>No media found for "Pride and Prejudice" in ${cityName}.</p>`;
        }
      } else {
        librariesInfo.innerHTML = `<p>No media data available in the database.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching media data:", error);
    });
}

const branchSelect = document.getElementById("branch-select");
const pickupOptions = document.getElementById("pickup-options");

function loadBranches(cityName) {
  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaArray = snapshot.val();

        const filteredBranches = mediaArray.filter(
          (media) =>
            media &&
            media.BranchCity === cityName &&
            media.MediaName === "Pride and Prejudice" &&
            media.MediaQuantity > 0
        );

        branchSelect.innerHTML = "";

        if (filteredBranches.length > 0) {
          // populate drop down if avaliable
          filteredBranches.forEach((branch) => {
            const option = document.createElement("option");
            option.value = branch.BranchName;
            option.textContent = branch.BranchName;
            branchSelect.appendChild(option);
          });

          pickupOptions.style.display = "block";
        } else {
          pickupOptions.style.display = "none";
          console.warn(
            `No branches found in ${cityName} with the selected media.`
          );
        }
      } else {
        console.error("No media data available in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching branch data:", error);
    });
}

document.getElementById("search-button").addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (cityName) {
    loadBranches(cityName);
  } else {
    console.warn("Please enter a city name to search for branches.");
  }
});

document.getElementById("selected-branch").addEventListener("click", () => {
  const selectedBranch = branchSelect.value;

  const selectedBranchLabel = document.getElementById("selected-branch-label");
  const selectedBranchLabelContainer = document.getElementById(
    "selected-branch-label-container"
  );

  const selectedBranchBorrowLabel = document.getElementById(
    "selected-branch-borrow-label"
  );

  if (selectedBranch) {
    selectedBranchLabel.textContent = selectedBranch;
    selectedBranchBorrowLabel.textContent = selectedBranch;
    selectedBranchBorrowLabel.style.color = "green";

    selectedBranchLabelContainer.style.display = "block";

    const popupDialog = document.getElementById("popupDialog");
    popupDialog.style.display = "none";
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  } else {
    console.warn("No branch selected.");
    selectedBranchBorrowLabel.textContent = "Haven't selected a branch yet";
    selectedBranchBorrowLabel.style.color = "red";
  }
});

// event listener to search by city
document
  .getElementById("search-button")
  .addEventListener("click", searchByCity);

loadCities();
loadMediaName();
