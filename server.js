const fs = require('fs');
const path = require('path');

const notes = require('./db/db.json');
const PORT = 3001;

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(PORT, () =>
    console.info(``)
);
