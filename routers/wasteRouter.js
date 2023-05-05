const { Router } = require('express');

const wasteController = require('../controllers/wasteController');
// const authenticator = require('../middleware/authenticator.js');

const wasteRouter = Router();

wasteRouter.get("/", wasteController.index);

module.exports = wasteRouter