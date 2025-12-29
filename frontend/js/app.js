// AgriAdvisor Frontend JavaScript
// This file contains basic client-side functionality for the application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up event listeners based on current page
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'login':
            initializeLoginPage();
            break;
        case 'signup':
            initializeSignupPage();
            break;
        case 'dashboard':
            initializeDashboardPage();
            break;
        case 'advisory':
            initializeAdvisoryPage();
            break;
        case 'result':
            initializeResultPage();
            break;
        case 'feedback':
            initializeFeedbackPage();
            break;
        default:
            initializeHomePage();
    }
    
    // Set up common functionality
    setupNavigation();
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().split('.')[0];
    return filename || 'index';
}

// Navigation functionality
function setupNavigation() {
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    // Mobile menu toggle (if needed in future)
    setupMobileMenu();
}

function setupMobileMenu() {
    // Placeholder for mobile menu functionality
    // Can be expanded when mobile hamburger menu is added
}

// Login page functionality
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function handleLogin() {
    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.querySelector('input[name="remember"]').checked;
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // TODO: Replace with actual API call
    console.log('Login attempt:', { email, password, remember });
    showMessage('Login functionality will be implemented with backend integration.', 'info');
    
    // Simulate successful login for demo
    // window.location.href = 'dashboard.html';
}

// Signup page functionality
function initializeSignupPage() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
}

function handleSignup() {
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        farmLocation: document.getElementById('farmLocation').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.querySelector('input[name="terms"]').checked
    };
    
    // Basic validation
    if (!validateSignupForm(formData)) {
        return;
    }
    
    // TODO: Replace with actual API call
    console.log('Signup attempt:', formData);
    showMessage('Signup functionality will be implemented with backend integration.', 'info');
    
    // Simulate successful signup for demo
    // window.location.href = 'dashboard.html';
}

function validateSignupForm(data) {
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'farmLocation', 'password', 'confirmPassword'];
    for (let field of requiredFields) {
        if (!data[field]) {
            showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
            return false;
        }
    }
    
    // Check password match
    if (data.password !== data.confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return false;
    }
    
    // Check terms acceptance
    if (!data.terms) {
        showMessage('Please accept the terms of service.', 'error');
        return false;
    }
    
    return true;
}

// Dashboard page functionality
function initializeDashboardPage() {
    loadDashboardData();
}

function loadDashboardData() {
    // TODO: Replace with actual API calls
    // For now, show placeholder data
    
    // Load farmer info
    const farmerName = document.getElementById('farmerName');
    const farmLocation = document.getElementById('farmLocation');
    
    if (farmerName) farmerName.textContent = 'John Doe';
    if (farmLocation) farmLocation.textContent = 'Springfield, IL';
    
    // Load recent advisories
    loadRecentAdvisories();
    
    // Load weather info
    loadWeatherInfo();
    
    // Load farm statistics
    loadFarmStatistics();
}

function loadRecentAdvisories() {
    // TODO: Replace with actual API call
    console.log('Loading recent advisories...');
}

function loadWeatherInfo() {
    // TODO: Replace with actual weather API call
    const weatherInfo = document.getElementById('weatherInfo');
    if (weatherInfo) {
        // Show placeholder data
        console.log('Loading weather information...');
    }
}

function loadFarmStatistics() {
    // TODO: Replace with actual API call
    console.log('Loading farm statistics...');
}

// Advisory page functionality
function initializeAdvisoryPage() {
    const advisoryForm = document.getElementById('advisoryForm');
    if (advisoryForm) {
        advisoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAdvisorySubmission();
        });
    }
}

function handleAdvisorySubmission() {
    // Get form data
    const formData = {
        soilType: document.getElementById('soilType').value,
        soilPh: document.getElementById('soilPh').value,
        nitrogen: document.getElementById('nitrogen').value,
        phosphorus: document.getElementById('phosphorus').value,
        potassium: document.getElementById('potassium').value,
        temperature: document.getElementById('temperature').value,
        humidity: document.getElementById('humidity').value,
        rainfall: document.getElementById('rainfall').value,
        season: document.getElementById('season').value,
        farmSize: document.getElementById('farmSize').value,
        cropPreference: document.getElementById('cropPreference').value,
        additionalNotes: document.getElementById('additionalNotes').value
    };
    
    // Basic validation
    if (!validateAdvisoryForm(formData)) {
        return;
    }
    
    // TODO: Replace with actual API call
    console.log('Advisory submission:', formData);
    showMessage('Advisory request submitted! Redirecting to results...', 'success');
    
    // Simulate processing and redirect to results
    setTimeout(() => {
        window.location.href = 'result.html';
    }, 2000);
}

function validateAdvisoryForm(data) {
    // Check required fields
    const requiredFields = ['soilType', 'temperature', 'humidity', 'rainfall', 'season', 'farmSize'];
    for (let field of requiredFields) {
        if (!data[field]) {
            showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
            return false;
        }
    }
    
    return true;
}

// Result page functionality
function initializeResultPage() {
    loadAdvisoryResults();
}

function loadAdvisoryResults() {
    // TODO: Replace with actual API call to get results
    // For now, show placeholder data
    
    const advisoryDate = document.getElementById('advisoryDate');
    if (advisoryDate) {
        advisoryDate.textContent = new Date().toLocaleString();
    }
    
    console.log('Loading advisory results...');
    showMessage('Results loaded successfully!', 'success');
}

// Feedback page functionality
function initializeFeedbackPage() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFeedbackSubmission();
        });
    }
}

function handleFeedbackSubmission() {
    // Get form data
    const formData = {
        advisoryId: document.getElementById('advisoryId').value,
        rating: document.querySelector('input[name="rating"]:checked')?.value,
        accuracy: document.getElementById('accuracy').value,
        usefulness: document.getElementById('usefulness').value,
        implementation: document.getElementById('implementation').value,
        improvements: document.getElementById('improvements').value,
        additionalComments: document.getElementById('additionalComments').value,
        contactName: document.getElementById('contactName').value,
        contactEmail: document.getElementById('contactEmail').value,
        followUp: document.querySelector('input[name="followUp"]').checked
    };
    
    // Basic validation
    if (!validateFeedbackForm(formData)) {
        return;
    }
    
    // TODO: Replace with actual API call
    console.log('Feedback submission:', formData);
    showMessage('Thank you for your feedback! It has been submitted successfully.', 'success');
    
    // Reset form after successful submission
    setTimeout(() => {
        document.getElementById('feedbackForm').reset();
    }, 2000);
}

function validateFeedbackForm(data) {
    // Check required fields
    if (!data.accuracy || !data.usefulness) {
        showMessage('Please fill in the required feedback fields.', 'error');
        return false;
    }
    
    return true;
}

// Home page functionality
function initializeHomePage() {
    // Add any home page specific functionality here
    console.log('Home page initialized');
}

// Utility functions
function handleLogout() {
    // TODO: Replace with actual logout API call
    console.log('Logging out...');
    showMessage('Logged out successfully!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function showMessage(message, type = 'info') {
    // Create or update message element
    let messageEl = document.getElementById('app-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'app-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        document.body.appendChild(messageEl);
    }
    
    // Set message content and style based on type
    messageEl.textContent = message;
    messageEl.className = `message-${type}`;
    
    switch(type) {
        case 'success':
            messageEl.style.backgroundColor = '#28a745';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#dc3545';
            break;
        case 'warning':
            messageEl.style.backgroundColor = '#ffc107';
            messageEl.style.color = '#333';
            break;
        default:
            messageEl.style.backgroundColor = '#17a2b8';
    }
    
    // Show message
    messageEl.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }, 5000);
}

// Form utilities
function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

function disableForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => input.disabled = true);
    }
}

function enableForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => input.disabled = false);
    }
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showMessage,
        resetForm,
        disableForm,
        enableForm
    };
}