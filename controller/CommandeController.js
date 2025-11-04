const Commande = require('../model/CommandeModel');


function getAllCommande(req, res) {
    console.log("getAllCommandes called");
}

function getCommandeById(req, res) {
    console.log("getCommandeById called");
}

function createCommande(req, res) {
    console.log("createCommande called");
}

function updateCommande(req, res) {
    console.log("updateCommande called");
}

function deleteCommande(req, res) {
    console.log("deleteCommande called");
}

module.exports = {
    getAllCommande,
    getCommandeById,
    createCommande,
    updateCommande,
    deleteCommande,
};