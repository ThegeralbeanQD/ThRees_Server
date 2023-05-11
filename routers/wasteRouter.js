const { Router } = require('express');

const wasteController = require('../controllers/wasteController');
const authenticator = require('../middleware/authenticator.js');

const wasteRouter = Router();

wasteRouter.get("/", wasteController.index);
wasteRouter.get("/:postcode", wasteController.show);
wasteRouter.post("/", authenticator, wasteController.create);
wasteRouter.patch("/:postcode", authenticator, wasteController.update);
wasteRouter.delete("/:postcode", authenticator, wasteController.destroy);


module.exports = wasteRouter
