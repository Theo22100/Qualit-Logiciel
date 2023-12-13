import express from 'express';
import { query as _query } from '../back/src/database'; 
const app = express();

// Analyse form
app.use(express.urlencoded({ extended: true }));

// Gestion form
app.post('/connexion', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Email :', email);
    console.log('Mot de passe :', password);

    // Requête
    const query = 'SELECT email, password FROM user WHERE email = ? AND password = ?';
    const results = await _query(query, [email, password]);

    if (results.length > 0) {
      console.log('Utilisateur trouvé :', results[0]);
      res.redirect('/profil');
    } else {
      console.log('Utilisateur non trouvé');
      res.redirect('/index?error=auth');
    }
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête :', error);
    res.redirect('/index?error=db');
  }
});


