// Local storage for username and email input fields in signup form
const form = document.querySelector("form");
const usernameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");

window.addEventListener("DOMContentLoaded", () => {
  const storedUsername = localStorage.getItem("name") || "";
  const storedEmail = localStorage.getItem("email") || "";

  if (storedUsername) {
    usernameInput.value = storedUsername;
  }

  if (storedEmail) {
    emailInput.value = storedEmail;
  }
});

form.addEventListener("input", () => {
  localStorage.setItem("name", usernameInput.value);
});

form.addEventListener("input", () => {
  localStorage.setItem("email", emailInput.value);
});

document.querySelector("form").addEventListener("submit", () => {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
});
