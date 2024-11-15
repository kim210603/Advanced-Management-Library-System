function showForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.remove("hidden");
    formContainer.style.display = "flex"; 
}

function hideForm() {
    const formContainer = document.getElementById("formContainer");
    formContainer.classList.add("hidden");
    formContainer.style.display = "none";
}