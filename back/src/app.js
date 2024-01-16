const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', '..', 'front', 'index.html');
  res.sendFile(indexPath);
});



app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

const port = 3000 

app.listen(port, () => console.log(`This app is listening on port ${port}`));
