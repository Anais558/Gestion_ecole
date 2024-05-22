const { User, Role } = require('../models');
const bcrypt = require('bcrypt');

const createAdminUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Assurez-vous que le rôle admin existe et récupérez son ID
        const adminRole = await Role.findOne({ where: { name: 'admin' } });
        if (!adminRole) {
            return res.status(400).json({ message: 'Role admin not found' });
        }

        const adminUser = await User.create({
            email,
            password: hashedPassword,
            roleId: adminRole.id // Utilisez l'ID du rôle admin trouvé
        });

        res.status(201).json(adminUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createAdminUser };
