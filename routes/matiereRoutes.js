const express = require('express');
const router = express.Router();
const Matiere = require('../models/matiere');

// Route pour créer une matière
router.post('/matieres', async (req, res) => {
    try {
        const matiere = await Matiere.create(req.body);
        res.status(201).json(matiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer toutes les matières
// router.get('/matieres', async (req, res) => {
//     try {
//         const matieres = await Matiere.findAll();
//         res.status(200).json(matieres);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

module.exports = router;
