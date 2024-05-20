const sequelize = require('../config/config');
const User = require('./user');
const Role = require('./role');

const initDb = async () => {
    await sequelize.sync({ force: true });
    // Optionally create default roles
    await Role.create({ name: 'user' });
    await Role.create({ name: 'admin' });
};

module.exports = { initDb, User, Role };
