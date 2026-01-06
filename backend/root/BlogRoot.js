const express = require('express');
const router = express.Router();
const controller = require('../controller/BlogController'); 

router.get('/', controller.getAllBlog);
router.get('/:id', controller.getBlogById);
router.post('/', controller.createBlog);
router.put('/:id', controller.updateBlog);
router.delete('/:id', controller.deleteBlog);

module.exports = router;
