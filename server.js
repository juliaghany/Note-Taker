const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const uniqid = require('uniqid');
const express = require('express');
const app = express();
const PORT = 3001;

// middleware 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML routes

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API routes

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    // res.json(`${req.method} request received`);
    // console.log(`${req.method} request received`);
    return res.json(notes);
});

// used activity 21 and 22
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uniqid(),
        };

        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);

        fs.writeFile('./db/db.json',
            JSON.stringify(parsedNotes), (writeErr) =>
            writeErr
                ? console.error(writeErr)
                : console.info('Successfully added new note')
        );
    }
});

app.listen(PORT, () =>
    console.info(`Server is running on PORT ${PORT}`)
);

