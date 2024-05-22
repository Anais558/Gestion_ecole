const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Parent = require('./parent');
const Class = require('./class');

const Eleve = sequelize.define('Eleve', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_naissance: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_admission: {
        type: DataTypes.DATE,
        allowNull: false
    },
    photo_identite: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Relations
Eleve.belongsTo(Parent);
Eleve.belongsTo(Class);

module.exports = Eleve;
