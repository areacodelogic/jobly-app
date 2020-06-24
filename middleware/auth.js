const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../helpers/ExpressError');
const db = require('../db');

/** Middleware to use when they must provide a valid token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function authRequired(req, res, next) {
  try {
    const tokenStr = req.body._token;
    let payload = jwt.verify(tokenStr, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new ExpressError('You must Authenticate first', 401));
  }
}

/** Middleware: Requires user is authenticated. */


function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return next(new ExpressError('Unauthorized', 401));
  } else {
    next();
  }
}

/** Middleware: Requires correct username. */


function ensureCorrectUser(req, res, next) {
  try {
    const tokenStr = req.body._token;

    let payload = jwt.verify(tokenStr, SECRET_KEY);
    req.user = payload

    if (req.user.username === req.params.username) {
      return next();
    }
    throw new Error();
  } catch (err) {
    return next(new ExpressError('Unauthorized', 401));
  }
}


/** Middleware: Check if user is admin. */



function adminRequired(req, res, next) {
  try {
    const tokenStr = req.body._token;

    let token = jwt.verify(tokenStr, SECRET_KEY);
    res.locals.username = token.username;

    if (token.is_admin) {
      return next();
    }

    // throw an error, so we catch it in our catch, below
    throw new Error();
  } catch (err) {
    return next(new ExpressError('You must be an admin to access', 401));
  }
}


module.exports = {
  authRequired,
  ensureCorrectUser,
  ensureLoggedIn,
  adminRequired,
};