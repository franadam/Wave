const express = require('express');
const mongooseTypes = require('mongoose').Types;

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

    const guitars = await Guitar.find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip);

    if (!guitars) throw new Error('No guitar found');

    res.status(200).json({ success: true, guitars });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/guitars_by_id', async (req, res) => {
  try {
    let {ids, type} = req.query;

    if (type === 'array') {
      ids = id.split(',').map(id => mongooseTypes.ObjectId(id))
    }

    const guitars = await Guitar.find({"_id":{$in:ids}})
    .populate('brand')
    .populate('wood');
    
    if (!guitars) throw new Error('No guitars found');
    res.status(200).json({ success: true, guitars });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
