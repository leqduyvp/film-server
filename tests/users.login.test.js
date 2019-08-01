const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, notActivatedUser, validNormalUser } = require('./users.dataInit');
const app = require('../server');

beforeAll(setupDatabase);

test('Should log in for valid user with email', async () => {
  const response = await request(app).post('/api/users/login')
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

test('Should log in for valid user with phone', async () => {
  const response = await request(app).post('/api/users/login')
    .send({
      phone: '0912345678',
      password: 'validuser',
    })
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
  expect(response.body.accessToken).toBeTruthy();
  const token = response.body.accessToken;
  expect(jwt.verify(token, secret).id.toString()).toEqual(validNormalUser._id.toString());
});

test('Should not log in with wrong credentials(password) ', async () => {
  const response = await request(app).post('/api/users/login')
    .send({
      email: validNormalUser.email,
      password: 'invaliduser'
    })
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    credentials: 'Wrong credentials'
  });
});

test('Should not log in with wrong credentials(email) ', async () => {
  const response = await request(app).post('/api/users/login')
    .send({
      email: 'invaliduser@valid.com',
      password: 'validuser'
    })
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    credentials: 'User invalid'
  });
});

test('Should not log in with wrong credentials(phone) ', async () => {
  const response = await request(app).post('/api/users/login')
    .send({
      phone: '0961458641',
      password: 'validuser'
    })
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    credentials: 'User invalid'
  });
});

test('Should not log in not activated account', async () => {
  const response = await request(app).post('/api/users/login')
    .send({
      email: notActivatedUser.email,
      password: 'unactivated'
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.userId).toEqual(notActivatedUser._id.toString());
});
