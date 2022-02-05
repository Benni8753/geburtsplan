const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

//TODO: Change password min length to 6 or more instead of just 2
//TODO: change expiresIn to 3600 or so.

// @route   POST api/users
// @desc    Register User
// access   Public
router.post(
  '/',
  [
    check('lastName', 'Name is required').not().isEmpty(),
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 1 or more characters'
    ).isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { firstName, lastName, email, password } = req.body;

    try {
      //User already exists?
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //if user is not existing..
      user = new User({
        firstName,
        lastName,
        email,
        password, // this is the plain password at this state :(, so hash it
      });
      //hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //this saves the user to the db
      await user.save();
      //Return Jsonwebtoken
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

// @route   POST api/users/update
// @desc    Update first name
// access   Public
router.post(
  '/update',
  //the auth makes the routes protected.
  auth,
  [
    //this must be the content of the req.
    check('lastName', 'Name is required').not().isEmpty(),
    check('firstName', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 1 or more characters'
    ).isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    const { firstName, email } = req.body;

    try {
      //Does the user exists??
      let user = await User.findOne({ email });
      //If it exists, update the firstName of the user in the db
      if (user) {
        let user = await User.findOneAndUpdate({
          firstName: firstName,
        });
        await user.save();
        return res
          .status(200)
          .json({ errors: [{ msg: 'first name has been changed' }] });
      }

      //if the user does not exists?
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'name cannot be changed as the email address could not be found',
            },
          ],
        });
      }
      //Return Jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error line 136 routes/api/users.js');
    }
  }
);

module.exports = router;
