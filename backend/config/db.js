const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

async function connectDB() {
  try {
    if (!mongoUri) {
      throw new Error('❌ MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      tlsAllowInvalidCertificates: true, // Temporairement pour déboguer
    });

    console.log('✅ Base de données MongoDB connectée avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
