const express = require('express');
const router = express.Router();
const controller = require('../controller/CommandeController'); 

router.get('/', controller.getAllCommande);
router.get('/:id', controller.getCommandeById);
router.post('/', controller.createCommande);
router.put('/:id', controller.updateCommande);
router.delete('/:id', controller.deleteCommande);

module.exports = router;
