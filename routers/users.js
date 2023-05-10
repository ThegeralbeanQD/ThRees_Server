const express = require('express');
const router = express.Router();
const Users = require('../models/users');

// Update user
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.getOneById(req.params.id);
        const updatedUser = await user.update(req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
