const Diary = require("../models/Waste");

async function index (req, res) {
    try {
        const waste = await Diary.getAll();
        res.status(200).json(waste);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

module.exports = {
    index
}