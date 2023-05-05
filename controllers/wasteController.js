const Waste = require("../models/Waste");

async function index (req, res) {
    try {
        const waste = await Waste.getAll();
        res.status(200).json(waste);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function show (req, res) {
    try {
        const postcode = req.params.postcode;
        const id = await Waste.getId(postcode);
        const data = await Waste.getOneByPostcode(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function createRecycle (req, res) {
    try {
        const data = req.body;
        const waste = await Waste.createRecycle(data);
        res.json(waste);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, createRecycle
}