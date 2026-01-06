const express = require('express');
const router = express.Router();
const controller = require('../controller/ProductController'); 

router.get('/', controller.getAllProduct);
router.get('/:id', controller.getProductById);
router.post('/creerproduit', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
