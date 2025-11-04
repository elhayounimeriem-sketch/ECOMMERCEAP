const User = require('../model/UserModel');


function getAllUser(req, res) {
    console.log("getAllUsers called");
}

function getUserById(req, res) {
    console.log("getUserById called");
}

function createUser(req, res) {
    console.log("createUser called");
}

function updateUser(req, res) {
    console.log("updateUser called");
}

function deleteUser(req, res) {
    console.log("deleteUser called");
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
