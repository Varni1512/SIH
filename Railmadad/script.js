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

// Event listener for sending a message in the chatbot
function sendMessage() {
  var chatInput = document.getElementById('chat-input');
  var chatBody = document.getElementById('chat-window-body');
  var message = chatInput.value;

  if (message.trim() !== '') {
    var userMessage = document.createElement('div');
    userMessage.style.margin = '10px 0';
    userMessage.style.textAlign = 'right';
    userMessage.innerHTML = `<span style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 10px;">${message}</span>`;
    chatBody.appendChild(userMessage);
    chatInput.value = '';

    // Auto scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}
