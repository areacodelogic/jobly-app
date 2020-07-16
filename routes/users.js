const express = require('express');
// const ExpressError = require('../helpers/ExpressError');
const { ensureCorrectUser, ensureLoggedIn, authRequired } = require('../middleware/auth');
const User = require('../models/User');
const { validate } = require('jsonschema');
const { userNewSchema, userUpdateSchema } = require('../schemas');
const createToken = require('../helpers/createToken');




const router = express.Router();

/** GET / => {users: [user, ...]} */

router.get('/', authRequired, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => {user: user} */

router.get('/:username', authRequired, async function (req, res, next) {
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
   const validation = validate(req.body, userNewSchema);

  if (!validation.valid) {
    let listOfErrors = validation.errors.map((err) => err.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }
    const user = await User.register(req.body);
    const token = createToken(user);

     return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] {userData} => {user: updatedUser} */

router.patch('/:username', ensureCorrectUser, async function (req, res, next) {
  try {

     if ('username' in req.body || 'is_admin' in req.body) {
       throw new ExpressError(
         'You are not allowed to change username or is_admin properties.',
         400
       );
     }
    const validation = validate(req.body, userUpdateSchema);

    if (!validation.valid) {
      let listOfErrors = validation.errors.map((err) => err.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

router.delete(`/:username`, ensureCorrectUser, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
