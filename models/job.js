const db = require('../db');
const ExpressError = require('../helpers/ExpressError');
const sqlForPartialUpdate = require('../helpers/partialUpdate');

class Job {
  /** Find all jobs (can filter on terms in data). */

  static async findAll(data) {
    let baseQuery = 'SELECT title, salary, equity, company_handle FROM jobs';
    let whereExpressions = [];
    let queryValues = [];

    if (data.min_salary) {
      const minSalary = +data.min_salary;
      if (!minSalary && minSalary !== 0) {
        throw {
          message: 'min_salary must be a number',
          status: 400,
        };
      } else {
        queryValues.push(+data.min_salary);
        whereExpressions.push(`salary >= $${queryValues.length}`);
      }
    }

    if (data.min_equity) {
      const minEquity = +data.min_equity;
      if (!minEquity && minEquity !== 0) {
        throw {
          message: 'min_equity must be a number',
          status: 400,
        };
      } else {
        queryValues.push(+data.min_equity);
        whereExpressions.push(`equity >= $${queryValues.length}`);
      }
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
    if (!Number.isInteger(Number(id))) {
      throw new ExpressError('Id must be an integer', 400);
    }
    const jobRes = await db.query(
      `SELECT id, title, salary, equity, company_handle
        FROM JOBS
        WHERE id = $1`,
      [id]
    );

    const job = jobRes.rows[0];

    if (!job) {
      throw new ExpressError(`There exists no job ${id}`, 404);
    }

    const companiesRes = await db.query(
      `SELECT name, num_employees, description, logo_url
        FROM companies
        WHERE handle = $1`,
      [job.company_handle]
    );

    job.company = companiesRes.rows[0];

    return job;
  }

  static async create(data) {
    const { title, salary, equity, company_handle } = data;

    const result = await db.query(
      `
            INSERT INTO jobs (
                title,
                salary,
                equity,
                company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING
                id,
                title,
                salary,
                equity,
                company_handle,
                date_posted`,
      [title, salary, equity, company_handle]
    );

    return result.rows[0];
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed job.
   *
   */
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
    if (!Number.isInteger(Number(id))) {
      throw new ExpressError('Id must be an integer', 400);
    }

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
