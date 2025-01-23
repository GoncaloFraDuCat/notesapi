// This should already be there by default in Rails
//= require jquery
//= require rails-ujs
//= require_tree .


import 'stylesheets/application';  // for CSS
import './login-form'; // Import the script with the login form functionality

// Get the form element
  const loginForm = document.getElementById('login-form');

  // Add an event listener to handle form submission
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Create the payload for the request
    const payload = {
      username: username,
      password: password
    };

    try {
      // Send a POST request to the /login endpoint
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send form data as JSON
      });

      const result = await response.json();

      // Check if the login was successful
      if (response.ok) {
        // If successful, store the token (in localStorage, sessionStorage, or cookies)
        localStorage.setItem('token', result.token);

        // Optionally redirect the user to a different page or show success message
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect to another page, for example
      } else {
        // If login fails, show an error message
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      // If there is a network error, handle it
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  });