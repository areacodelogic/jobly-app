const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const User = require('../models/User');


const router = express.Router();

/** POST / {userdata}  => {user: user} */


router.post('/', async function(req, res, next) {
  try {
    const newUser = await User.register(req.body)
    return res.status(201).json({newUser})
  } catch (err) {
    return next(err)
  }
})


module.exports = router