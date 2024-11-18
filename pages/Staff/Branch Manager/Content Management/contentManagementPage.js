// const mediaData = [
//     {
//         mediaID: "M101",
//         mediaName: "The Love Hypothesis",
//         branchID: "B001",
//         branchName: "Branch One ",
//         branchPostcode: "S1 3SD",
//         mediaType: "Book",
//         mediaGenre: "Romance",
//         mediaQuantity: 20
//     },

//     {
//         mediaID: "M102",
//         mediaName: "Affaction",
//         branchID: "B002",
//         branchName: "Branch Two",
//         branchPostcode: "S3 8RA",
//         mediaType: "Book",
//         mediaGenre: "Romance",
//         mediaQuantity: 30
//     },

//     {
//         mediaID: "M103",
//         mediaName: "Dune",
//         branchID: "B003",
//         branchName: "Branch One",
//         branchPostcode: "S1 3SD",
//         mediaType: "DVD",
//         mediaGenre: "Science Fiction",
//         mediaQuantity: 10
//     },

//     {
//         mediaID: "M104",
//         mediaName: "Me Before you",
//         branchID: "B003",
//         branchName: "Branch Three",
//         branchPostcode: "S4 7RA",
//         mediaType: "Book",
//         mediaGenre: "Romance",
//         mediaQuantity: 10
//     },

//     {
//         mediaID: "M105",
//         mediaName: "Smurf",
//         branchID: "B003",
//         branchName: "Branch Four",
//         branchPostcode: "S5 8RA",
//         mediaType: "DVD",
//         mediaGenre: "Animation",
//         mediaQuantity: 10
//     },
    
// ];

// // Function to populate the table with data
// function populateTable(data) {
//     const table = document.getElementById("mediaTable");
//     const currentDate = new Date().toISOString().split('T')[0];

//     data.forEach(item => {
       
//         const row = document.createElement("tr");


//         const dateCell = document.createElement("td");
//         const now = new Date();
//         const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(2)}`;
//         dateCell.textContent = formattedDate;
//         row.appendChild(dateCell);

        
//         const mediaIDCell = document.createElement("td");
//         mediaIDCell.textContent = item.mediaID;
//         row.appendChild(mediaIDCell);

//         const mediaNameCell = document.createElement("td");
//         mediaNameCell.textContent = item.mediaName;
//         row.appendChild(mediaNameCell);

//         const branchIDCell = document.createElement("td");
//         branchIDCell.textContent = item.branchID;
//         row.appendChild(branchIDCell);

//         const branchNameCell = document.createElement("td");
//         branchNameCell.textContent = item.branchName;
//         row.appendChild(branchNameCell);

//         const branchPostcodeCell = document.createElement("td");
//         branchPostcodeCell.textContent = item.branchPostcode;
//         row.appendChild(branchPostcodeCell);

//         const mediaTypeCell = document.createElement("td");
//         mediaTypeCell.textContent = item.mediaType;
//         row.appendChild(mediaTypeCell);

//         const mediaGenreCell = document.createElement("td");
//         mediaGenreCell.textContent = item.mediaGenre;
//         row.appendChild(mediaGenreCell);

//         const mediaQuantityCell = document.createElement("td");
//         mediaQuantityCell.textContent = item.mediaQuantity;
//         row.appendChild(mediaQuantityCell);


//         table.appendChild(row);
//     });
// }
// populateTable(mediaData);

// // Function to add a new media item
// function populateTable(data) {
//     const tableBody = document.querySelector('table tbody');
//     tableBody.innerHTML = ''; // Clear existing rows before adding new ones

//     for (const key in data) {
//         const record = data[key]; // Access each record
//         const row = document.createElement('tr'); // Create a new row

//         // Populate the row with data
//         row.innerHTML = `
//             <td>${record.date}</td>
//             <td>${record.MediaID}</td>
//             <td>${record.MediaName}</td>
//             <td>${record.BranchID}</td>
//             <td>${record.BranchName}</td>
//             <td>${record.BranchPostcode}</td>
//             <td>${record.MediaType}</td>
//             <td>${record.Genre}</td>
//             <td>${record.MediaQuantity}</td>
//         `;
//         tableBody.appendChild(row); // Add the row to the table
//     }
// }

// const firebaseConfig = {
//     apiKey: "AIzaSyCmcT5fG8Nkny7jlFEN9gn3rRZHxyII_as",
//     authDomain: "amllibrary.firebaseapp.com",
//     projectId: "amllibrary",
//     databaseURL: "https://amllibrary-default-rtdb.firebaseio.com/",
//     storageBucket: "amllibrary.firebasestorage.app",
//     messagingSenderId: "612435739543",
//     appId: "1:612435739543:web:f22564c7487cc71de47ad2",
//     measurementId: "G-T52D62JS9E"
//   };
  
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// const app = firebase.initializeApp(firebaseConfig);
// const database = getDatabase(app);

// // Reference to the "media" node
// const databaseRef = ref(database, 'media');
// onValue(databaseRef, (snapshot) => {
//     const data = snapshot.val();
//     populateTable(data);
// });