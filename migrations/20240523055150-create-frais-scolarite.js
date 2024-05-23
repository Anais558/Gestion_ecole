'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FraisScolarite', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      montant: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date_facturation: {
        type: Sequelize.DATE,
        allowNull: false
      },
      statut_paiement: {
        type: Sequelize.STRING,
        allowNull: false
      },
      methode_paiement: {
        type: Sequelize.STRING,
        allowNull: false
      },
      EleveId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Eleves', // Assurez-vous que ce nom correspond au nom de la table des élèves
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FraisScolarite');
  }
};
