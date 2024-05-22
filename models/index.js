const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');
const Class = require('./class');
const Division = require('./division');
const Eleve = require('./eleve');
const Parents = require('./parent');

const initDb = async () => {
    await sequelize.authenticate(); // Vérifiez la connexion à la base de données
    console.log('Database connected...');

    // Synchronisez les modèles avec la base de données
    await sequelize.sync(); // Utilisez `force: true` uniquement en développement pour recréer les tables

    // Créer des rôles par défaut si nécessaire
    await Role.findOrCreate({ where: { name: 'user' } });
    await Role.findOrCreate({ where: { name: 'admin' } });
};

module.exports = { initDb, User, Role, Class, Division, Eleve, Parents };
