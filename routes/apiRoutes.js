const fb = require('express').Router();
const fs = require('fs/promises');
const uniqid = require('uniqid');

async function readData() {
    var data = await fs.readFile("./db/db.json", "utf-8")
    return JSON.parse(data)
}

fb.get('/notes', async (req, res) => {
    res.json(await readData())
});

fb.post('/notes', async (req, res) => {
    const { title, text } = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        var notes = await readData()
        notes.push(newNote)
        await fs.writeFile("./db/db.json", JSON.stringify(notes))
        res.json({ message: "Wrote your note!" })
    }
    else {
        res.status(400).json({ message: "note not taken" })
    }
});

fb.delete('/notes/:id', async (req, res) => {
    var currentNotes = await readData()
    var newNotes = currentNotes.filter(notes => notes.id != req.params.id)
    console.log(newNotes)
    await fs.writeFile("./db/db.json", JSON.stringify(newNotes))
    res.status(200).json({ message: "notes successfully deleted" })
});


module.exports = fb;
