// the id
//const availabilityText = document.getElementById("availability");

// number from h3 text avalibilty
//const availableCopies = parseInt(availabilityText.innerText.split(": ")[1], 10);

// the options
// need to see realistic numbers then type it in, but for now its okay
/*if (availableCopies === 0) {
  availabilityText.innerText = "Not Available";
  availabilityText.classList.add("low-stock");
} else if (availableCopies <= 3) {
  availabilityText.classList.add("low-stock");
} else if (availableCopies <= 5) {
  availabilityText.classList.add("medium-stock");
} else {
  availabilityText.classList.add("high-stock");
}*/

// read more button for the description
document.getElementById("read-more").addEventListener("click", function () {
  var description = document.getElementById("description");
  var button = document.getElementById("read-more");

  if (description.style.maxHeight === "none") {
    // collapse the paragraph back
    description.style.maxHeight = "300px";
    button.innerText = "Read more";
  } else {
    // expand the paragraph to show full text
    description.style.maxHeight = "none";
    button.innerText = "Read less";
  }
});

//dummy data but will need real data later
const libraryData = {
  Sheffield: [
    { name: "Sheffield Central Library", stock: 12 },
    { name: "Hillsborough Library", stock: 8 },
    { name: "Walkley Library", stock: 5 },
  ],
  Leeds: [
    { name: "Leeds Central Library", stock: 15 },
    { name: "Chapel Allerton Library", stock: 10 },
    { name: "Oakwood Library", stock: 7 },
  ],
  Doncaster: [
    { name: "Doncaster Central Library", stock: 9 },
    { name: "Bessacarr Library", stock: 6 },
  ],
  London: [
    { name: "London Library", stock: 20 },
    { name: "British Library", stock: 30 },
    { name: "Westminster Library", stock: 15 },
  ],
  York: [
    { name: "York Explore Library", stock: 18 },
    { name: "Acomb Explore Library", stock: 10 },
  ],
  Meow: [{ name: "Meowton", stock: 0 }],
};

function popupSearch() {
  const town = document.getElementById("availability-two").value;
  const librariesInfo = document.getElementById("libraries-info");
  const pickupOptions = document.getElementById("pickup-options"); // dropdown container
  const branchSelect = document.getElementById("branch-select"); // dropdown itself

  // so its empty
  librariesInfo.innerHTML = "";
  branchSelect.innerHTML = "";

  if (libraryData[town]) {
    const libraries = libraryData[town]; // gets libraries for the selected town

    if (libraries.length > 0) {
      libraries.forEach((library) => {
        const libraryBox = document.createElement("div"); //creating the container for each data thing
        libraryBox.className = "library-box";

        // to colour avaliablity
        let stockText = "";
        let stockClass = "";

        if (library.stock === 0) {
          stockText = "None";
          stockClass = "low-stock"; // if theres no stock
        } else if (library.stock <= 3) {
          stockText = `${library.stock} (Low stock)`;
          stockClass = "low-stock"; // low stock
        } else if (library.stock <= 5) {
          stockText = `${library.stock} (Medium stock)`;
          stockClass = "medium-stock"; // medium stock
        } else {
          stockText = `${library.stock} (High stock)`;
          stockClass = "high-stock"; // high stock
        }

        // whats gonna be visible to user
        libraryBox.innerHTML = `
          <h4>${library.name}</h4>
          <p class="${stockClass}">Stock available: ${stockText}</p>
        `;
        librariesInfo.appendChild(libraryBox);

        // so its only visible if there is stock inside
        if (library.stock > 0) {
          const option = document.createElement("option");
          option.value = library.name;
          option.textContent = `${library.name} (Stock: ${library.stock})`;
          branchSelect.appendChild(option);
        }
      });

      if (branchSelect.options.length > 0) {
        pickupOptions.style.display = "block";
      } else {
        pickupOptions.style.display = "none";
      }
    } else {
      // if there are no libraries in the town thats in the input
      librariesInfo.innerHTML = `<p>No libraries found in the area.</p>`;
      pickupOptions.style.display = "none";
    }
  } else {
    //if inputed town doesnt exist in the list, or if misspelled
    librariesInfo.innerHTML = `<p>No libraries found for "${town}". Please check your input.</p>`;
    pickupOptions.style.display = "none";
  }

  // Show the popup
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popupDialog").style.display = "block";
}

function popupBorrow() {
  document.getElementById("overlayBorrow").style.display = "block";
  document.getElementById("popupDialogBorrow").style.display = "block";
}

//
function closeSearch() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popupDialog").style.display = "none";
}

function closeBorrow() {
  document.getElementById("overlayBorrow").style.display = "none";
  document.getElementById("popupDialogBorrow").style.display = "none";
}

/*// populates data when it will be ready instead of typing it bit by bit
function popupSearch() {
  const town = document.getElementById("availability-two").value;
  const librariesInfo = document.getElementById("libraries-info");
  const pickupOptions = document.getElementById("pickup-options"); // Dropdown container
  const branchSelect = document.getElementById("branch-select"); // Dropdown itself

  if (libraryData[town]) {
    // so its empty
    librariesInfo.innerHTML = "";
    branchSelect.innerHTML = "";

    //later need to do it so it only generates when there is data and if the town exists
    // generates new data
    libraryData[town].forEach((library) => {
      const libraryBox = document.createElement("div");
      libraryBox.className = "library-box";
      libraryBox.innerHTML = `
        <h4>${library.name}</h4>
        <p>Stock available: ${library.stock}</p>
      `;
      librariesInfo.appendChild(libraryBox);

      // branch dropdown
      const option = document.createElement("option");
      option.value = library.name;
      option.textContent = `${library.name} (Stock: ${library.stock})`;
      branchSelect.appendChild(option);
    });

    if (branchSelect.options.length > 0) {
      pickupOptions.style.display = "block";
    }

    // if dont select anything
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popupDialog").style.display = "block";
  } else {
    alert("Please select a valid town from the list.");
  }
}

// closes the popup
function closeSearch() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popupDialog").style.display = "none";
}*/
