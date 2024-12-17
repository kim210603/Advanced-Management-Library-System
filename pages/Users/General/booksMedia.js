import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
    import { getFirestore, doc, setDoc, updateDoc, deleteField, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyCmcT5fG8Nkny7jlFEN9gn3rRZHxyII_as",
        authDomain: "amllibrary.firebaseapp.com",
        projectId: "amllibrary",
        databaseURL: "https://amllibrary-default-rtdb.europe-west1.firebasedatabase.app",
        storageBucket: "amllibrary.firebasestorage.app",
        messagingSenderId: "612435739543",
        appId: "1:612435739543:web:f22564c7487cc71de47ad2",
        measurementId: "G-T52D62JS9E"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const db = getFirestore(app);
    const auth = getAuth();
    let userID = '';
    let savedWishlistBooks = [];

    //get users id from firestore database
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userID = user.uid;
        }
    });
    //get media from realtime database
    const databaseRef = ref(database, 'media');
    onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        populateBooks(data);
    });

    // get wishlist from database
    const querySnapshot = await getDocs(collection(db, "wishlistPage"));
    querySnapshot.forEach((doc) => {
        savedWishlistBooks.push(doc.id);
    });

    //pupulate books onto the books page
    function populateBooks(data) {
        const fictionList = document.querySelector('.genre-section:nth-of-type(1) .book-list');
        const sFictionList = document.querySelector('.genre-section:nth-of-type(2) .book-list');
        const romanceList = document.querySelector('.genre-section:nth-of-type(3) .book-list');
        const thrillerList = document.querySelector('.genre-section:nth-of-type(4) .book-list');

        //
        fictionList.innerHTML = '';
        romanceList.innerHTML = '';
        thrillerList.innerHTML = '';
        sFictionList.innerHTML = '';

        //for loop to loop through the data and pupulate the books onto the page
        for (const key in data) {
            const record = data[key];
            const bookItem = document.createElement('li');
            bookItem.className = 'book-wrapper';
            let icon = "fa-regular fa-heart";
            //adds the user id to the image url to make it unique
            const userIDImage = userID + encodeURIComponent(record.CoverURL); //needs encoding to work in firebase firestore
            if (savedWishlistBooks.includes(userIDImage)) {
                icon = "fa-solid fa-heart";
            }
            bookItem.innerHTML = `
            <div class="book-item">
                <img src="${record.CoverURL}">
            </div>
            <div class="button-container">
                <button id="button${key}" type="button" class="view-details-button">View Details</button>
                <i id="icon${key}" class="${icon}"></i>
            </div>
            `;
            //adds the books to the right genre lists
            if (record.Genre === 'Fiction') {
                fictionList.appendChild(bookItem);
                addBookEventListener(key, record.MediaName, record.MediaID);
            } else if (record.Genre === 'Science-Fiction') {
                sFictionList.appendChild(bookItem);
                addBookEventListener(key, record.MediaName, record.MediaID);

            } else if (record.Genre === 'Romance') {
                romanceList.appendChild(bookItem);
                addBookEventListener(key, record.MediaName, record.MediaID);
            } else if (record.Genre === 'Thriller') {
                thrillerList.appendChild(bookItem);
                addBookEventListener(key, record.MediaName, record.MediaID);
            }
        }
    }

    function addBookEventListener(iconID, mediaName, mediaID) {
        //functionality to add saved wishlist items to database
        const icon = document.getElementById("icon" + iconID);
        icon.addEventListener('click', async (event) => {
            const coverURL = event.target.closest('.book-wrapper').querySelector('img').src;
            const userIDImg = userID + encodeURIComponent(coverURL);
            if (icon.classList.contains('fa-regular')) {
                console.log('add');
                icon.className = 'fa-solid fa-heart';
                await setDoc(doc(db, 'wishlistPage', userIDImg), {
                    CoverURL: encodeURIComponent(coverURL),
                    userID: userID,
                    mediaName: mediaName,
                    mediaID: mediaID,
                });
                //functionality to remove items from database
            } else {
                if (confirm('Are you sure you want to remove this book from your wishlist?')) {
                    icon.className = 'fa-regular fa-heart';
                    const ref = doc(db, 'wishlistPage', userIDImg);
                    await deleteDoc(doc(db, "wishlistPage", userIDImg));
                }
            }
        });
        const button = document.getElementById("button" + iconID);
        button.addEventListener('click', (event) => {
            const coverURL = event.target.closest('.book-wrapper').querySelector('img').src;
            window.location.href = '../../../pages/Users/General/viewMediaDetailsPage.html?mediaName=' + mediaName + '&coverURL=' + coverURL + '&mediaID=' + mediaID;
        });
    }