// Dark-mode Function -------------------------------------------
// Function to toggle dark mode and store preference
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Save dark mode state in localStorage
    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Check if dark mode is enabled when the page loads
function checkDarkMode() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}

// Call the checkDarkMode function when the page loads
window.onload = checkDarkMode;
// Dark-mode Function -------------------------------------------

