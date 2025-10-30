/*
 * Practical 10 - Final Task B2
 * Name: Sharvayu Zade
 * PRN: 23070521135
 * Sec: B(B2)
 */

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // Global variable to store the master list of employees
    let employeesData = [];

    const fetchContainer = document.getElementById('fetch-table-container');
    const jqueryContainer = document.getElementById('jquery-table-container');
    const deptFilter = document.getElementById('dept-filter');

    /**
     * Dynamically creates and displays an HTML table from the employee data.
     * @param {Array} data - The array of employee objects.
     * @param {string} containerId - The ID of the container element to insert the table into.
     */
    function displayTable(data, containerId) {
        const container = document.getElementById(containerId);
        // Clear previous content
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = '<p>No employees found matching the criteria.</p>';
            return;
        }

        const table = document.createElement('table');
        const thead = table.createTHead();
        const tbody = table.createTBody();
        const headerRow = thead.insertRow();

        // Create table headers
        const headers = ['ID', 'Name', 'Department', 'Salary'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        // Create table rows
        data.forEach(employee => {
            const row = tbody.insertRow();
            
            // Highlight row if salary > 50000
            if (employee.salary > 50000) {
                row.classList.add('highlight-salary');
            }

            row.insertCell().textContent = employee.id;
            row.insertCell().textContent = employee.name;
            row.insertCell().textContent = employee.department;
            row.insertCell().textContent = employee.salary;
        });

        container.appendChild(table);
    }

    /**
     * Populates the department filter dropdown with unique departments from the data.
     * @param {Array} data - The array of employee objects.
     */
    function populateDepartmentFilter(data) {
        // Get unique department names
        const departments = data.map(emp => emp.department);
        const uniqueDepartments = [...new Set(departments)];

        // Add the 'All' option first
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Departments';
        deptFilter.appendChild(allOption);

        // Add an option for each unique department
        uniqueDepartments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            deptFilter.appendChild(option);
        });
    }

    /**
     * Self-written function to filter and re-display the employee data.
     * @param {string} department - The selected department ("all" or a specific dept).
     */
    function filterEmployees(department) {
        let filteredData;

        if (department === 'all') {
            filteredData = employeesData; // Use the original master list
        } else {
            // Filter from the original master list
            filteredData = employeesData.filter(emp => emp.department === department);
        }

        // Re-display both tables with the filtered data
        displayTable(filteredData, 'fetch-table-container');
        displayTable(filteredData, 'jquery-table-container');
    }

    // --- Method 1: Load data using the Fetch API ---
    function loadWithFetch() {
        fetch('employees.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data loaded with Fetch:');
                console.table(data); // Debugging as requested

                employeesData = data; // Store data in the global variable

                // Initial display
                displayTable(employeesData, 'fetch-table-container');
                // Populate the filter dropdown (only need to do this once)
                populateDepartmentFilter(employeesData);
            })
            .catch(error => {
                console.error('Error loading data with Fetch:', error);
                fetchContainer.innerHTML = '<p>Error loading data. Please check the console.</p>';
            });
    }

    // --- Method 2: Load data using jQuery $.getJSON ---
    function loadWithJQuery() {
        $.getJSON('employees.json', data => {
            console.log('Data loaded with jQuery:');
            console.table(data); // Debugging as requested

            // Display data in the second table
            displayTable(data, 'jquery-table-container');
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error('Error loading data with jQuery:', textStatus, errorThrown);
            jqueryContainer.innerHTML = '<p>Error loading data. Please check the console.</p>';
        });
    }

    // --- Event Listeners ---
    // Add change event listener to the filter dropdown
    deptFilter.addEventListener('change', (event) => {
        const selectedDept = event.target.value;
        filterEmployees(selectedDept);
    });

    // --- Initial Page Load ---
    // Call both functions to load and display the data
    loadWithFetch();
    loadWithJQuery();

});