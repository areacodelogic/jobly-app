const db = require('../db');
const partialUpdate = require('../helpers/partialUpdate');
const ExpressError = require('../helpers/ExpressError');

class User {
  /** Register user with data. Returns new user data. */

  static async register(data) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users
        WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There aleady exists a user with username ${data.username}`,
        400
      );
    }

    const result = await db.query(
      `INSERT into users
            (username, password, first_name, last_name, email, photo_url)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING username, password, first_name, last_name, email, photo_url`,
      [
        data.username,
        data.password,
        data.first_name,
        data.last_name,
        data.email,
        data.photo_url,
      ]
    );

    return result.rows[0];
  }

  /** Find all users. */

  static async findAll(){
    const result = await db.query(
      `SELECT username, first_name, last_name, email
        FROM users
        ORDER by username`
    );

    return result.rows
  }
}

module.exports = User;
