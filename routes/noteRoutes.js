const express = require('express');
const router = express.Router();
const { Note, Eleve, Matiere } = require('../models');

// Route pour créer une note
router.post('/notes', async (req, res) => {
    try {
        const { note, date_notation, EleveId, MatiereId } = req.body;

        const newNote = await Note.create({ note, date_notation, EleveId, MatiereId });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer toutes les notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.findAll({
            include: [
                { model: Eleve },
                { model: Matiere }
            ]
        });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
