const express = require('express');
const Brand = require('../models/Brand');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', auth, admin, async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(200).json({ success: true, brand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
