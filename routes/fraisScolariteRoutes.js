const express = require('express');
const router = express.Router();
const { FraisScolarite, Eleve } = require('../models');

// Route pour créer un frais de scolarité
router.post('/frais_scolarite', async (req, res) => {
    try {
        const { montant, date_facturation, statut_paiement, methode_paiement, EleveId } = req.body;

        const newFraisScolarite = await FraisScolarite.create({
            montant,
            date_facturation,
            statut_paiement,
            methode_paiement,
            EleveId
        });

        res.status(201).json(newFraisScolarite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route pour récupérer tous les frais de scolarité
router.get('/frais_scolarite', async (req, res) => {
    try {
        const fraisScolarite = await FraisScolarite.findAll({
            include: Eleve
        });
        res.status(200).json(fraisScolarite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
