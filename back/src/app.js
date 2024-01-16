const express = require('express'); 
const app = express(); 
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser'); // middleware


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'qualite'
});


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
  console.log(email);
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified email and password
    connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
      // Error
      if (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
        return;
      }
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.email = email;
        // Redirect to home page
        response.redirect('/profile');
      } else {
        response.send('Incorrect Email and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Email and Password!');
    response.end();
  }
});

app.get('/profile', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Bienvenue, ' + request.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

const port = 3000 

app.listen(port, () => console.log(`This app is listening on port ${port}`));
