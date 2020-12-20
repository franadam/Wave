const mongoose = require('mongoose');

const guitarSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    unique: 1,
  },
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
