const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que c'est le bon chemin
const Class = require('./class');

const Division = sequelize.define('Division', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Division.belongsTo(Class);
Class.hasMany(Division);

module.exports = Division;
