const express = require('express');
const router = express.Router();
const Eleve = require('../models/eleve');

// Route pour créer un élève
router.post('/eleves', async (req, res) => {
    try {
        const eleve = await Eleve.create(req.body);
        res.status(201).json(eleve);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les élèves
router.get('/eleves', async (req, res) => {
    try {
        const eleves = await Eleve.findAll({
            include: [{ all: true }]
        });
        res.status(200).json(eleves);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
