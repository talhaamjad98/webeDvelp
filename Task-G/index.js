document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const timestamp = document.getElementById("timestamp");

  // set timestamp automatically
  function updateTimestamp() {
    timestamp.value = new Date().toLocaleString();
  }

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
  }

  function validateForm() {
    clearErrors();
    let valid = true;

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    // Full name: at least two words, each ≥2 letters
    if (!/^([A-Za-z]{2,}\s+[A-Za-z]{2,})$/.test(fullName)) {
      showError("nameError", "Enter your full name (first and last).");
      valid = false;
    }

    // Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError", "Invalid email format.");
      valid = false;
    }

    // Phone format +358
    if (!/^\+358\d{7,9}$/.test(phone)) {
      showError("phoneError", "Use +358 followed by 7–9 digits.");
      valid = false;
    }

    // Birth date not in future
    const today = new Date();
    const birth = new Date(birthDate);
    if (!birthDate) {
      showError("birthError", "Please select your birth date.");
      valid = false;
    } else if (birth > today) {
      showError("birthError", "Birth date cannot be in the future.");
      valid = false;
    }

    // Terms checked
    if (!terms) {
      showError("termsError", "You must accept the terms.");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload
    updateTimestamp();

    if (!validateForm()) return;

    // Collect data
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${timestamp.value}</td>
      <td>${document.getElementById("fullName").value}</td>
      <td>${document.getElementById("email").value}</td>
      <td>${document.getElementById("phone").value}</td>
      <td>${document.getElementById("birthDate").value}</td>
    `;

    tableBody.appendChild(newRow);
    form.reset();
    updateTimestamp(); // update again after reset
  });

  // initialize timestamp on load
  updateTimestamp();
});
