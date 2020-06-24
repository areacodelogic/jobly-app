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

function authenticateJWT(req, res, next) {
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
    req.user = payload;

    if (req.user.username === req.params.username) {
      return next();
    }
    throw new Error();
  } catch (err) {
    return next(new ExpressError('Unauthorized', 401));
  }
}


/** Middleware: Check if user is admin. */


async function ensureAdminUser(req, res, next) {
  try {
    let user = await db.query(
      `SELECT is_admin
      FROM users
      WHERE username = $1`,
      [req.user.username]
    );

    if (user.rows[0].is_admin === true) {
      return next();
    } else {
    return next(new ExpressError('Unauthorized', 401));
    }
  } catch (err) {
    // errors would happen here if we made a request and req.user is undefined
    return next(new ExpressError('Unauthorized', 401));
  }
}

module.exports = {
  authenticateJWT,
  ensureCorrectUser,
  ensureLoggedIn,
  ensureAdminUser,
};
