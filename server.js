// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;


const db = new sqlite3.Database('data.db');

// Creating  a table to store job locations and completion status if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT, completed BOOLEAN DEFAULT 0)");
});

// Handling POST request to add a job location
app.post('/add-location', (req, res) => {
    const { location } = req.body;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    db.run('INSERT INTO jobs (location) VALUES (?)', [location], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, location: location });
    });
});

// Handling the GET request to fetch all job locations
app.get('/jobs', (req, res) => {
    db.all('SELECT * FROM jobs', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
