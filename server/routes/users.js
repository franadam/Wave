const express = require('express');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');
const User = require('../models/User');
const admin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const mongooseTypes = require('mongoose').Types;

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

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

    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post('/signin', async (req, res) => {
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
          res.cookie('w_auth', user.token).status(200).json({ success: true });
        });
        if (error) throw new Error(error.message);
      } catch (error) {
        res.send({ success: false, error: error.message });
      }
    });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

router.post('/edit_profile', auth, async (req, res) => {
  try {
  const user = await User.findOneAndUpdate(
    {_id:req.user._id},
    {$set: req.body},
    {upsert:true}
  )
  await user.save()
  console.log('user :>> ', user);
  res.status(200).json({ success: true, user });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
})

router.post('/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    res.status(200).send({
      public_id : result.public_id,
      url : result.url
    })
  }, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
    format: 'png',
  })
})

router.get('/removeimage', auth, admin, (req, res) => {
  const {public_id} = req.query;
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) return res.json({success:false, error});
    res.status(200).send('OK');
  })
});

router.post('/add_to_basket', auth, async (req, res) => {
  try {
    const user = await User.findOne({_id:req.user._id})
    let duplicate = false;
    user.basket.forEach(item => {
      if (item.id == req.query.id) {
        duplicate = true;
      }
    })
    if (user){
      if (duplicate) {
        const u = await User.findOneAndUpdate(
          {_id:req.user._id, "basket.id": mongooseTypes.ObjectId(req.query.id)},
          {$inc: {"basket.$.quantity": 1}},
          {upsert:true}
        )
        
        await u.save()
      }
      else {
        await user.updateOne({$push:{basket: {
          id: mongooseTypes.ObjectId(req.query.id),
          quantity: 1,
          date: Date.now()
        }}}, {upsert:true})
      
        await user.save()
      }
    }
    res.status(200).json(user.basket)
  } catch (error) {
      res.send({ success: false, error: error.message })
  }
})

router.post('/remove_from_basket', auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {_id:req.user._id},
      {$pull:
        { basket: { id: mongooseTypes.ObjectId(req.query.id) } }
      },
      {upsert:true}
    )
    await user.save();
    res.status(200).json(user.basket);
    console.log('user.basket :>> ', req.query.id, user.basket);
    console.log('user :>> ', user);
  } catch (error) {
      res.send({ success: false, error: error.message })
  }
})

module.exports = router;
