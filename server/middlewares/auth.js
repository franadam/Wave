const { json } = require('body-parser');
const User = require('../models/User');

const auth = (req, res, next) => {
  const token = req.cookies.w_auth;

  User.findByToken(token, (error, user) => {
    if (error) throw error;
    if (!user) return res.json({ isAuth: false, error: true });
    req.user = user;
    req.token = token;
    next();
  });
};

module.exports = auth;
