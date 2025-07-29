document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-mode');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});
const USERNAME = 'admin', PASSWORD = '1234';

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const u = loginForm.username.value.trim();
  const p = loginForm.password.value.trim();
  if (u === USERNAME && p === PASSWORD) {
    localStorage.setItem('loggedInUser', u);
    userDisplay.innerHTML = `Logged in as ${u}`;
  } else {
    alert('Invalid credentials');
  }
});
document.getElementById('donate-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (!email.includes('@') || amount <= 0) return alert("Invalid input");
  document.getElementById('donation-msg').style.display = 'block';
});
