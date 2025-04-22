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

  const url = `https://script.google.com/macros/s/AKfycbylnzddDUDQqJSm2XGLggvu4Nh00nBKJXAexOZpE159G5IBcDULRD3i3gNx1f04RJf2Hg/exec?email=${encodeURIComponent(email)}&date=${encodeURIComponent(date)}&consent=${consent}`;

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

// Modal elements
const modal = document.getElementById("auth-modal");
const joinBtn = document.getElementById("join-button");
const closeBtn = document.querySelector(".modal .close");
const card = document.getElementById("card");

// Open modal
joinBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Click outside closes modal
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Flip to register
document.getElementById("to-register").addEventListener("click", (e) => {
  e.preventDefault();
  card.classList.add("flipped");
});

// Flip back to login
document.getElementById("to-login").addEventListener("click", (e) => {
  e.preventDefault();
  card.classList.remove("flipped");
});