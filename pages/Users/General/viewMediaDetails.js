// the id
const availabilityText = document.getElementById("availability");

// number from h3 text avalibilty
const availableCopies = parseInt(availabilityText.innerText.split(": ")[1], 10);

// the options
if (availableCopies === 0) {
  availabilityText.innerText = "Not Available";
  availabilityText.classList.add("low-stock");
} else if (availableCopies <= 3) {
  availabilityText.classList.add("low-stock");
} else if (availableCopies <= 5) {
  availabilityText.classList.add("medium-stock");
} else {
  availabilityText.classList.add("high-stock");
}

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
};

// populates data when it will be ready instead of typing it bit by bit
function popupSearch() {
  const town = document.getElementById("availability-two").value;
  const librariesInfo = document.getElementById("libraries-info");

  if (libraryData[town]) {
    // so its empty
    librariesInfo.innerHTML = "";

    // generates new data
    libraryData[town].forEach((library) => {
      const libraryBox = document.createElement("div");
      libraryBox.className = "library-box";
      libraryBox.innerHTML = `
        <h4>${library.name}</h4>
        <p>Stock available: ${library.stock}</p>
      `;
      librariesInfo.appendChild(libraryBox);
    });

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
}
