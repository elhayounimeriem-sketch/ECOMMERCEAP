const express = require('express');
require('dotenv').config();
const { connectDB } = require('./config/db');
const cors = require('cors')
const productRouter = require('./root/ProductRoot');
const magasinRouter = require('./root/MagasinRoot');
const commandeRouter = require('./root/CommandeRoot');
const userRouter = require('./root/UserRoot');
const blogRouter = require('./root/BlogRoot');

const app = express();
const port = process.env.PORT || 4000;

// enable CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello Mimo!');
});

app.get('/api', (req, res) => {
  res.send('This is the api.');
});

app.use('/api/product', productRouter );
app.use('/api/magasin', magasinRouter );  
app.use('/api/commande', commandeRouter );
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter );

app.get('/product', (req, res) => {
  res.send('This is the product page.');
});

app.get('/payement', (req, res) => {
  res.send('This is the payement page.');
});

app.get('/User', (req, res) => {
  res.send('This is the User page.');
});

async function start() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();