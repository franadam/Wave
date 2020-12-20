const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    unique: 1,
  },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
