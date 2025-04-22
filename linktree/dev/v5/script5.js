const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = window.firebase;

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

// Register
document.getElementById("register-button").addEventListener("click", () => {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;
  const msg = document.getElementById("register-message");

  if (password !== confirm) {
    msg.textContent = "Passwords do not match.";
    msg.style.color = "red";
    return;
  }

  createUserWithEmailAndPassword(email, password)
    .then(() => {
      msg.textContent = "Registration successful!";
      msg.style.color = "green";

      // Reset fields
      document.getElementById("register-email").value = "";
      document.getElementById("register-password").value = "";
      document.getElementById("register-confirm").value = "";

      // Flip back to login after a second
      setTimeout(() => {
        card.classList.remove("flipped");
      }, 1000);
    })
    .catch((error) => {
      msg.textContent = error.message;
      msg.style.color = "red";
    });
});

// Login
document.getElementById("login-button").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const msg = document.getElementById("login-message");

  signInWithEmailAndPassword(email, password)
    .then(() => {
      msg.textContent = "Login successful!";
      msg.style.color = "green";
      modal.style.display = "none";

      // Clear form fields
      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
    })
    .catch((error) => {
      msg.textContent = error.message;
      msg.style.color = "red";
    });
});

// Track auth state
onAuthStateChanged((user) => {
  const logoutBtn = document.getElementById("logout-button");

  if (user) {
    joinBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    joinBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});

document.getElementById("logout-button").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
});
