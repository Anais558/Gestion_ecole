const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route pour récupérer tous les utilisateurs, accessible uniquement par les administrateurs
router.get('/users', authenticate, authorize(['admin']), getAllUsers);

// Route pour mettre à jour un utilisateur, accessible uniquement par les administrateurs
router.put('/users/:id', authenticate, authorize(['admin']), updateUser);

module.exports = router;
