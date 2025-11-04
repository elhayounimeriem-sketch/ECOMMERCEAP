const Magasin = require('../model/MagasinModel');


function getAllMagasin(req, res) {
    console.log("getAllMagasins called");
}

function getMagasinById(req, res) {
    console.log("getMagasinById called");
}

function createMagasin(req, res) {
    console.log("createMagasin called");
}

function updateMagasin(req, res) {
    console.log("updateMagasin called");
}

function deleteMagasin(req, res) {
    console.log("deleteMagasin called");
}

module.exports = {
    getAllMagasin,
    getMagasinById,
    createMagasin,
    updateMagasin,
    deleteMagasin,
};
