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

  // Simulated success (replace with real endpoint like Mailchimp or Google Apps Script)
  console.log("Subscribed email:", email);
  message.textContent = "Thank you for subscribing!";
  message.style.color = "green";

  // Optionally reset the form
  this.reset();
});
