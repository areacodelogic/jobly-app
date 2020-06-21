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


  



}

module.exports = Job;
