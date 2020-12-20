const express = require('express');
const Guitar = require('../models/Guitar');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, admin, async (req, res) => {
  try {
    const guitar = new Guitar(req.body);
    await guitar.save();
    res.status(200).json({ success: true, guitar });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const guitars = await Guitar.find();
    res.status(200).json({ success: true, guitars });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
