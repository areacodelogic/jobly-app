const express = require('express');

const ExpressError = require('./helpers/ExpressError')
const app = express();
const { authenticateJWT } = require('./middleware/auth');

const morgan = require('morgan');


app.use(express.json());
// app.use(authenticateJWT);


// add logging system
app.use(morgan('tiny'));


const companiesRoutes = require('./routes/companies');
const jobsRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
app.use('/companies', companiesRoutes);
app.use('/jobs', jobsRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)



/* 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err)
})


/* General error handler */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  })
})

module.exports = app;