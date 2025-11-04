const mongoose = require('mongoose');

const magasinSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    horaires: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the 'updatedAt' field before saving
magasinSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Magasin = mongoose.model('Magasin', magasinSchema);

module.exports = Magasin;