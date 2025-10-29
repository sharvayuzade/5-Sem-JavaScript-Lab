// ---------- Fetch API Example ----------
// Task 3: Simulate delay
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Simulate a 2-second delay to observe async loading
        setTimeout(() => {
            let table = document.getElementById('fetchTable');
            
            // Task 1: Add "Grade" header
            table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Marks</th><th>Grade</th></tr>";

            data.forEach(student => {
                // Task 2: Check for highlighting
                const rowClass = student.marks > 90 ? 'highlight' : '';
                
                // Task 1 & 2: Add grade cell and row class
                table.innerHTML += `<tr class="${rowClass}">
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.marks}</td>
                    <td>${student.grade}</td>
                </tr>`;
            });
        }, 2000); // 2000ms = 2 second delay
    })
    .catch(error => console.error('Fetch Error:', error));

// ---------- jQuery AJAX Example ----------
// This will load immediately, while the Fetch() one is delayed
$.getJSON('data.json', function(data) {
    let table = $('#jqueryTable');
    
    // Task 1: Add "Grade" header
    table.append("<tr><th>ID</th><th>Name</th><th>Marks</th><th>Grade</th></tr>");
    
    $.each(data, function(index, student) {
        // Task 2: Check for highlighting
        const rowClass = student.marks > 90 ? 'highlight' : '';

        // Task 1 & 2: Add grade cell and row class
        table.append(`<tr class="${rowClass}">
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
        </tr>`);
    });
}).fail(function() {
    console.log("Error loading JSON data with jQuery.");
});