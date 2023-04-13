// import requied modules

const path = require('path');
const fb = require('express').Router();

// GET route that returns the notes.html file

fb.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET route that returns the index.html file

fb.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// exports fb

module.exports = fb;