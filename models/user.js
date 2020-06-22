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

   static async update(username, data){

    let {query, values} = partialUpdate('users', data, 'username', username);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if(!user){
      throw new ExpressError(`There exist no user ${username}`, 404)
    };

    return user;
   }

   static async remove(username){
     let result = await db.query(
       `DELETE FROM users
          WHERE username = $1
          RETURNING username`,
        [username]
     )

     if(result.rows.length === 0){
       throw new ExpressError(`There exists no user ${username}`, 404)
     }

   }
}

module.exports = User;
