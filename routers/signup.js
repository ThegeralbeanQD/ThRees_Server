const express = require('express');
const router = express.Router();
const multer = require('multer');
const { create } = require('../controllers/usersController');

// Set up Multer for handling file uploads- honestly so confused about all of this 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/signup
router.post('/', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, postcode, password } = req.body;
    const profilePic = req.file.buffer;

    const user = await create(name, postcode, password, profilePic);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
