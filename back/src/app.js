import express from 'express';
import { query as _query } from '../back/database';

const app = express();

// Analyse form
app.use(express.urlencoded({ extended: true }));

// Récupération form
app.post('/connexion', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('Email soumis :', email);
  console.log('Mot de passe soumis :', password);

  // Requête 
  const query = 'SELECT email, password FROM user WHERE email = ? AND password = ?';
  _query(query, [email, password], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      res.redirect('/index?error=db');
    } else {
      if (results.length > 0) {
        console.log('Utilisateur trouvé :', results[0]);
        res.redirect('/profil');
      } else {
        console.log('Utilisateur non trouvé');
        res.redirect('/index?error=auth');
      }
    }
  });
});
