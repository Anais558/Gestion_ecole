const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Matiere = sequelize.define('Matiere', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Matiere;
