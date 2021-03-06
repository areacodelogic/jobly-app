const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const Company = require('../models/company');
const {  ensureLoggedIn, adminRequired, authRequired } = require('../middleware/auth');

const { validate } = require('jsonschema');
const { companyNewSchema, companyUpdateSchema } = require('../schemas');

const router = new express.Router();

/** GET /  =>  {companies: [company, company]}  */

router.get('/', authRequired, async function (req, res, next) {
  try {
    const companies = await Company.findAll(req.query);
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  {company: company} */

router.get('/:handle', authRequired, async function (req, res, next) {
  try {
    const company = await Company.findOne(req.params.handle);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** POST / {companyData} =>  {company: newCompany} */

router.post('/', adminRequired, async function (req, res, next) {
  try {
    const validation = validate(req.body, companyNewSchema);

    if (!validation.valid) {
      let listOfErrors = validation.errors.map((err) => err.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] {companyData} => {company: updatedCompany}  */

router.patch('/:handle', adminRequired, async function (req, res, next) {
  try {
    if ('handle' in req.body) {
      throw new ExpressError('You are not allowed to change the handle', 400);
    }

     const validation = validate(req.body, companyUpdateSchema);

     if (!validation.valid) {
       let listOfErrors = validation.errors.map((err) => err.stack);
       let error = new ExpressError(listOfErrors, 400);
       return next(error);
     }


    const company = await Company.update(req.params.handle, req.body);
    return res.json({ company });
  } catch (err) {
    throw next(err);
  }
});

/** DELETE /[handle]  =>  {message: "Company deleted"}  */
router.delete(`/:handle`, adminRequired, async function (req, res, next) {
  try {
    await Company.remove(req.params.handle);
    return res.json({ message: `Company Deleted` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
