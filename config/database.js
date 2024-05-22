const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('gestion_ecole', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;