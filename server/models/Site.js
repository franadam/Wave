const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const siteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  featured: {
    type: Array,
    required: true,
    default: [],
  },
  siteInfo: {
    type: Array,
    required: true,
    default: [],
  },
});


const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
