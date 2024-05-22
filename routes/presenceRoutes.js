const express = require('express');
const router = express.Router();
const Presence = require('../models/presence');

// Route pour créer une présence
router.post('/presences', async (req, res) => {
    try {
        const presence = await Presence.create(req.body);
        res.status(201).json(presence);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer toutes les présences
router.get('/presences', async (req, res) => {
    try {
        const presences = await Presence.findAll({
            include: [{ all: true }]
        });
        res.status(200).json(presences);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
