const mongoose = require('mongoose');

const productSchema = new mongose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    inStock: {type: Boolean, default: true}
});

const Product = mongose.model('Product', productSchema);

module.exports = Product;