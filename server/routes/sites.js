const express = require('express');
const Site = require('../models/Site');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const site = await Site.find();
    res.status(200).json({ success: true, siteInfo: site[0].siteInfo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post('/', auth, admin, async (req, res) => {
  try {
    const site = await Site.findOneAndUpdate(
      {name: 'Site'},
      {"$set" : { siteInfo: req.body}},
      {upsert:true}
    );
    await site.save();
    res.status(200).json({ success: true, siteInfo: site.siteInfo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
