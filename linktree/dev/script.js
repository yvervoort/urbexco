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

  const formData = new URLSearchParams();
  formData.append("date", new Date().toISOString());
  formData.append("email", email);
  formData.append("consent", consent); // stays as string

  fetch('https://script.google.com/macros/s/AKfycbxwDL_0j97EYy2UVthrffsjYnzqcyOLdLKWub3K4VG330EIgef_m-kkTlUu9Yb1ho9R/exec', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })
  .then(response => response.json())
  .then(data => {
    message.textContent = "Thank you for subscribing!";
    message.style.color = "green";
    this.reset();
  })
  .catch((error) => {
    message.textContent = "An error occurred. Please try again later.";
    message.style.color = "red";
    console.error('Error:', error);
  });
});
