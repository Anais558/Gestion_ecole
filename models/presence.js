const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Eleve = require('./eleve');

const Presence = sequelize.define('Presence', {
    date_presence: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    statut_presence: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    remarques: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Relation avec l'élève
Presence.belongsTo(Eleve);
Eleve.hasMany(Presence);

module.exports = Presence;
