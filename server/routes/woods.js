const express = require('express');
const Wood = require('../models/Wood');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, admin, async (req, res) => {
  try {
    const wood = new Wood(req.body);
    await wood.save();
    res.status(200).json({ success: true, wood });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const woods = await Wood.find();
    res.status(200).json({ success: true, woods });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
