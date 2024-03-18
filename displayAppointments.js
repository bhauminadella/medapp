function displayAppointments() {
    // Fetch data from appointments.txt file
     console.log('hello bindu:');
    fetch('appointments.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.text();
        })
        .then(data => {
            // Log the fetched data to the console
            console.log('Fetched data:', data);

            // Check if the fetched data is empty
            if (!data.trim()) {
                throw new Error('No appointment data found');
            }

            // Split the data into appointment blocks
            const appointments = data.split('\n\n');

            // Create appointment table
            const table = document.createElement('table');
            const headerRow = table.insertRow();
            const headers = ['Patient Name', 'Age', 'Appointment Date'];
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });

            // Populate appointment data into table rows
            appointments.forEach(appointment => {
                const lines = appointment.trim().split('\n');
                const rowData = {};
                lines.forEach(line => {
                    const [key, value] = line.split(': ');
                    rowData[key.trim()] = value.trim();
                });
                const row = table.insertRow();
                headers.forEach(header => {
                    const cell = row.insertCell();
                    cell.textContent = rowData[header] || ''; // Handle undefined values
                });
            });

            // Append table to the appointmentDataContainer div
            const appointmentDataContainer = document.getElementById('appointmentDataContainer');
            appointmentDataContainer.innerHTML = ''; // Clear previous content
            appointmentDataContainer.appendChild(table);

            // Apply CSS to center the container
            appointmentDataContainer.style.display = 'flex';
            appointmentDataContainer.style.justifyContent = 'center';
            appointmentDataContainer.style.alignItems = 'center';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
