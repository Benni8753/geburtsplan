const auth = require('../../middleware/auth');
const User = require('../../models/User');
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route   GET auth/users
// @desc    Test route
// access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error (api/auth.js)');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { email, password } = req.body;

    try {
      //User already exists?
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'email is misspelled or does not exists' }],
          });
      }

      //Password the one stored in the db?
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Password is not correct' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'), // this is the value from default.json
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // this is where the token gets send.
        }
      );
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send('server error coming from users.js / 1. try catch block');
    }
  }
);



module.exports = router;
