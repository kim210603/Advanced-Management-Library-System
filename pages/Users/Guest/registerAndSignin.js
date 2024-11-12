//used twice so better practive to make it into a seperate file

// JavaScript to toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute between "password" (hidden) and "text" (visible)
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the eye icon to reflect visibility state
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
