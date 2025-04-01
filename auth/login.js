document.addEventListener("DOMContentLoaded", function () {
    let selectedRole = ""; // Store selected role

    // Role selection buttons
    document.getElementById("doctor-btn").addEventListener("click", function () {
        selectedRole = "doctor";
        highlightRole("doctor-btn");
    });

    document.getElementById("patient-btn").addEventListener("click", function () {
        selectedRole = "patient";
        highlightRole("patient-btn");
    });

    document.getElementById("admin-btn").addEventListener("click", function () {
        selectedRole = "admin";
        highlightRole("admin-btn");
    });

    // Handle Signup
    document.getElementById("signup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;
        const email = document.getElementById("email").value;

        if (!selectedRole) {
            alert("Please select a role before signing up.");
            return;
        }

        // Retrieve existing users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if username already exists
        if (users.some(user => user.username === newUsername)) {
            alert("Username already taken. Please choose another.");
            return;
        }

        // Save user data
        users.push({ username: newUsername, password: newPassword, email, role: selectedRole });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! Please log in.");
        document.getElementById("signup-form").reset();
        showLoginForm();
    });

    // Handle Login
    document.getElementById("login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert("Invalid username or password.");
            return;
        }

        if (user.role !== selectedRole) {
            alert("Selected role does not match your account role.");
            return;
        }

        // Store logged-in user details
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect based on role
        if (user.role === "doctor") {
            window.location.href = "../doctor/doctor.html";
        } else if (user.role === "patient") {
            window.location.href = "../patient/patient.html";
        } else if (user.role === "admin") {
            window.location.href = "../admin/admin.html";
        }
    });

    // Toggle between login and signup
    document.getElementById("signup-link").addEventListener("click", showSignupForm);
    document.getElementById("login-link").addEventListener("click", showLoginForm);

    function showSignupForm() {
        document.getElementById("login-form").classList.add("hidden");
        document.getElementById("signup-form").classList.remove("hidden");
    }

    function showLoginForm() {
        document.getElementById("signup-form").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
    }

    function highlightRole(selectedId) {
        document.querySelectorAll(".role-btn").forEach(btn => btn.classList.remove("selected"));
        document.getElementById(selectedId).classList.add("selected");
    }
});
