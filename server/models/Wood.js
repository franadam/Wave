const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    unique: 1,
  },
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = Wood;
