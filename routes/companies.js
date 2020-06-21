const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const Company = require('../models/company');

const router = new express.Router();

/** GET /  =>  {companies: [company, company]}  */

router.get('/', async function (req, res, next) {
  try {
    const companies = await Company.findAll(req.query);
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  {company: company} */

router.get('/:handle', async function (req, res, next) {
  try {
    const company = await Company.findOne(req.params.handle);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** POST / {companyData} =>  {company: newCompany} */

router.post('/', async function (req, res, next) {
  try {
    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
