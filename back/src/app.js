const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser'); // middleware

const dbConnection = require('./database.js');

app.use(session({
  secret: '?aqyDJx!qox3Kq3E?$3mYb@iKdLyTfrpoeFzg5eT',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
  const error = request.query.error === 'incorrect' ? 'Wrong Password or/and Wrong MailMot de passe incorrect/utilisateur incorrect' : '';
  const indexPath = path.join(__dirname, '..', '..', 'front', 'index.html');
  response.sendFile(indexPath);
  
});

app.get('/index', (request, response) => {
  const indexPath = path.join(__dirname, '..', '..', 'front', 'index.html');
  response.sendFile(indexPath);
});

app.post('/connexion', (request, response) => {
  let email = request.body.email;
  let password = request.body.password;

  if (email && password) {
    dbConnection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
      if (error) {
        console.error(error);
        const error500Path = path.join(__dirname, '..', '..', 'front', 'error500.html');
        response.status(500).sendFile(error500Path);
        return; 
      }

      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.email = email;
        response.redirect('/profile');
      } else {
        response.redirect('/index?error=incorrect');
      }
    });
  } else {
    response.send('Please enter Email and Password!');
    response.end(); 
  }
});


app.get('/profile', function (request, response) {
  if (request.session.loggedin) {
    const profilePath = path.join(__dirname,'..' ,'..', 'front', 'profile.html');
    response.sendFile(profilePath);
  } else {
    const erreur401Path = path.join(__dirname, '..', '..', 'front', 'error401.html');
    response.status(401).sendFile(erreur401Path);
  }
});

app.use((request, response) => {
  const erreur404Path = path.join(__dirname, '..', '..', 'front', 'error404.html');
  response.status(404).sendFile(erreur404Path);
});

const port = 3000;

app.listen(port, () => console.log(`App Port ${port}`));
