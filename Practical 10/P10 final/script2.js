// Function to create and display employee table dynamically
function displayEmployees(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear existing content

  const table = document.createElement("table");
  table.border = "1";
  table.style.width = "80%";
  table.style.margin = "10px auto";
  table.style.borderCollapse = "collapse";

  // Create header row
  const header = table.insertRow();
  ["ID", "Name", "Department", "Salary"].forEach(text => {
    let th = document.createElement("th");
    th.innerText = text;
    th.style.padding = "8px";
    th.style.background = "#e0e0e0";
    header.appendChild(th);
  });

  // Fill table rows dynamically
  data.forEach(emp => {
    let row = table.insertRow();
    if (emp.salary > 50000) row.style.background = "#c9f7c4"; // Highlight high salary
    Object.values(emp).forEach(value => {
      let cell = row.insertCell();
      cell.innerText = value;
      cell.style.padding = "6px";
    });
  });

  container.appendChild(table);
}

// Function to extract unique departments and populate dropdown
function populateDepartments(data) {
  const select = document.getElementById("deptFilter");
  const departments = [...new Set(data.map(emp => emp.department))]; // Unique departments
  departments.forEach(dep => {
    const opt = document.createElement("option");
    opt.value = dep;
    opt.textContent = dep;
    select.appendChild(opt);
  });
}

// Filter employees by department (self-written function)
function filterByDepartment(data, department) {
  if (department === "all") return data;
  return data.filter(emp => emp.department === department);
}

// --- Load JSON via Fetch API ---
fetch("employees.json")
  .then(response => response.json())
  .then(data => {
    console.table(data); // For debugging
    populateDepartments(data);
    displayEmployees(data, "fetchTable");

    // Add filter logic
    document.getElementById("deptFilter").addEventListener("change", e => {
      const filtered = filterByDepartment(data, e.target.value);
      displayEmployees(filtered, "fetchTable");
    });
  })
  .catch(error => console.error("Fetch Error:", error));

// --- Load JSON via jQuery $.getJSON() ---
$.getJSON("employees.json", function(data) {
  console.table(data); // For debugging
  displayEmployees(data, "jqueryTable");
});
