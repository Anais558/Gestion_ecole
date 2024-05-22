const { User } = require('../models');
const bcrypt = require('bcrypt');

// Contrôleur pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'roleId'] // Sélectionnez les champs que vous voulez retourner
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour mettre à jour un utilisateur
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, RoleId } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mettre à jour les champs spécifiés
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (RoleId) user.RoleId = RoleId;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllUsers, updateUser };
