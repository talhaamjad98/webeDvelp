/**
 * Author: Talha Amjad
 * Date: 2025-10-12
 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const timestamp = document.getElementById("timestamp");
 
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
 
    if (!/^([A-Za-z]{2,}\s+[A-Za-z]{2,})$/.test(fullName)) {
      showError("nameError", "Enter your full name (first and last).");
      valid = false;
    }
 
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError", "Invalid email format.");
      valid = false;
    }

    
    if (!/^\+358\d{7,9}$/.test(phone)) {
      showError("phoneError", "Use +358 followed by 7–9 digits.");
      valid = false;
    }
 
    const today = new Date();
    const birth = new Date(birthDate);
    if (!birthDate) {
      showError("birthError", "Please select your birth date.");
      valid = false;
    } else if (birth > today) {
      showError("birthError", "Birth date cannot be in the future.");
      valid = false;
    }

   
    if (!terms) {
      showError("termsError", "You must accept the terms.");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 
    updateTimestamp();

    if (!validateForm()) return;
 
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
    updateTimestamp();
  });

\
  updateTimestamp();
});
