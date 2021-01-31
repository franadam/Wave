const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  basket: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = async function (callback) {
  const user = this;
  try {
    const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

userSchema.statics.findByToken = async function (token, callback) {
  const user = this;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const u = await user.findOne({ _id: decoded, token });
    callback(null, u);
  } catch (error) {
    return callback(error);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
