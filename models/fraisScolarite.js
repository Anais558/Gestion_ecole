const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Eleve = require('./eleve');

const FraisScolarite = sequelize.define('FraisScolarite', {
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date_facturation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    statut_paiement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    methode_paiement: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

FraisScolarite.belongsTo(Eleve, { foreignKey: 'EleveId', onDelete: 'CASCADE' });
Eleve.hasMany(FraisScolarite, { foreignKey: 'EleveId' });

module.exports = FraisScolarite;
