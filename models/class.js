const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que c'est le bon chemin

const Class = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Class;
