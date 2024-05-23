const express = require('express');
const router = express.Router();
const { Professeur, Matiere } = require('../models');

// Route pour créer un professeur
router.post('/professeurs', async (req, res) => {
    try {
        const professeur = await Professeur.create(req.body);
        res.status(201).json(professeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour associer des professeurs à une matière
router.post('/matieres/:matiereId/professeurs', async (req, res) => {
    try {
        const { matiereId } = req.params;
        const { professeurIds } = req.body;

        const matiere = await Matiere.findByPk(matiereId);
        if (!matiere) {
            return res.status(404).json({ message: 'Matiere not found' });
        }

        const professeurs = await Professeur.findAll({
            where: {
                id: professeurIds
            }
        });

        await matiere.addProfesseurs(professeurs);

        res.status(200).json(matiere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer toutes les matières avec leurs professeurs
router.get('/matieres', async (req, res) => {
    try {
        const matieres = await Matiere.findAll({
            include: {
                model: Professeur,
                through: {
                    attributes: [] // Pour ne pas inclure les champs de la table de jonction dans la réponse
                }
            }
        });
        res.status(200).json(matieres);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
