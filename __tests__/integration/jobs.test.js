process.env.NODE_ENV = 'test';

const app = require('../../app');
const db = require('../../db');
const request = require('supertest');

let jobId

beforeEach(async function () {
  await db.query(`INSERT INTO companies (handle, name, num_employees, description, logo_url)
                    VALUES ('TEST1', 'TestCo1', 1000, 'test description1', 'test_url1'),
                           ('TEST2', 'TestCo2', 2000, 'test description2', 'test_url2')`);

 const newJob = await db.query(`INSERT INTO jobs (title, salary, equity, company_handle)
                    VALUES ('TESTER1', 1000, 0.1, 'TEST1'),
                           ('TESTER2', 2000, 0.2, 'TEST2')
                    RETURNING *`);
  jobId = newJob.rows[0].id
});


afterEach(async function () {
  await db.query(`DELETE FROM companies`);
  await db.query(`DELETE FROM jobs`);
  console.log('afterEach');
});

afterAll(async function () {
  await db.end();
  console.log('afterAll');
});

describe('GET /', function () {
  test('Get all jobs', async function () {
    const response = await request(app).get('/jobs/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      jobs: expect.any(Array),
    });

    expect(response.body).toEqual({
      jobs: [
        {
          title: 'TESTER1',
          salary: 1000,
          equity: 0.1,
          company_handle: 'TEST1',
        },
        {
          title: 'TESTER2',
          salary: 2000,
          equity: 0.2,
          company_handle: 'TEST2',
        },
      ],
    });
  });

  test('returns filtered jobs only', async function () {
    const res = await request(app).get('/jobs?search=apple');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.jobs).toEqual(expect.any(Array));
    expect(res.body.jobs.length).toEqual(0);
  });

  test('returns filtered jobs only', async function () {
    const res = await request(app).get('/jobs?min_salary=1500&min_equity=0.1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.jobs[0]).toEqual({
      title: 'TESTER2',
      company_handle: 'TEST2',
      salary: 2000,
      equity: 0.2,
    });
    expect(res.body.jobs.length).toEqual(1);
  });

  test('returns error if invalid query input given', async function () {
    const res = await request(app).get('/jobs?min_salary=NaN');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('min_salary must be a number');
  });
});

describe('POST /', function () {
  test('creates one job', async function () {
    const res = await request(app).post('/jobs').send({
      title: 'TESTER3',
      company_handle: 'TEST2',
      salary: 3000,
      equity: 0.5,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.job).toEqual({
      id: expect.any(Number),
      title: 'TESTER3',
      salary: 3000,
      equity: 0.5,
      company_handle: 'TEST2',
      date_posted: expect.any(String),
    });
  });

  test('Prevents creating a job without required title field', async function () {
    const response = await request(app).post(`/jobs`).send({
      salary: 1000000,
      equity: 0.2,
      company_handle: 'TEST2',
    });
    expect(response.statusCode).toBe(400);
  });

  it('Cannot create new job for a company that doesnt exist', async function () {
    const resp = await request(app).post('/jobs').send({
      title: 'testtitle',
      salary: 90000,
      equity: 0.2,
      company_handle: 'Testtwo',
    });

    expect(resp.body.message).toContain('violates foreign key constraint ');
  });
});

describe('GET /:id', function () {
  test('returns one job', async function () {
    
    const res = await request(app).get(`/jobs/${jobId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.job).toEqual({
      id: jobId,
      title: 'TESTER1',
      salary: 1000,
      equity: 0.1,
      company_handle: 'TEST1',
      company: {
        description: "test description1",
        logo_url: "test_url1",
        name: 'TestCo1',
        num_employees: 1000,
      },
    });
  });

  test('returns error if id is not integer', async function () {
    const res = await request(app).get('/jobs/apple');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('integer');
  });

  
    test('Gets a single a job', async function () {
      const response = await request(app)
        .get(`/jobs/${jobId}`)
      expect(response.body.job).toHaveProperty('id');

      expect(response.body.job.id).toBe(jobId);
    });

    test('Responds with a 404 if it cannot find the job in question', async function () {
      const response = await request(app)
        .get(`/jobs/999`)
      expect(response.statusCode).toEqual(404);
      expect(response.body.message).toEqual('There exists no job 999');
    });
  

});


describe('PATCH /:id', function () {
  test('updates a job', async function () {
    const res = await request(app)
      .patch(`/jobs/${jobId}`)
      .send({ title: 'updated test', salary: 100, equity: 0.1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.job).toEqual({
      id: jobId,
      title: 'updated test',
      salary: 100,
      equity: 0.1,
      date_posted: expect.any(String),
      company_handle: 'TEST1',
    });
  });

  test('return error if inputs are invalid', async function () {
    const res = await request(app)
      .patch('/jobs/test')
      .send({ salary: 'happy' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('not of a type(s) integer');
  });

  test('prevents invalid input update', async function () {
    const res = await request(app).patch(`/jobs/999`).send({ title: 'test', salary: 10000 });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual('There exists no job undefined')
  });
});



describe('DELETE /:id', function () {
 

  test('deletes one job', async function () {
    const res = await request(app).delete(`/jobs/${jobId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual('Job deleted');
  });

  test('returns error if job id not integer', async function () {
    const res = await request(app).delete('/jobs/number');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toContain('Id must be an integer');
  });
});