//creates a dynamic tab and removes active status to allow for the tabs to change (used copilot to do) -->
    document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach((tab) => {
            tab.addEventListener('click', (event) => {
                event.preventDefault();

                // Remove 'active' class from all tabs and contents
                tabs.forEach((t) => t.classList.remove('active'));
                contents.forEach((c) => c.classList.remove('active'));

                // Add 'active' class to the clicked tab and its corresponding content
                tab.classList.add('active');
                const target = document.querySelector(tab.querySelector('a').getAttribute('href'));
                target.classList.add('active');
            });
        });
    });

    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
        import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
        import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteField, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
        import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

        // initialize Firebase
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const db = getFirestore(app);
        const auth = getAuth();
        let userID = '';
        let userName = '';
        let userDOB = '';
        let userGender = '';
        let userEmail = '';
        let userPassword = '';

        // used to get user's registered details from the database
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userID = user.uid;
                const userDoc = await getDoc(doc(db, "users", userID));
                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    userName = userData.fullName;
                    userDOB = userData.dob;
                    userGender = userData.gender;
                    userEmail = userData.email;
                    userPassword = userData.password;

                    document.getElementById("savedName").value = userName;
                    document.getElementById("savedDOB").value = userDOB;
                    document.getElementById("savedGender").value = userGender;
                    document.getElementById("savedEmail").value = userEmail;
                    document.getElementById("savedPassword").value = userPassword;
                }
            }
        });
        // function to change the text field status from read only to editable
        document.getElementById('edit-btn').addEventListener('click', () => {
            document.querySelectorAll('.savedForm input').forEach(input => {
                if (input.id !== 'savedDOB' && input.id !== 'savedEmail' && input.id !== 'savedPassword' && input.id !== 'savedName') {
                    input.removeAttribute('readonly');
                }
            });
        });
        //function to save the changes that have eben made to the text fields
        document.getElementById('save-btn').addEventListener('click', async () => {
            const user = auth.currentUser;
            if (user) {
                const inputUserName = document.getElementById('savedName').value;
                const inputUserDOB = document.getElementById('savedDOB').value;
                const inputUserGender = document.getElementById('savedGender').value;
                const inputUserEmail = document.getElementById('savedEmail').value;
                const inputUserPassword = document.getElementById('savedPassword').value;


            if(userName === inputUserName && userDOB === inputUserDOB && userGender === inputUserGender && userEmail === inputUserEmail && userPassword === inputUserPassword) {
                alert('No changes have been made.');
            } else {
                if (confirm('Are you sure you want to save changes?')) {
                    userName = inputUserName;
                    userDOB = inputUserDOB;
                    userGender = inputUserGender;
                    userEmail = inputUserEmail;
                    userPassword = inputUserPassword;
                    const updatedData = {
                        fullName: userName,
                        dob: userDOB,
                        gender: userGender,
                        email: userEmail,
                        password: userPassword // Placeholder for password
                    };
                    //try to update the database with newly inputted data
                    try {
                        await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
                        alert('Changes saved successfully!');
                        document.querySelectorAll('.savedForm input').forEach(input => {
                            input.setAttribute('readonly', true);
                        });
                        //if this doesnt work, the error gets caught and the user should be alerted
                    } catch (error) {
                        console.error("Error updating document: ", error);
                        alert('Failed to save changes.');
                    }
                }
            }
            }
        });




        //gets the wishlist from the firestore database
        let savedWishlistBooks = [];
        const querySnapshot = await getDocs(collection(db, "wishlistPage"));
        querySnapshot.forEach((doc) => {
            const fieldsData = doc._document.data.value.mapValue.fields
            savedWishlistBooks.push({
                id: fieldsData.userID.stringValue,
                mediaID: fieldsData.mediaID.integerValue || fieldsData.mediaID.stringValue,
                mediaName: fieldsData.mediaName.stringValue,
                coverURL: fieldsData.CoverURL.stringValue
            });
        });
        // filters out the books that haven't been added by the current user
        savedWishlistBooks = savedWishlistBooks.filter(book => book.id === userID);
        for (let i = 0; i < savedWishlistBooks.length; i++) {
            const bookList = document.querySelector('.book-list');
            const bookItem = document.createElement('li');
            bookItem.className = 'book-wrapper';
            let mediaName = savedWishlistBooks[i].mediaName;
            let mediaID = savedWishlistBooks[i].mediaID;
            let coverURL = savedWishlistBooks[i].coverURL;
            coverURL = decodeURIComponent(coverURL);

            //creates the book item
            bookItem.innerHTML = `
            <div class="book-item">
                <img src="${coverURL}">
            </div>
            <div class="button-container">
                <button id="button${i}" type="button" class="view-details-button">View Details</button>
                <i id="icon${i}" class="fas fa-heart"></i>
            </div>
            `;
            bookList.appendChild(bookItem, mediaName, mediaID);


            //remove the book from wishlist
            removeFromWishlist(i, mediaName, mediaID);


        }

        //function to remove the books from the wishlist
        function removeFromWishlist(iconID, mediaName, mediaID) {
            
            //function to bring up alert box to confirm that the user wants to remove the book from their wishlist
            const icon = document.getElementById("icon" + iconID);
            icon.addEventListener('click', async (event) => {

                if (confirm('Are you sure you want to remove this book from your wishlist?')) {
                    const coverURL = event.target.closest('.book-wrapper').querySelector('img').src;
                    const userIDImg = userID + encodeURIComponent(coverURL);
                    console.log('delete');
                    icon.className = 'fa-regular fa-heart';
                    const ref = doc(db, 'wishlistPage', userIDImg);
                    await deleteDoc(doc(db, "wishlistPage", userIDImg));
                    icon.parentElement.parentElement.parentElement.remove(); //do not delete (slows down the page refreshing when it is removed)
                }
            });
            //function to open the view details page for the specific book
            const button = document.getElementById("button" + iconID);
            button.addEventListener('click', (event) => {
                const coverURL = event.target.closest('.book-wrapper').querySelector('img').src;
                window.location.href = '../../../pages/Users/General/viewMediaDetailsPage.html?mediaName=' + mediaName + '&coverURL=' + coverURL + '&mediaID=' + mediaID;
              });}


