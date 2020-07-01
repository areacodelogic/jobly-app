// const express = require('express');

// const ExpressError = require('./helpers/ExpressError')

// const authRoutes = require('./routes/auth');
// const companiesRoutes = require('./routes/companies');
// const jobsRoutes = require('./routes/jobs');
// const userRoutes = require('./routes/users');

// const morgan = require('morgan');

// const app = express();
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());

// // const { authenticateJWT } = require('./middleware/auth');


// // add logging system
// app.use(morgan('tiny'));
// // app.use(authenticateJWT);




// app.use('/auth', authRoutes)
// app.use('/companies', companiesRoutes);
// app.use('/jobs', jobsRoutes)
// app.use('/users', userRoutes)

// /** 404 handler */

// app.use(function (req, res, next) {
//   const err = new Error("Not Found");
//   err.status = 404;

//   // pass the error to the next piece of middleware
//   return next(err);
// });

// /** general error handler */

// app.use(function (err, req, res, next) {
//   if (err.stack) console.log(err.stack);

//   res.status(err.status || 500);

//   return res.json({
//     error: err,
//     message: err.message
//   });
// });


// module.exports = app;


/** Express app for jobly. */


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// add logging system

const morgan = require("morgan");
app.use(morgan("tiny"));


const usersRoutes = require("./routes/users");
const companiesRoutes = require("./routes/companies");
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

app.use("/companies", companiesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/users", usersRoutes);
app.use("/", authRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  if (err.stack) console.log(err.stack);

  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;