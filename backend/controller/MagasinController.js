const Magasin = require('../model/MagasinModel');


async function getAllMagasin(req, res) {
    try {
        const magasins = await Magasin.find();
        res.status(200).json({ success: true, data: magasins });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

function getMagasinById(req, res) {
    console.log("getMagasinById called");
}

async function createMagasin(req, res) {
    try {
        const newMagasin = new Magasin(req.body);
        const saved = await newMagasin.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
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
