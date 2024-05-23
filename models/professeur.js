const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professeur = sequelize.define('Professeur', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
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
    }
});

module.exports = Professeur;
