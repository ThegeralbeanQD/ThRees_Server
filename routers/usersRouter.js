const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.post("/login", userController.login);

module.exports = router;
