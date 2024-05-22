const { DataTypes } = require('sequelize')
const sequelize = require('../config/database');
const Parent = sequelize.define(
  'Parent',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true // Ajoute les champs createdAt et updatedAt automatiquement
  }
)

module.exports = Parent
