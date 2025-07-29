
document.addEventListener('DOMContentLoaded', () => {
  const modeBtn = document.getElementById('toggle-mode');
  const toast = document.getElementById('toast');

  // Load theme from storage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Toggle dark mode
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme',
        document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      showToast('Theme changed');
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }

  // Example toast trigger
  showToast('Welcome to Save The Children website');
});

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const loginBox = document.getElementById('login-box');
  const loginForm = document.getElementById('login-form');
  const userDisplay = document.getElementById('user-display');

  const USERNAME = 'admin';
  const PASSWORD = '1234';

  if (localStorage.getItem('loggedInUser')) {
    showUser(localStorage.getItem('loggedInUser'));
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginBox.style.display = loginBox.style.display === 'block' ? 'none' : 'block';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = loginForm.username.value.trim();
      const password = loginForm.password.value.trim();
      if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem('loggedInUser', username);
        showUser(username);
        loginBox.style.display = 'none';
        showToast('Login successful');
      } else {
        showToast('Invalid credentials');
      }
    });
  }

  function showUser(name) {
    if (userDisplay) {
      userDisplay.innerHTML = `👤 Logged in as <strong>${name}</strong>`;
    }
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.createElement('div');
  modal.id = "project-modal";
  modal.innerHTML = '<div id="project-modal-content"><h3 id="modal-title"></h3><p id="modal-desc"></p><button onclick="document.getElementById(\'project-modal\').style.display=\'none\'">Close</button></div>';
  document.body.appendChild(modal);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-desc').textContent = desc + ' — More details about this project will be shown here.';
      modal.style.display = 'flex';
    });
  });
});
