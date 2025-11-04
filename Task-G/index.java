document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const timestampInput = document.getElementById("timestamp");
  const tableBody = document.querySelector("#dataTable tbody");

  // Fill timestamp automatically
  function setTimestamp() {
    const now = new Date();
    timestampInput.value = now.toLocaleString();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    setTimestamp();
    clearErrors();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    // Full name validation
    if (!/^([A-Za-z]{2,}\s[A-Za-z]{2,})$/.test(fullName)) {
      showError("nameError", "Please enter your full name (first and last).");
      valid =
