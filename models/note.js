const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct
const Eleve = require('./eleve');
const Matiere = require('./matiere');

const Note = sequelize.define('Note', {
    note: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date_notation: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

// Définir les associations
Note.belongsTo(Eleve, { foreignKey: 'EleveId', onDelete: 'CASCADE' });
Note.belongsTo(Matiere, { foreignKey: 'MatiereId', onDelete: 'CASCADE' });
Eleve.hasMany(Note, { foreignKey: 'EleveId' });
Matiere.hasMany(Note, { foreignKey: 'MatiereId' });

module.exports = Note;
