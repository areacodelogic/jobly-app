const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const Company = require('../models/company');

const router = new express.Router();



/** GET /  =>  {companies: [company, company]}  */

router.get('/', async function(req, res, next) {
  try {
    const companies = await Company.findAll(req.query);
    return res.json({companies});
  }catch (err){
      return next(err)
    }
  
})


module.exports = router;