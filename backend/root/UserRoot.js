const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController'); 
const { getAllUser, getUserById, createUser, updateUser, deleteUser } = controller;

router.get('/getallusers', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;


