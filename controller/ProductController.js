const Product = require('../model/ProductModel');


function getAllProduct(req, res) {
    console.log("getAllProducts called");
}

function getProductById(req, res) {
    console.log("getProductById called");
}

function createProduct(req, res) {
    console.log("createProduct called");
}

function updateProduct(req, res) {
    console.log("updateProduct called");
}

function deleteProduct(req, res) {
    console.log("deleteProduct called");
}

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
