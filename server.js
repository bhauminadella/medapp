const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse request URL
    const parsedUrl = url.parse(req.url, true);

    // Handle POST request to /saveData endpoint
    if (req.method === 'POST' && parsedUrl.pathname === '/saveData') {
        let body = '';
        req.on('data', (chunk) => {
            // Append incoming data to the body
            body += chunk.toString();
        });

        req.on('end', () => {
            // Parse body (assuming URL-encoded form data)
            const formData = new URLSearchParams(body);

            // Extract data from form fields
            const patientName = formData.get('patientName');
            const age = formData.get('age');
            const appointmentDate = formData.get('appointmentDate');

            // Construct data to write to text file
            const data = `Patient Name: ${patientName}\nAge: ${age}\nAppointment Date: ${appointmentDate}\n\n`;

            // Write data to text file
            fs.appendFile('data.txt', data, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    console.log('Data written to file successfully');
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Data saved successfully');
                }
            });
        });
    } else {
        // Handle other requests (e.g., serve HTML/CSS files)
        // You can use a file server module like 'fs' or 'serve-static' for this purpose
        // Example:
        // Serve static files from 'public' directory
        // const staticServer = require('serve-static')('public');
        // staticServer(req, res, () => {});
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
