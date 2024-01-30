const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser'); // middleware

const dbConnection = require('./database.js');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
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
        response.status(500).send('Internal Server Error');
        return; 
      }

      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.email = email;
        response.redirect('/profile');
      } else {
        response.send('Incorrect Email and/or Password!');
        response.end(); 
      }
    });
  } else {
    response.send('Please enter Email and Password!');
    response.end(); 
  }
});


app.get('/profile', function (request, response) {
  if (request.session.loggedin) {
    const indexPath2 = path.join(__dirname, '..', '..', 'front', 'profile.html');
    response.sendFile(indexPath2);
  } else {
    response.send('Please login to view this page!');
  }
  response.end(); 
});

const port = 3000;

app.listen(port, () => console.log(`App Port ${port}`));
