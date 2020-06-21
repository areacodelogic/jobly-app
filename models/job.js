const db = require('../db');
const ExpressError = require('../helpers/ExpressError');
const sqlForPartialUpdate = require('../helpers/partialUpdate');

class Job {
  /** Find all jobs (can filter on terms in data). */

  static async findAll(data) {
    let baseQuery = 'SELECT id, title, company_handle FROM jobs';
    let whereExpressions = [];
    let queryValues = [];

    if (data.min_salary) {
      queryValues.push(+data.min_salary);
      whereExpressions.push(`min_salary >= $${queryValues.length}`);
    }

    if (data.min_equity) {
      queryValues.push(+data.min_equity);
      whereExpressions.push(`min_equity >= $${queryValues.length}`);
    }

    if (data.search) {
      queryValues.push(`%${data.search}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      baseQuery += ' WHERE ';
    }

    // Finalize query and return results

    let finalQuery = baseQuery + whereExpressions.join(' AND ');
    const jobsRes = await db.query(finalQuery, queryValues);
    return jobsRes.rows;
  }

  static async findOne(id) {
    const jobRes = await db.query(
      `SELECT id, title, salary, equity, company_handle
        FROM JOBS
        WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];

    if (!job) {
      throw new ExpressError(`There exists no job ${id}, 404`);
    }

    return job;
  }

  static async create(data) {
    const result = await db.query(
      `INSERT INTO jobs (title, salary, equity, company_handle) 
        VALUES ($1, $2, $3, $4) 
        RETURNING title, salary, equity, company_handle`,
      [data.title, data.salary, data.equity, data.company_handle]
    );

    return result.rows[0];
  }

  static async update(id, data) {
    let { query, values } = sqlForPartialUpdate('jobs', data, 'id', id);

    const result = await db.query(query, values);
    const job = result.rows[0];

    if (!job) {
      throw new ExpressError(`There exists no job ${job}`, 404);
    }

    return job;
  }

  static async remove(id, data) {
    const result = await db.query(
      `DELETE FROM jobs
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length == 0) {
      throw ExpressError(`THere exists no job ${id}`, 404);
    }
  }
}
module.exports = Job;
