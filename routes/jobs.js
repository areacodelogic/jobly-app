const express = require('express');
const ExpressError = require('../helpers/expressError');

const Job = require('../models/job');
const { ensureLoggedIn, adminRequired, authRequired, ensureCorrectUser } = require('../middleware/auth');
const { validate } = require('jsonschema');
const { jobNewSchema, jobUpdateSchema } = require('../schemas');
const router = express.Router({ mergeParams: true });

/** GET / => {jobs: [job, ...]} */

router.get('/', ensureLoggedIn, async function (req, res, next) {
  try {
    const jobs = await Job.findAll(req.query);
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[jobid] => {job: job} */

router.get('/:id', ensureLoggedIn, async function (req, res, next) {
  try {
    const job = await Job.findOne(req.params.id);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** POST / {jobData} => {job: job} */

router.post('/', adminRequired, async function (req, res, next) {
  try {
    const validation = validate(req.body, jobNewSchema);

    if (!validation.valid) {
      let listOfErrors = validation.errors.map((err) => err.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[jobid]  {jobData} => {job: updatedJob} */

router.patch('/:id', adminRequired, async function (req, res, next) {
  try {
    if ('id' in req.body) {
      throw new ExpressError('You are not allowed to change the ID', 400);
    }

    const validation = validate(req.body, jobUpdateSchema);

    if (!validation.valid) {
      let listOfErrors = validation.errors.map((err) => err.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const job = await Job.update(req.params.id, req.body);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  {message: "User deleted"}  */

router.delete(`/:id`, adminRequired, async function (req, res, next) {
  try {
    await Job.remove(req.params.id);
    return res.json({ message: 'Job deleted' });
  } catch (err) {
    return next(err);
  }
});

/** POST /[id]/apply  {state} => {message: state} */

router.post("/:id/apply", authRequired, async function(req, res, next) {
  try {
    console.log(req.username)
    const state = req.body.state || "applied";
    await Job.apply(req.params.id, req.user.username, state)
    return res.json({message: state})
  } catch (err) {
    return next(err)
  }
})

module.exports = router;
