const express = require('express');
const mongoose = require('mongoose');

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

// /guitars?sotBy=createdAt&order=desc&limit=50&skip=10
router.get('/', async (req, res) => {
  try {
    const { order: o, sortBy: sb, limit: l, skip: s } = req.query;

    const order = o ? o : 'asc';
    const sortBy = sb ? sb : 'sold';
    const limit = l ? parseInt(l) : 100;
    const skip = s ? parseInt(s) : 0;

    const guitar = await Guitar.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip);

    if (!guitar) throw new Error('No guitar found');

    res.status(200).json({ success: true, guitar });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const guitar = await Guitar.findById(id).populate('brand').populate('wood');
    if (!guitar) throw new Error('No guitar found');
    res.status(200).json({ success: true, guitar });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
