/**
 * Author: Talha Amjad
 * Date: 2025-10-12
 */
document.getElementById("addCourseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const courseName = document.getElementById("courseName").value;
  const days = Array.from(document.querySelectorAll("input[name='day']:checked")).map(input => input.value);

  const row = document.createElement("tr");

  const courseCell = document.createElement("td");
  courseCell.textContent = courseName;
  row.appendChild(courseCell);

  ["Tue", "Thu", "Fri"].forEach(day => {
    const cell = document.createElement("td");
    cell.textContent = days.includes(day) ? "✅" : "❌";
    row.appendChild(cell);
  });

  document.querySelector("#timetable tbody").appendChild(row);
  this.reset();
});
