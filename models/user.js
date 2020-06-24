const db = require('../db');
const partialUpdate = require('../helpers/partialUpdate');
const ExpressError = require('../helpers/ExpressError');
const bcrypt = require('bcrypt');

const BCRYPT_WORK_FACTOR = 10;


class User {

  /**authenticate user with username, password. Return user or throws error */
  /** Register user with data. Returns new user data. */


  static async authenticate(data){
  
    const result = await db.query(
      `SELECT username,
              password,
              first_name,
              last_name,
              email,
              photo_url,
              is_admin
          FROM users
          WHERE username = $1`,
    [data.username]
    )

    const user = result.rows[0];
    
    if(user){
      const isValid = await bcrypt.compare(data.password, user.password);
      if(isValid){
        return user
      }
      
    }


    throw new ExpressError(`Invalid Password`, 401)
  }

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
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)

    const result = await db.query(
      `INSERT into users
            (username, password, first_name, last_name, email, photo_url, is_admin)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING username, password, first_name, last_name, email, photo_url, is_admin`,
      [
        data.username,
        hashedPassword,
        data.first_name,
        data.last_name,
        data.email,
        data.photo_url,
        data.is_admin
      ]
    );
    return result.rows[0];
  }

  /** Find all users. */

  static async findAll() {
    const result = await db.query(
      `SELECT username, first_name, last_name, email
        FROM users
        ORDER by username`
    );

    return result.rows;
  }

  /** Given a username, return data about user. */

  static async findOne(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, photo_url
        FROM users
        WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user ${username}`, 404);
    }

   
    const userJobsRes = await db.query(
      `SELECT j.id, j.title, j.company_handle, a.state 
           FROM applications AS a
             JOIN jobs AS j ON j.id = a.job_id
           WHERE a.username = $1`,
      [username]
    );

    user.jobs = userJobsRes.rows;

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    let { query, values } = partialUpdate("users", data, "username", username);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0];
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
      [username]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }
  }
}



module.exports = User;
