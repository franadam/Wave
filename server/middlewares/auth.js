const { json } = require('body-parser');
const User = require('../models/User');

const auth = (req, res, next) => {
  const token = req.cookies.w_auth;

  User.findByToken(token, (error, user) => {
    if (error || !user) throw new Error('Please authenticate');
    req.user = user;
    req.token = token;
    next();
  });
};

module.exports = auth;
