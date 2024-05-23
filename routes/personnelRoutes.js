const express = require('express');
const router = express.Router();
const Personnel = require('../models/personnel');

// Route pour créer un personnel
router.post('/personnels', async (req, res) => {
    try {
        const personnel = await Personnel.create(req.body);
        res.status(201).json(personnel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les personnels
router.get('/personnels', async (req, res) => {
    try {
        const personnels = await Personnel.findAll();
        res.status(200).json(personnels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
