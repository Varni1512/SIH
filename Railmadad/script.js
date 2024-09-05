function showForm(formId) {
  const forms = document.querySelectorAll('.form-container');
  forms.forEach(form => {
    form.classList.remove('active');
  });
  document.getElementById(formId).classList.add('active');
}
function toggleChatWindow() {
  var chatWindow = document.getElementById('chat-window');
  if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'block';
  } else {
    chatWindow.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  const closeLogin = document.getElementById('closeLogin');
  const closeSignup = document.getElementById('closeSignup');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const goToLogin = document.getElementById('goToLogin');

  // Open the Login form
  loginButton.addEventListener('click', function () {
    loginForm.style.display = 'block';
  });

  // Open the Sign Up form
  signupButton.addEventListener('click', function () {
    signupForm.style.display = 'block';
  });

  // Close the Login form and return to the Sign Up form
  closeLogin.addEventListener('click', function () {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  // Close the Sign Up form and return to the home page
  closeSignup.addEventListener('click', function () {
    signupForm.style.display = 'none';
    window.location.href = 'index.html'; // Change this to your homepage URL if needed
  });

  // Switch from Sign Up form to Login form
  goToLogin.addEventListener('click', function () {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Close modal if the user clicks outside of it
  window.onclick = function (event) {
    if (event.target == loginForm) {
      loginForm.style.display = 'none';
    }
    if (event.target == signupForm) {
      signupForm.style.display = 'none';
    }
  };
});
function closeForm() {
  window.location.href = 'index.html';  // Replace 'index.html' with the path to your main page
}
// Toggle chat window visibility and notification
function toggleChat() {
  var chatWindow = document.getElementById('chatWindow');
  var chatNotification = document.getElementById('chatNotification');

  if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'flex';
    chatNotification.style.display = 'none';
  } else {
    chatWindow.style.display = 'none';
    chatNotification.style.display = 'flex';
  }
}
// Show the pop-up message after a delay
setTimeout(() => {
  document.getElementById('popupMessage').style.display = 'flex';
}, 2000); // Adjust the delay as needed

// Close the pop-up message
function closePopup() {
  document.getElementById('popupMessage').style.display = 'none';
}