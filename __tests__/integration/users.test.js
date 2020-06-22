process.env.NODE_ENV = 'test';

const app = require('../../app');
const db = require('../../db');
const request = require('supertest');

let currentUsername;

beforeEach(async function () {
  const response = await db.query(
    `INSERT INTO users (username, password, first_name, last_name, email)
      VALUES ('user1', '123456', 'test_first1', 'test_last1', 'test1@test.com'), ('user2', '123456', 'test_first2', 'test_last2', 'test2@test.com')
      RETURNING *`
  );

  currentUsername = response.rows[0].username;
});

afterEach(async function () {
  await db.query(`DELETE FROM users`);
});

afterAll(async function () {
  await db.end();
});

describe('GET /users', function () {
  test('gets a list of all users', async function () {
    let response = await request(app).get(`/users`);

    expect(response.statusCode).toBe(200);
    expect(response.body.users).toHaveLength(2);
    expect(response.body).toEqual({
      users: [
        {
          username: 'user1',
          first_name: 'test_first1',
          last_name: 'test_last1',
          email: 'test1@test.com',
        },
        {
          username: 'user2',
          first_name: 'test_first2',
          last_name: 'test_last2',
          email: 'test2@test.com',
        },
      ],
    });
  });

  test('Gets a list of 1 user', async function () {
    const response = await request(app).get('/users');
    expect(response.body.users[1]).toHaveProperty('last_name');
    expect(response.body.users[1]).not.toHaveProperty('password');
  });
});

describe('GET /users/:username', function () {
  test('Gets a single a user', async function () {
    const response = await request(app).get(`/users/${currentUsername}`);
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.user.username).toBe('user1');
  });

  test('Responds with a 404 if it cannot find the user in question', async function () {
    const response = await request(app).get(`/users/nouser`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /users', function () {
  test('Creates a new user', async function () {
    const response = await request(app).post('/users').send({
      username: 'newUser',
      first_name: 'New',
      password: 'foo123',
      last_name: 'User',
      email: 'new@email.com',
    });

    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      newUser: {
        username: 'newUser',
        first_name: 'New',
        password: 'foo123',
        last_name: 'User',
        email: 'new@email.com',
        photo_url: null,
      },
    });
  });

  test('Prevents creating a user with duplicate username', async function () {
    const response = await request(app).post('/users').send({
      username: 'user1',
      first_name: 'test_first1',
      password: '123445',
      last_name: 'test_last1',
      email: 'test1@test.com',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(
      'There aleady exists a user with username user1'
    );
  });

  test('Prevents creating a user without required password field', async function () {
    const response = await request(app).post('/users').send({
      username: 'test',
      first_name: 'Test',
      last_name: 'Tester',
      email: 'test@test.com',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual([
      'instance requires property "password"',
    ]);
  });
});

describe('PATCH /users/:username', async () => {
  test("Updates a single a user's first_name with a selective update", async function () {
    const response = await request(app)
      .patch(`/users/${currentUsername}`)
      .send({
        username: currentUsername,
        password: '123456',
        first_name: 'newName',
      });
    const user = response.body.user;

    expect(user).toHaveProperty('username');
    expect(user.first_name).toBe('newName');
    expect(user.username).not.toBe(null);
  });

  test("Updates a single a user's password", async function () {
    const response = await request(app)
      .patch(`/users/${currentUsername}`)
      .send({ username: currentUsername, password: 'foo12345' });

    const user = response.body.user;
    expect(user).toHaveProperty('username');
    expect(response.statusCode).toBe(200);
  });

  test('throws error if trying to update user that does not exist', async function () {
    let response = await request(app).patch(`/users/wrongUser`).send({
      username: 'nouser',
      first_name: 'userfirst',
      last_name: 'userlast',
      email: 'user@gmail.com',
      password: '1234',
    });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('There exist no user wrongUser');
  });

  test('Prevents a bad user update', async function () {
    const response = await request(app)
      .patch(`/users/${currentUsername}`)
      .send({ username: currentUsername, noValue: 'value' });
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toContain([
      'exists in instance when not allowed',
    ]);
  });
});

describe('DELETE /users/:username', async function () {
  test('Deletes a single a user', async function () {
    const response = await request(app).delete(`/users/${currentUsername}`);
    expect(response.body).toEqual({ message: 'User deleted' });
  });

  test('Responds with a 404 if it cannot find the user in question', async function () {
    const response = await request(app).delete(`/users/nouser`);
    expect(response.statusCode).toBe(404);
  });
});
