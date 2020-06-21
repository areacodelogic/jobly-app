const express = require('express');
const ExpressError = require('../helpers/expressError');

const Job = require('../models/job');

const router = express.Router({ mergeParams: true });

/** GET / => {jobs: [job, ...]} */

router.get('/', async function (req, res, next) {
  try {
    const jobs = await Job.findAll(req.query);
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[jobid] => {job: job} */

router.get('/:id', async function (req, res, next) {
  try {
    const job = await Job.findOne(req.params.id);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
