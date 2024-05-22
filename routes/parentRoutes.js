const express = require('express');
const router = express.Router();
const Parent = require('../models/parent');

// Route pour créer un parent
router.post('/parents', async (req, res) => {
    try {
        const parent = await Parent.create(req.body);
        res.status(201).json(parent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/parents', async (req, res) => {
    try {
        const parents = await Parent.findAll({
            include: [{ all: true }]
        });
        res.status(200).json(parents);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
