// Toggle between Login and Sign Up forms
document.getElementById('signup-link').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});

document.getElementById('login-link').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

// Variables for role selection
let selectedRole = null;

// Event listeners for login buttons (Doctor, Patient, Admin)
document.getElementById('doctor-btn').addEventListener('click', function() {
    selectedRole = 'doctor';
    highlightRoleButton(selectedRole);
});

document.getElementById('patient-btn').addEventListener('click', function() {
    selectedRole = 'patient';
    highlightRoleButton(selectedRole);
});

document.getElementById('admin-btn').addEventListener('click', function() {
    selectedRole = 'admin';
    highlightRoleButton(selectedRole);
});

// Function to highlight the selected role button
function highlightRoleButton(role) {
    const buttons = document.querySelectorAll('.role-btn');
    buttons.forEach(button => {
        if (button.id.toLowerCase().includes(role)) {
            button.style.backgroundColor = '#0288d1';
        } else {
            button.style.backgroundColor = '#03a9f4';
        }
    });
}

// Form submission logic
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic form validation
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '' || selectedRole === null) {
        alert("Please fill out all fields and select a role.");
        return;
    }

    // Redirecting based on the role
    if (selectedRole === 'doctor') {
        window.location.href = "doctor.html";
    } else if (selectedRole === 'patient') {
        window.location.href = "patient.html";
    } else if (selectedRole === 'admin') {
        window.location.href = "admin.html";
    }
});

// Handle Sign Up form submission (optional)
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect sign up data
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const email = document.getElementById('email').value;

    if (newUsername === '' || newPassword === '' || email === '') {
        alert("Please fill out all fields.");
        return;
    }

    // Simulate successful sign-up (you can integrate with backend here)
    alert("Sign up successful. Please log in.");
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});
