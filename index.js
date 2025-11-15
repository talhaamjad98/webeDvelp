// Author: Talha Amjad
// Date: 2025-11-09
// Task H — Form validation with Tailwind CSS

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("dataTable");
  const timestamp = document.getElementById("timestamp");

  function updateTimestamp() {
    timestamp.value = new Date().toLocaleString();
  }

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    ["nameError", "emailError", "phoneError", "birthError", "termsError"].forEach(id => {
      document.getElementById(id).textContent = "";
    });
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

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateTimestamp();

    if (!validateForm()) return;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="border border-slate-300 px-2 py-1">${timestamp.value}</td>
      <td class="border border-slate-300 px-2 py-1">${document.getElementById("fullName").value}</td>
      <td class="border border-slate-300 px-2 py-1">${document.getElementById("email").value}</td>
      <td class="border border-slate-300 px-2 py-1">${document.getElementById("phone").value}</td>
      <td class="border border-slate-300 px-2 py-1">${document.getElementById("birthDate").value}</td>
    `;

    tableBody.appendChild(newRow);
    form.reset();
    updateTimestamp();
  });

  updateTimestamp();
});
