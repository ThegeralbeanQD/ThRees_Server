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
        const postcode = await correctPostcode(userInput);
        const id = await Waste.getId(postcode.toUpperCase());
        const data = await Waste.getOneByPostcode(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function correctPostcode(pcode){
    let correctedPostcode = "";
    for (let i = 0; i < pcode.length; i++) {
        if (pcode[i] !== " ") {
            correctedPostcode += pcode[i];
        }
    }
    return correctedPostcode;
}

async function create (req, res) {
    try {
        const data = req.body;
        const id = await Waste.createNewPostcode(data.waste_postcode)
        const waste = await Waste.create(data, id);
        res.json(waste);
    } catch (err) {
        res.status(409).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const postcode = req.params.postcode;
        const wasteId = await Waste.getId(postcode);
        const typeId = await Waste.getTypeId(postcode);

        const data = await Waste.getOneByPostcode(wasteId);
        res.json(waste);
    } catch (err) {
        res.status(409).json({"error": err.message})
    }
}

module.exports = {
    index, show, create
}