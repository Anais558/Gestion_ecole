module.exports = {
    development: {
      username: 'root', // Remplacez par votre nom d'utilisateur MySQL
      password: '', // Remplacez par votre mot de passe MySQL
      database: 'gestion_ecole', // Remplacez par le nom de votre base de données
      host: '127.0.0.1',
      dialect: 'mysql'
    },
    test: {
      username: 'root',
      password: '',
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql'
    },
    production: {
      username: 'root',
      password: '',
      database: 'database_production',
      host: '127.0.0.1',
      dialect: 'mysql'
    }
  };
  