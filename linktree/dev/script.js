document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const consent = document.getElementById("gdpr").checked;
  const message = document.getElementById("form-message");

  if (!consent) {
    message.textContent = "Please agree to the privacy policy.";
    message.style.color = "red";
    return;
  }

  // Prepare the data to send
  const data = {
    date: new Date().toISOString(),
    email: email,
    consent: consent
  };

  console.log(data)

  // Send the data to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbykiURy21_XBfx3-r7Muqx2yOIKul-mzfzKCzgy7SMsJ2bfTewnO8vdNNuBN7tApXbFrA/exec', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    message.textContent = "Thank you for subscribing!";
    message.style.color = "green";
    this.reset(); // Optionally reset the form
  })
  .catch((error) => {
    message.textContent = "An error occurred. Please try again later.";
    message.style.color = "red";
    console.error('Error:', error);
  });
});
