const express = require('express');
const router = express.Router();
const { Class, Division } = require('../models');

// Route pour créer une classe avec plusieurs divisions
router.post('/classes', async (req, res) => {
    try {
        const { name, divisions } = req.body;

        // Vérification des données
        if (!name || !divisions || !Array.isArray(divisions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Créer la classe
        const newClass = await Class.create({ name });

        // Créer les divisions associées à la classe
        const createdDivisions = await Promise.all(
            divisions.map(division => Division.create({ name: division, ClassId: newClass.id }))
        );

        newClass.setDataValue('divisions', createdDivisions);

        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Route pour récupérer toutes les classes avec leurs divisions
router.get('/classes', async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: Division
        });
        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
