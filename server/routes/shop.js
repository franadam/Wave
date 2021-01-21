const express = require('express');
const mongoose = require('mongoose');

const Guitar = require('../models/Guitar');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { order: o, sortBy: sb, limit: l, skip: s, filters: f } = req.body;

    const order = o ? o : 'desc';
    const sortBy = sb ? sb : 'sold';
    const limit = l ? parseInt(l) : 100;
    const skip = s ? parseInt(s) : 0;
    const filters = {}

    for (let key in f) {
      if (f[key].length) {
        if (key === 'prices') {
          filters[key] = {
            $gte: f[key][0],
            $lte: f[key][1],
          }
        }
        else {
          filters[key] = f[key]
        }
      }
    }

    const guitars = await Guitar.find(filters)
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip);

    if (!guitars) throw new Error('No guitar found');

    console.log('guitars :>> ', filters);

    res.status(200).json({ success: true, size: guitars.length, articles: guitars });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
