const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Class = require('./class');

const Inscription = sequelize.define('Inscription', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    documents: {
        type: DataTypes.TEXT, // Use TEXT to store large document information, consider using JSON if structured
        allowNull: false
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_inscription: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

// Relation avec la classe
Inscription.belongsTo(Class);

module.exports = Inscription;
