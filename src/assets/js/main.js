

// Import Bootstrap JS
import * as bootstrap from 'bootstrap';
import './custom.js';


// Import SCSS
import '../scss/style.scss';

// Fetch data from the backend API
fetch('http://localhost:3001/products')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        window.location.href = 'signin.html';
      }

    } catch (err) {
      console.error(err);
      alert('Server error ❌');
    }
  });
}

if (window.location.pathname.includes('signin.html')) {
  const form = document.getElementById('loginForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert('Login sukses 🚀');

          localStorage.setItem('user', JSON.stringify(data.user));

          window.location.href = 'index.html';
        } else {
          alert('❌ ' + data.message);
        }

      } catch (err) {
        console.error(err);
        alert('Server error ❌');
      }
    });
  }
}