// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to create a file
app.get('/create', async (req, res) => {
    try {
        await fs.writeFile('file.txt', 'Hello, this is a new file!');
        res.send(`<div class="read-container"><h2>File Created</h2><p>The file has been created successfully.</p><a href="/" class="back-link">Back</a></div>`);
    } catch (error) {
        res.status(500).send(`Error creating file: ${error.message}`);
    }
});

// Route to read a file
app.get('/read', async (req, res) => {
    try {
        const content = await fs.readFile('file.txt', 'utf-8');
        res.send(`<div class="read-container"><h2>File Content:</h2><p>${content}</p><a href="/" class="back-link">Back</a></div>`);
    } catch (error) {
        res.status(500).send(`Error reading file: ${error.message}`);
    }
});

// Route to append to a file
app.get('/append', async (req, res) => {
    try {
        await fs.appendFile('file.txt', '\nAdditional content appended!');
        const content = await fs.readFile('file.txt', 'utf-8');
        res.send(`<div class="read-container"><h2>File Appended</h2><p>${content}</p><a href="/" class="back-link">Back</a></div>`);
    } catch (error) {
        res.status(500).send(`Error appending to file: ${error.message}`);
    }
});

// Route to delete a file
app.get('/delete', async (req, res) => {
    try {
        await fs.unlink('file.txt');
        res.send(`<div class="read-container"><h2>File Deleted</h2><p>The file has been deleted successfully.</p><a href="/" class="back-link">Back</a></div>`);
    } catch (error) {
        res.status(500).send(`Error deleting file: ${error.message}`);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
