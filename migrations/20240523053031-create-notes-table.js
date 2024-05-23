'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Notes', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            note: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            date_notation: {
                type: Sequelize.DATE,
                allowNull: false
            },
            EleveId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Eleves',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: false
            },
            MatiereId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Matieres',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Notes');
    }
};
