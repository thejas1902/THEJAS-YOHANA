const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');

const app = express();
app.use(bodyParser.json());

// Path to store the Excel file
const filePath = './responses.xlsx';

// Create Excel file if it doesn't exist
if (!fs.existsSync(filePath)) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Responses');
    xlsx.writeFile(workbook, filePath);
}

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    // Read the current data from Excel file
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets['Responses'];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Add the new response to the data
    data.push({ Name: name, Email: email, Message: message });

    // Write the updated data back to the Excel file
    const updatedWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets['Responses'] = updatedWorksheet;
    xlsx.writeFile(workbook, filePath);

    res.status(200).send('Response saved');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
