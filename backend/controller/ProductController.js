const Product = require('../model/ProductModel');


function getAllProduct(req, res) {
     Product.find()
           .then(users => res.status(200).json({ success: true, data: users }))
           .catch(err => res.status(500).json({ success: false, error: err.message }));
    }


function getProductById(req, res) {
    console.log("getProductById called");
}

function createProduct(req, res) {
    try {
        const newProduct = new Product(req.body);
        newProduct.save()
            .then(product => res.status(201).json({ success: true, data: product }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


function updateProduct(req, res) {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, error: 'Missing product id' });

        // Prevent changing the document _id
        if (req.body._id) delete req.body._id;

        // Build update object from body
        const update = { ...req.body };

        Product.findByIdAndUpdate(id, update, { new: true })
            .then(updated => {
                if (!updated) return res.status(404).json({ success: false, error: 'Product not found' });
                return res.status(200).json({ success: true, data: updated });
            })
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
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
