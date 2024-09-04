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

// Toggle chat window visibility
function toggleChat() {
  var chatWindow = document.getElementById('chatWindow');
  var popupMessage = document.getElementById('popupMessage');

  if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'flex';
    popupMessage.style.display = 'none'; // Hide the pop-up message when chat is opened
  } else {
    chatWindow.style.display = 'none';
  }
}

// Close the pop-up message
function closePopup() {
  document.getElementById('popupMessage').style.display = 'none';
}

// Handle option selection
function handleOption(option) {
  addMessage('user-message', `You selected ${option}`);
  let botMessage;

  if (option === 'Emergency') {
    botMessage = addMessage('bot-message', "You selected Emergency. Here are more details.");
    showAdditionalOptions(['Medical assistance', 'Women security', 'Security', 'Fire', 'Train department', 'Natural disaster'], botMessage);
  } else if (option === 'Moderate') {
    botMessage = addMessage('bot-message', "You selected Moderate. Here are more details.");
    showAdditionalOptions(['Divyangjan Facilities', 'Facilities for women with special needs', 'Unreserved ticketing', 'Luggage/parcels', 'Reserved ticketing', 'Refund of tickets', 'Passenger Amenities', 'Catering and Vending', 'Goods', 'Coach maintenance', 'Bed roll', 'Miscellaneous'], botMessage);
  } else if (option === 'Severe') {
    botMessage = addMessage('bot-message', "You selected Severe. Here are more details.");
    showAdditionalOptions(['Electrical equipment', 'Staff Behaviour', 'Cleanliness', 'Water availability', 'Coach maintenance', 'Corruption/Bribery'], botMessage);
  } else if (option === 'Other') {
    botMessage = addMessage('bot-message', "You selected the Other option. Any other problem ??");
  }

  // Auto-scroll to the bottom after showing options
  autoScroll();
}

// Show additional options directly after the bot's message
function showAdditionalOptions(subOptions, referenceElement) {
  let newOptionsDiv = document.createElement('div');
  newOptionsDiv.className = 'additional-options';

  subOptions.forEach(subOption => {
    let button = document.createElement('button');
    button.innerText = subOption;
    button.onclick = () => handleSubOption(subOption);
    newOptionsDiv.appendChild(button);
  });

  referenceElement.parentNode.insertBefore(newOptionsDiv, referenceElement.nextSibling);

  // Auto-scroll to the bottom after showing sub-options
  autoScroll();
}

// Handle sub-option selection
function handleSubOption(subOption) {
  addMessage('user-message', `You selected ${subOption}`);
  addMessage('bot-message', `You selected ${subOption}. Thank you for your selection!`);

  // Display additional options after sub-option selection
  setTimeout(() => {
    if (subOption === 'Medical assistance') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Medical assistance']);
    } else if (subOption === 'Women security') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Eve teasing', 'Misbehaviour with lady passenger', 'Rape']);
    } else if (subOption === 'Security') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Unauthorised person sitting in Ladies/disabled/SLR/Reserved Coach or seat', 'Theft of passenger Belonging', 'Snatching', 'Nuisance by Hawkers', 'Beggers', 'Eunuch', 'Harrasment', 'Extortion by Security personnel', 'Extortion by Railway Personnel', 'Luggage left Behind', 'Unclaimed Luggage', 'Suspected Articles', 'Passenger missing', 'Passenger not responding calls', 'Smoking', 'Drinking alcohol', 'Narcotics', 'Dacoity', 'Robbery', 'Murder', 'Riots', 'Quarelling', 'Hooliganism', 'Passenger fallen down', 'Nuisance by passenger', 'Other security related issues', 'Explosives', 'Misbehaviour']);
    } else if (subOption === 'Fire') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Fire on train']);
    } else if (subOption === 'Train derailment') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Train derailment', 'Train derailment']);
    } else if (subOption === 'Natural disaster') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Natural disaster']);
    } else if (subOption === 'Divyangjan Facilities') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Divyangjan coach unavailability', 'Divyangjan toilet/washbasin', 'Braille signage in coach', 'Ramp at enter/ exit gates', 'Tactile pathway', 'Parking', 'Low height water booth', 'Low seat toilet', 'Low height ticket counter', 'Seating arrangement at station/waiting area', 'Wheel chair/ battery operated car/ divyang sahayak', 'Travel concession', 'Other divyang (PWD) facilities related']);
    } else if (subOption === 'Facilities for women with special needs') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Segregated area for lactatin mothers in waiting', 'hall', 'Baby food', 'Other facilities related to women', 'with special needs']);
    } else if (subOption === 'Unreserved ticketing') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Digital payment (UTS/ATVM)', 'Over-charging', 'ATVM(Automatic ticket vending machine)',
        'Inadequate Counters', 'MST(Monthly Season Ticket)', 'UTS(Unreserved ticketing system)R-wallet', 'UTS(Unreserved ticketing system)App login Issue', 'UTS App mobile Handset Change']);
    } else if (subOption === 'Luggage/parcels') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Booking', 'Delivery', 'Over-charging', 'Staff not available', 'Touts']);
    } else if (subOption === 'Reserved ticketing') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['E-ticketing', 'Over-charging', 'Tatkal', 'Inadequate Counters', 'Touts']);
    } else if (subOption === 'Refund of tickets') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Counter Ticket', 'Online ticket']);
    } else if (subOption === 'Passenger Amenities') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Enquiry office/inadequate Counter', 'PA(Public announcement) system', '139', 'Wi-fi', 'Benches/Sheds', 'Foot over/Under Bridge']);
    } else if (subOption === 'Electrical equipment') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Air conditioner', 'Fans/lights', 'Charging points', 'Display/ coach indicator board', 'Display coach indicator board']);
    } else if (subOption === 'Staff Behaviour') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Staff Behaviour']);
    } else if (subOption === 'Cleanliness') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Toilet', 'Washbasin', 'Cockroach/ rodents', 'Coach interior', 'Coach exterior', 'Platform', 'Waiting/retiring room', 'Station entrance/ Building', 'Stalls', 'Others cleanliness related issues']);
    } else if (subOption === 'Catering and Vending') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Over-charging', 'Service quality and hygiene', 'Food quality', 'E-catering', 'Food and water not available', 'Other catering and Vending related services']);
    } else if (subOption === 'Water availability') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Drinking water at platform', 'Packaged drinking water/Railneer', 'Water vending machine', 'Retiring room/waiting room', 'Washbasin', 'Toilet', 'Other water availability issues']);
    } else if (subOption === 'Goods') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Booking', 'Delivery', 'Out charging', 'Staff not available', 'Touts', 'Demurrage/ Wharfage', 'Other Goods related issues']);
    } else if (subOption === 'Punctuality') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['NTES App', 'Late running', 'Other punctuality related issues']);
    } else if (subOption === 'Coach maintenance') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Window/ seat Broken', 'Window door locking problem', 'Tapleaking leaking/ not working', 'Broken/missing toilet fittings', 'Jerk/abnormal sounds', 'Other coach maintenance related issues']);
    } else if (subOption === 'Corruption/Bribery') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Corruption/Bribery']);
    } else if (subOption === 'Bed roll') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Dirty/ torn', 'Over-charging', 'Non-availability']);
    } else if (subOption === 'Miscellaneous') {
      addMessage('bot-message', "Here are more options based on your previous choice:");
      showMoreOptions(['Miscellaneous']);
    } else {
      addMessage('bot-message', "Thank you! Do you have any other problems?");
      showMoreOptions();
    }
  }, 1000); // Delay to simulate thinking time

  // Auto-scroll to the bottom after showing sub-options
  autoScroll();
}

// Show additional options after sub-option selection
function showMoreOptions(moreOptions) {
  let chatBody = document.getElementById('chatBody');

  // Remove existing additional options if any
  let existingOptionsDiv = chatBody.querySelector('.additional-options');
  if (existingOptionsDiv) {
    existingOptionsDiv.remove();
  }

  let moreOptionsDiv = document.createElement('div');
  moreOptionsDiv.className = 'additional-options';

  moreOptions.forEach(option => {
    let button = document.createElement('button');
    button.innerText = option;
    button.onclick = () => handleOption(option);
    moreOptionsDiv.appendChild(button);
  });

  chatBody.appendChild(moreOptionsDiv);

  // Auto-scroll to the bottom after showing additional options
  autoScroll();
}

// Add message to chat window and return the created message element
function addMessage(senderClass, message) {
  let chatBody = document.getElementById('chatBody');
  let messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${senderClass}`;
  messageDiv.innerText = message;
  chatBody.appendChild(messageDiv);

  // Auto-scroll to the bottom after adding a message
  autoScroll();

  return messageDiv;
}

// Auto-scroll function
function autoScroll() {
  let chatBody = document.getElementById('chatBody');
  chatBody.scrollTop = chatBody.scrollHeight;
}