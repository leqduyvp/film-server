const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, validAdminUser, validNormalUser } = require('./users.dataInit');
const app = require('../app');

beforeEach(setupDatabase);

test('Should log in for valid user', async () => {
  const response = await request(app).post('/users/login')
    .send({
      email: validNormalUser.email,
      password: 'validuser',
    })
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
  expect(response.body.accessToken).toBeTruthy();
  const token = response.body.accessToken;
  expect(jwt.verify(token, secret).id.toString()).toEqual(validNormalUser._id.toString());
});

test('Should not log in for wrong credentials', async () => {
  const response = await request(app).post('/users/login')
    .send({
      email: validNormalUser.email,
      password: 'invaliduser'
    })
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    credentials: 'Wrong email or password'
  });
});

test('Should not log in for invalid user', async () => {
  const response = await request(app).post('/users/login')
    .send({
      email: 'anonymous@gmail.com',
      password: 'anonymous'
    })
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    credentials: 'User invalid'
  });
});