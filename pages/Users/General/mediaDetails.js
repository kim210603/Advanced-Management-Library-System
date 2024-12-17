import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"; //9.21.0

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmcT5fG8Nkny7jlFEN9gn3rRZHxyII_as",
  authDomain: "amllibrary.firebaseapp.com",
  databaseURL:
    "https://amllibrary-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "amllibrary",
  storageBucket: "amllibrary.firbase.storage.app",
  messagingSenderId: "612435739543",
  appId: "1:612435739543:web:f22564c7487cc71de47ad2",
  measurementId: "G-T52D62JS9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// global variables for MediaID and MediaName
let selectedMediaID = null;
let selectedMediaName = null;
let selectedBranchName = null;

//export { selectedMediaID, selectedBranchName };

const librariesInfo = document.getElementById("libraries-info");
const cityInput = document.getElementById("availability-two");
const townsList = document.getElementById("towns-list");
const mediaNameElement = document.getElementById("media-name");
const branchSelect = document.getElementById("branch-select");
const pickupOptions = document.getElementById("pickup-options");
const pickupFormMediaIdField = document.getElementById(
  "pickupFormMediaIdField"
);
const pickupFormMediaNameField = document.getElementById(
  "pickupFormMediaNameField"
);
const pickupFormBranchNameField = document.getElementById(
  "pickupFormBranchNameField"
);

function initializeMediaValues() {
  const mediaRef = ref(database, "media");


  // Parse the query string
  const urlParams = new URLSearchParams(queryString);

  // Get the values of the parameters
  const mediaName = urlParams.get("mediaName");
  const coverURL = urlParams.get("coverURL") || "No Name available";
  const mediaID = urlParams.get("mediaID") || "No ID available";

  selectedMediaName = mediaName;
  selectedMediaID = mediaID;

  mediaNameElement.textContent = mediaName;

  const coverUrlElement = document.getElementById("cover-url");
  coverUrlElement.style.backgroundImage = `url('${coverURL}')`;
  coverUrlElement.style.backgroundSize = "cover";
  coverUrlElement.style.backgroundPosition = "center";

  console.log("Media initialized:", selectedMediaName, selectedMediaID);
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
  const cityName = cityInput.value.trim().toLowerCase(); // Convert input to lowercase
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
            media.BranchCity.toLowerCase() === cityName && // Convert database value to lowercase
            media.MediaName === selectedMediaName
        );

        if (filteredMedia.length > 0) {
          filteredMedia.forEach((media) => {
            const libraryBox = document.createElement("div");
            libraryBox.className = "library-box";

            let stockClass = "";
            let stockText = "";

            if (media.MediaQuantity === 0) {
              stockClass = "low-stock";
              stockText = "On Loan";
            } else if (media.MediaQuantity <= 3) {
              stockClass = "low-stock";
              stockText = `${media.MediaQuantity} Available (Low stock)`;
            } else if (media.MediaQuantity <= 5) {
              stockClass = "medium-stock";
              stockText = `${media.MediaQuantity} Available (Medium stock)`;
            } else {
              stockClass = "high-stock";
              stockText = `${media.MediaQuantity} Available (High stock)`;
            }

            libraryBox.innerHTML = `
                    <h4>Branch Name: ${media.BranchName}</h4>
                    <p class="${stockClass}"><strong>Stock:</strong> ${stockText}</p>
                  `;

            librariesInfo.appendChild(libraryBox);
          });
        } else {
          const requestButton = document.getElementById("request-button");
          requestButton.style.display = "inline";
          const selectButton = document.getElementById("selected-branch");
          selectButton.style.display = "none";
          const closeButton = document.getElementById("close-button");
          closeButton.onclick = function () {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("popupDialog").style.display = "none";
            requestButton.style.display = "none";
            selectButton.style.display = "inline";
          };
          librariesInfo.innerHTML = `<p>No media found for "${selectedMediaName}" in ${cityName}.</p>`;
        }
      } else {
        librariesInfo.innerHTML = `<p>No media data available in the database.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching media data:", error);
    });
}

function loadBranches(cityName) {
  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaArray = snapshot.val();
        const filteredBranches = mediaArray.filter(
          (media) =>
            media &&
            media.BranchCity.toLowerCase() === cityName.toLowerCase() && // Convert both values to lowercase
            media.MediaName === selectedMediaName &&
            media.MediaQuantity > 0
        );

        branchSelect.innerHTML = "";

        if (filteredBranches.length > 0) {
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
    loadBranches(cityName.toLowerCase()); // Pass lowercase city name
  } else {
    console.warn("Please enter a city name to search for branches.");
  }
});

document.getElementById("selected-branch").addEventListener("click", () => {
  const selectedBranch = branchSelect.value;
  selectedBranchName = selectedBranch;

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

    pickupFormBranchNameField.value = selectedBranchName;
  } else {
    console.warn("No branch selected.");
    selectedBranchBorrowLabel.textContent = "Haven't selected a branch yet";
    selectedBranchBorrowLabel.style.color = "red";
  }
});

// for the mediaquantity to be -1 every time
/*const pickupButton = document.getElementById("pickup-button");

pickupButton.addEventListener("click", () => {
  console.log("button clicked");
  const branchName = branchSelect.value;
  const mediaID = selectedMediaID;

  if (!branchName) {
    alert("Please select a branch.");
    return;
  }

  if (!mediaID) {
    alert("Please select a media item.");
    return;
  }

  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaData = snapshot.val();

        const mediaKey = Object.keys(mediaData).find(
          (key) =>
            mediaData[key].BranchName === branchName &&
            mediaData[key].MediaID === mediaID
        );

        if (!mediaKey) {
          alert("Media not found for the selected branch.");
          return;
        }

        const mediaEntry = mediaData[mediaKey];
        const currentQuantity = mediaEntry.MediaQuantity;

        if (currentQuantity > 0) {
          const newQuantity = currentQuantity - 1;

          const mediaQuantityRef = ref(
            database,
            `media/${mediaKey}/MediaQuantity`
          );
          set(mediaQuantityRef, newQuantity)
            .then(() => {
              alert(
                `Pickup successful! New quantity of Media ID "${mediaID}" at "${branchName}": ${newQuantity}`
              );
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
              alert("Failed to update the stock.");
            });
        } else {
          alert(
            `Media ID "${mediaID}" is out of stock at the branch "${branchName}".`
          );
        }
      } else {
        console.error("No media data found.");
        alert("No media data found.");
      }
    })
    .catch((error) => {
      console.error("Error accessing media data:", error);
    });
}); */

// same as pickup, but would also need to do address
const submitDeliveryButton = document.getElementById("submitDelivery");

submitDeliveryButton.addEventListener("click", (event) => {
  event.preventDefault();

  const branchName = branchSelect.value;
  const mediaID = selectedMediaID;

  if (!branchName) {
    alert("Please select a branch.");
    return;
  }

  if (!mediaID) {
    alert("Please select a media item.");
    return;
  }

  const mediaRef = ref(database, "media");

  get(mediaRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const mediaData = snapshot.val();

        const mediaKey = Object.keys(mediaData).find(
          (key) =>
            mediaData[key].BranchName === branchName &&
            mediaData[key].MediaID === mediaID
        );

        if (!mediaKey) {
          alert("Media not found for the selected branch.");
          return;
        }

        const mediaEntry = mediaData[mediaKey];
        const currentQuantity = mediaEntry.MediaQuantity;

        if (currentQuantity > 0) {
          const newQuantity = currentQuantity - 1;

          const mediaQuantityRef = ref(
            database,
            `media/${mediaKey}/MediaQuantity`
          );
          set(mediaQuantityRef, newQuantity)
            .then(() => {
              alert(
                `Delivery successful! New quantity of Media ID "${mediaID}" at "${branchName}": ${newQuantity}`
              );
            })
            .catch((error) => {
              console.error("Error updating quantity:", error);
              alert("Failed to update the stock.");
            });
        } else {
          alert(
            `Media ID "${mediaID}" is out of stock at the branch "${branchName}".`
          );
        }
      } else {
        console.error("No media data found.");
        alert("No media data found.");
      }
    })
    .catch((error) => {
      console.error("Error accessing media data:", error);
    });
});

// initialize the app
loadCities();
initializeMediaValues();

document
  .getElementById("search-button")
  .addEventListener("click", searchByCity);
