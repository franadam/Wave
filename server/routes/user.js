const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/auth', auth, (req, res) => {
  const { email, lastname, firstname, basket, history, role } = req.user;
  res.status(200).json({
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    lastname,
    firstname,
    email,
    basket,
    history,
  });
});

router.get('/logout', auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findOneAndUpdate({ _id }, { token: '' });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();

    res.send({ succes: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = 'This user does not exist';
      throw new Error(errors.email);
    }

    user.comparePassword(password, (error, isMatch) => {
      try {
        if (!isMatch) {
          errors.password = 'Incorrect password';
          throw new Error(errors.password);
        }
        user.generateToken((error, user) => {
          if (error) throw new Error(error.message);
          res
            .cookie('w_auth', user.token)
            .status(200)
            .json({ loginSuccess: true });
        });
        if (error) throw new Error(error.message);
      } catch (error) {
        res.send({ loginSuccess: false, error: error.message });
      }
    });
  } catch (error) {
    res.send({ loginSuccess: false, error: error.message });
  }
});

module.exports = router;
