const express = require('express');
const router = express.Router();
const controller = require('../controller/MagasinController'); 

router.get('/', controller.getAllMagasin);
router.get('/:id', controller.getMagasinById);
router.post('/', controller.createMagasin);
router.put('/:id', controller.updateMagasin);
router.delete('/:id', controller.deleteMagasin);

module.exports = router;
