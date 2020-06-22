const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const User = require('../models/User');

const router = express.Router();

/** GET / => {users: [user, ...]} */

router.get('/', async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => {user: user} */

router.get('/:username', async function (req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST / {userdata}  => {user: user} */

router.post('/', async function (req, res, next) {
  try {
    const newUser = await User.register(req.body);
    return res.status(201).json({ newUser });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */

router.patch('/:username', async function (req, res, next) {
  try {
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
