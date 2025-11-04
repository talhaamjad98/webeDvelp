// Author: Talha Amjad
// Date: 2025-10-12

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const tableBody = document.querySelector("#dataTable tbody");

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const birthDate = document.getElementById("birthDate");
  const terms = document.getElementById("terms");
  const timestamp = document.getElementById("timestamp");

  
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const birthError = document.getElementById("birthError");
  const termsError = document.getElementById("termsError");

  
  function validateForm() {
    let valid = true;
    clearErrors();

    
    const nameParts = fullName.value.trim().split(" ");
    if (nameParts.length < 2 || nameParts.some(n => n.length < 2)) {
      nameError.textContent = "Please enter your full name (first and last).";
      valid = false;
    }

    
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    
    const phonePattern = /^\+358\d{6,9}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phoneError.textContent = "Phone must start with +358 and have 9–12 digits total.";
      valid = false;
    }

    
    const birth = new Date(birthDate.value);
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

    if (!birthDate.value) {
      birthError.textContent = "Please select your birth date.";
      valid = false;
    } else if (birth > today) {
      birthError.textContent = "Birth date cannot be in the future.";
      valid = false;
    } else if (birth > minAge) {
      birthError.textContent = "You must be at least 13 years old.";
      valid = false;
    }

    
    if (!terms.checked) {
      termsError.textContent = "You must accept the terms before submitting.";
      valid = false;
    }

    return valid;
  }

  function clearErrors() {
    [nameError, emailError, phoneError, birthError, termsError].forEach(err => err.textContent = "");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    timestamp.value = new Date().toLocaleString();

    if (!validateForm()) return;

    
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${timestamp.value}</td>
      <td>${fullName.value.trim()}</td>
      <td>${email.value.trim()}</td>
      <td>${phone.value.trim()}</td>
      <td>${birthDate.value}</td>
    `;
    tableBody.appendChild(newRow);

    form.reset();
    clearErrors();
  });
});
