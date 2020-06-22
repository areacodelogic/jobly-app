process.env.NODE_ENV = 'test';

const app = require('../../app');
const db = require('../../db');
const request = require('supertest');

beforeEach(async function () {
  await db.query(`INSERT INTO companies (handle, name, num_employees, description, logo_url)
                    VALUES ('TEST1', 'TestCo1', 1000, 'test description1', 'test_url1'),
                           ('TEST2', 'TestCo2', 2000, 'test description2', 'test_url2')`);
  console.log('beforeEach');
});

afterEach(async function () {
  await db.query(`DELETE FROM companies`);
  console.log('afterEach');
});

afterAll(async function () {
  await db.end();
  console.log('afterAll');
});

describe('GET /', function () {
  test('returns all companies', async function () {
    const res = await request(app).get('/companies');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.companies.length).toEqual(2);
    expect(res.body.companies[0].name).toEqual('TestCo1');
  });

  test('returns filtered companies only', async function () {
    const res = await request(app).get('/companies?search=apple');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.companies).toEqual(expect.any(Array));
    expect(res.body.companies.length).toEqual(0);
  });

  test('returns filtered companies only', async function () {
    const res = await request(app).get('/companies?search=TestCo1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.companies).toEqual(expect.any(Array));
    expect(res.body.companies.length).toEqual(1);
  });

  test('returns filtered companies only', async function () {
    const res = await request(app).get(
      '/companies?min_employees=30&max_employees=1500'
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.companies).toEqual(expect.any(Array));
    expect(res.body.companies.length).toEqual(1);
    expect(res.body.companies[0].name).toEqual('TestCo1');
  });

  test('returns error if invalid query input given', async function () {
    const res = await request(app).get('/companies?min_employees=number');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('min must be a number');
  });
});

describe('POST /', function () {
  test('creates one company', async function () {
    const res = await request(app)
      .post('/companies')
      .send({ handle: 'TEST3', name: 'TestCo3', num_employees: 15 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.company).toEqual(expect.any(Object));
    expect(res.body.company.name).toEqual('TestCo3');
  });

  test('returns error if no handle is given', async function () {
    const res = await request(app)
      .post('/companies')
      .send({ name: 'TestCo5', num_employees: 300 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('handle');
  });

  test('returns error if handle already exists', async function () {
    const res = await request(app)
      .post('/companies')
      .send({ handle: 'TEST2', name: 'TestCo2' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('already exists');
  });
});

describe('GET /companies/:handle', function () {
  it('Get a single comapny by its handle', async function () {
    const resp = await request(app).get(`/companies/TEST2`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      company: {
        handle: 'TEST2',
        name: 'TestCo2',
        num_employees: 2000,
        description: 'test description2',
        logo_url: 'test_url2',
      },
    });
  });

  it('Get no comapny when non-existing handle is passed in', async function () {
    const resp = await request(app).get(`/companies/NotFoundCo`);

    expect(resp.statusCode).toBe(404);
    expect(resp.body).toEqual({
      status: 404,
      message: 'There exists no company NotFoundCo',
    });
  });
});

describe('PATCH /:handle', function () {
  test('updates a company', async function () {
    const res = await request(app)
      .patch('/companies/TEST2')
      .send({ name: 'TestCo2', description: 'updated test' });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.company).toEqual(expect.any(Object));
    expect(res.body.company.num_employees).toEqual(2000);
    expect(res.body.company.description).toEqual('updated test');
  });

  test('return error if inputs are invalid', async function () {
    const res = await request(app)
      .patch('/companies/TEST2')
      .send({ name: 'TestCo2', num_employees: 'NaN' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.error.text).toContain('not of a type(s) integer');
  });
});

describe('DELETE /:handle', function () {
  test('returns error if company not found', async function () {
    const res = await request(app).delete('/companies/TestDelete');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual('There exists no company TestDelete');
  });

  test('deletes one company', async function () {
    const res = await request(app).delete('/companies/TEST2');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.message).toEqual('Company Deleted');
  });
});
