const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
