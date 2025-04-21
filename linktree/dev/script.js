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

  const date = new Date().toISOString();

  const url = `https://script.google.com/macros/s/AKfycbxg-mwFZe39aXdO4YWGmgfB4h5KUHcEtmytoBGFQEko3TfLGQ4c8WimP9lz0PgrmQGS/exec?email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}&consent=${consent}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        message.textContent = "Thank you for subscribing!";
        message.style.color = "green";
        this.reset();
      } else {
        message.textContent = "Something went wrong.";
        message.style.color = "red";
      }
    })
    .catch((error) => {
      message.textContent = "An error occurred. Please try again later.";
      message.style.color = "red";
      console.error('Error:', error);
    });
});
