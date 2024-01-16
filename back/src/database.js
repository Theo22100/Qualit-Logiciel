const mysql = require('mysql');

//connexion BDD
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'qualite'
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    throw err;
  }
  console.log('Connecté à la base de données MySQL.');

});

// Exporte connexion
module.exports = dbConnection;
