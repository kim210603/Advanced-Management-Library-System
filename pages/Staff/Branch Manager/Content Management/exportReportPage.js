// // Import the necessary Firebase functions (modular approach)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "amllibrary.firebaseapp.com",
//     databaseURL: "https://amllibrary-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "amllibrary",
//     storageBucket: "amllibrary.appspot.com",
//     messagingSenderId: "YOUR_SENDER_ID",
//     appId: "YOUR_APP_ID",
//     measurementId: "YOUR_MEASUREMENT_ID"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// // Initialize Flatpickr for the date fields
// flatpickr("#dateFrom", { dateFormat: "Y-m-d" });
// flatpickr("#dateTo", { dateFormat: "Y-m-d" });

// // Event Listener for the Export Report Form
// document.getElementById("exportReport").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const dateFrom = document.getElementById("dateFrom").value;
//     const dateTo = document.getElementById("dateTo").value;

//     if (!dateFrom || !dateTo) {
//         alert("Please fill in both date fields.");
//         return;
//     }

//     // Convert dates to timestamps for comparison
//     const fromDate = new Date(dateFrom).getTime();
//     const toDate = new Date(dateTo).getTime();

//     const mediaTable = document.querySelector("#mediaTable tbody");
//     mediaTable.innerHTML = ""; // Clear previous results

//     const mediaResults = document.getElementById("mediaResults");
//     mediaResults.style.display = "none"; // Hide table initially

//     // Fetch and filter data from Firebase
//     const mediaRef = ref(database, 'media');
//     get(mediaRef).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const filteredData = [];

//             for (const key in data) {
//                 const record = data[key];
//                 const recordDate = new Date(record.DateStored).getTime();

//                 if (recordDate >= fromDate && recordDate <= toDate) {
//                     filteredData.push(record);
//                 }
//             }

//             if (filteredData.length === 0) {
//                 alert("No data found for the selected date range.");
//                 return;
//             }

//             // Populate table
//             filteredData.forEach((record) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${record.DateStored}</td>
//                     <td>${record.MediaID}</td>
//                     <td>${record.MediaName}</td>
//                     <td>${record.BranchID}</td>
//                     <td>${record.BranchName}</td>
//                     <td>${record.BranchPostcode}</td>
//                     <td>${record.MediaType}</td>
//                     <td>${record.Genre}</td>
//                     <td>${record.MediaQuantity}</td>
//                 `;
//                 mediaTable.appendChild(row);
//             });

//             mediaResults.style.display = "block"; // Show table with results
//         } else {
//             alert("No data found.");
//         }
//     }).catch((error) => {
//         console.error("Error fetching data from Firebase:", error);
//     });
// });


    // // Initialize Flatpickr for the date fields
    // flatpickr("#dateFrom", {
    //     dateFormat: "Y-m-d",
    // });

    // flatpickr("#dateTo", {
    //     dateFormat: "Y-m-d",
    // });

