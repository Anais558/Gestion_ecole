const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');
const Class = require('./class');
const Division = require('./division');
const Eleve = require('./eleve');
const Parents = require('./parent');
const Note = require('./note');
const Matiere = require('./matiere');
const Professeur = require('./professeur');
const FraisScolarite = require('./fraisScolarite');


const MatiereProfesseur = sequelize.define('MatiereProfesseur', {});

// Définir les relations
Matiere.belongsToMany(Professeur, { through: MatiereProfesseur });
Professeur.belongsToMany(Matiere, { through: MatiereProfesseur });

const initDb = async () => {
    await sequelize.authenticate(); // Vérifiez la connexion à la base de données
    console.log('Database connected...');

    // Synchronisez les modèles avec la base de données
    await sequelize.sync(); // Utilisez `force: true` uniquement en développement pour recréer les tables

    // Créer des rôles par défaut si nécessaire
    await Role.findOrCreate({ where: { name: 'user' } });
    await Role.findOrCreate({ where: { name: 'admin' } });
};

module.exports = { initDb, User, Role, Class, Division, Note, Eleve, Parents, FraisScolarite, Matiere, Professeur, MatiereProfesseur };
