const express = require('express');
const router = express.Router();
const Inscription = require('../models/inscription');

// Route pour créer une inscription
router.post('/inscriptions', async (req, res) => {
    try {
        const inscription = await Inscription.create(req.body);
        res.status(201).json(inscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer toutes les inscriptions
router.get('/inscriptions', async (req, res) => {
    try {
        const inscriptions = await Inscription.findAll({
            include: [{ all: true }]
        });
        res.status(200).json(inscriptions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
