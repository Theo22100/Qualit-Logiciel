const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', '..', 'front', 'index.html');
  res.sendFile(indexPath);
});



app.post('/connexion', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);
  console.log(password);
  res.send(`Email: ${email} Password: ${password}`);
});

const port = 3000 

app.listen(port, () => console.log(`This app is listening on port ${port}`));