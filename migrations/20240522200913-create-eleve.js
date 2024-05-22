'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('eleves', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date_naissance: {
                type: Sequelize.DATE,
                allowNull: false
            },
            genre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            adresse: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date_admission: {
                type: Sequelize.DATE,
                allowNull: false
            },
            photo_identite: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ParentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'parents',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            ClassId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'classes', // Assurez-vous que cette table existe
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('eleves');
    }
};
