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
        console.log(data.waste_postcode);
        const id = await Waste.createNewPostcode(data.waste_postcode)
        console.log(id);
        const waste = await Waste.createRecycle(data, id);
        res.json(waste);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function createGeneral (req, res) {
    try {
        const data = req.body;
        console.log(data.waste_postcode);
        const id = await Waste.createNewPostcode(data.waste_postcode)
        const waste = await Waste.createGeneral(data, id);
        res.json(waste);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function createCompost (req, res) {
    try {
        const data = req.body;
        console.log(data.waste_postcode);
        const id = await Waste.createNewPostcode(data.waste_postcode)
        const waste = await Waste.createCompost(data, id);
        res.json(waste);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}
async function createAll (req, res) {
    try {
        const data = req.body;
        console.log(data.waste_postcode);
        const id = await Waste.createNewPostcode(data.waste_postcode)
        const waste = await Waste.createAll(data, id);
        res.json(waste);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, createRecycle, createGeneral, createCompost, createAll
}