const Commande = require('../model/CommandeModel');


async function getAllCommande(req, res) {
    try {
        const commandes = await Commande.find();
        res.status(200).json({ success: true, data: commandes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

function getCommandeById(req, res) {
    console.log("getCommandeById called");
}

function createCommande(req, res) {
    try {
        const newCommande = new Commande(req.body);
        newCommande.save()
            .then(cmd => res.status(201).json({ success: true, data: cmd }))
            .catch(err => res.status(500).json({ success: false, error: err.message }));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
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