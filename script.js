// Sign-In Modal Functionality
function openSignInModal() {
  document.getElementById('signInModal').style.display = 'flex';
}

function closeSignInModal() {
  document.getElementById('signInModal').style.display = 'none';
}

// Form Validation and Submission for Sign-In
document.getElementById('signInForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    alert('Sign-In Successful! Redirecting to dashboard...');
    closeSignInModal();
    // Redirect to dashboard (placeholder)
    window.location.href = '#dashboard';
  } else {
    alert('Please fill in all required fields.');
  }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('contact-email').value;
  const business = document.getElementById('business').value;
  const message = document.getElementById('message').value;

  if (name && email && business && message) {
    alert('Thank you! We’ll get back to you soon.');
    this.reset();
  } else {
    alert('Please fill in all required fields.');
  }
});