  const express = require('express');
  

  const app = express();
  const port = 3000;


app.get('/', (req, res) => {
res.send('Hello Mimo!');
});

app.get('/api', (req, res) => {
res.send('This is the api.');
});

app.get('/product', (req, res) => {
res.send('This is the product page.');
});

app.get('/payement', (req, res) => {
res.send('This is the payement page.');
});

app.get('/User', (req, res) => { 
res.send('This is the User page.');
});


app.listen(port, () => {
console.log(`Server is runing on port 3000`);
});