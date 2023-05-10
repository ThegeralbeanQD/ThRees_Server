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
        const userInput = req.params.postcode;
        const postcode = await Waste.correctPostcode(userInput);
        const id = await Waste.getId(postcode);
        const data = await Waste.getOneById(id);
        const updatedData = await Waste.autoUpdateData(data)
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const postcode = await Waste.correctPostcode(data.waste_postcode);
        const id = await Waste.createNewPostcode(postcode)
        const waste = await Waste.create(data, id);
        res.json(waste);
    } catch (err) {
        res.status(409).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const userInput = req.params.postcode;
        const postcode = await Waste.correctPostcode(userInput);
        const id = await Waste.getId(postcode);
        const data = req.body;
        const waste = await Waste.update(data, id);
        res.json(waste);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
}

async function destroy (req, res) {
    try {
        const userInput = req.params.postcode;
        const postcode = await Waste.correctPostcode(userInput);
        const id = await Waste.getId(postcode);
        const response = await Waste.destroy(id);
        res.json(response);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
}

module.exports = {
    index, show, create, update, destroy
}