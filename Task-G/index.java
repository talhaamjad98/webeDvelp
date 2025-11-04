/**
 * Author: Talha Amjad
 * Date: 2025-10-12
 */

// index.js — robust version with debug logs
document.addEventListener("DOMContentLoaded", () => {
  // Find the form with multiple fallback options
  const form =
    document.getElementById("registrationForm") ||
    document.getElementById("addCourseForm") || // fallback in case starter ID was kept
    document.querySelector("form");

  if (!form) {
    console.error("No <form> element found on the page. Check form id or presence of form.");
    return;
  }
  console.log("Form found:", form.id || "(no id)");

  const timestampInput = document.getElementById("timestamp");
  const tableBody = document.querySelector("#dataTable tbody") || document.querySelector("#timetable tbody");

  if (!tableBody) {
    console.error("Table <tbody> not found. Ensure your table has id='dataTable' (or id='timetable' in starter).");
    return;
  }

  // Utility: show and clear errors
  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }
  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  }

  // Ensure timestamp input exists; create if missing (so row contains timestamp)
  function ensureTimestampInput() {
    if (!timestampInput) {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.id = "timestamp";
      hidden.name = "timestamp";
      form.prepend(hidden);
      return hidden;
    }
    return timestampInput;
  }

  // Set timestamp value to human readable and ISO fallback
  function setTimestamp(tsInput) {
    const now = new Date();
    tsInput.value = `${now.toLocaleString()} (${now.toISOString()})`;
  }

  // Attach reset handler to clear errors when user clicks Clear
  form.addEventListener("reset", () => {
    setTimeout(clearErrors, 0);
  });

  // Main submit handler
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    clearErrors();

    // Re-fetch input values (works regardless of HTML ordering/IDs)
    const tsInput = ensureTimestampInput();
    setTimestamp(tsInput);

    const fullNameEl = document.getElementById("fullName") || form.querySelector("[name='fullName']");
    const emailEl = document.getElementById("email") || form.querySelector("[name='email']");
    const phoneEl = document.getElementById("phone") || form.querySelector("[name='phone']");
    const birthEl = document.getElementById("birthDate") || form.querySelector("[name='birthDate']");
    const termsEl = document.getElementById("terms") || form.querySelector("[name='terms']");

    const fullName = fullNameEl?.value?.trim() || "";
    const email = emailEl?.value?.trim() || "";
    const phone = phoneEl?.value?.trim() || "";
    const birthDate = birthEl?.value || "";
    const terms = !!(termsEl && termsEl.checked);

    let valid = true;

    // Full name: at least 2 words, each >=2 letters
    if (!/^[A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{2,})+$/u.test(fullName)) {
      showError("nameError", "Please enter your full name (first and last name, each ≥ 2 letters).");
      valid = false;
    }

    // Email basic format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError", "Please enter a valid email address (example: name@example.com).");
      valid = false;
    }

    // Phone: expect +358 followed by 7–9 digits (adjust if you want)
    if (!/^\+358\d{7,9}$/.test(phone)) {
      showError("phoneError", "Phone must start with +358 followed by 7–9 digits (e.g. +358401234567).");
      valid = false;
    }

    // Birth date: present and not in future
    if (!birthDate) {
      showError("birthError", "Please choose your birth date.");
      valid = false;
    } else {
      const b = new Date(birthDate);
      const now = new Date();
      if (isNaN(b.getTime())) {
        showError("birthError", "Invalid birth date format.");
        valid = false;
      } else if (b > now) {
        showError("birthError", "Birth date cannot be in the future.");
        valid = false;
      }
    }

    // Terms checkbox
    if (!terms) {
      showError("termsError", "You must accept the terms to submit.");
      valid = false;
    }

    if (!valid) {
      console.warn("Validation failed; not adding row.");
      return;
    }

    // Build row cell values (escape minimal HTML to avoid basic injection)
    function escapeHtml(s) {
      return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(tsInput.value)}</td>
      <td>${escapeHtml(fullName)}</td>
      <td>${escapeHtml(email)}</td>
      <td>${escapeHtml(phone)}</td>
      <td>${escapeHtml(birthDate)}</td>
    `;
    tableBody.appendChild(tr);

    console.log("Row appended:", { fullName, email, phone, birthDate });
    // Reset form but keep timestamp updated
    form.reset();
    setTimestamp(tsInput);
  });

  // initialize timestamp at load
  const tsInputInit = ensureTimestampInput();
  setTimestamp(tsInputInit);
  console.log("Initialization complete.");
});
