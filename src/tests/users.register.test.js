const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, validAdminUser, validNormalUser } = require('./users.dataInit');
const { findUserByCredentials } = require('../database/users');
const app = require('../app');

beforeEach(setupDatabase);

test('Should sign up valid normal user', async () => {
  const response = await request(app).post('/users/register')
    .send({
      email: 'anhhung@gmail.com',
      name: 'anh Hung',
      password: 'anhhung123',
      phone: '0945417512',
      accType: 2
    })
    .expect(201);
  expect(response.body.error.isError).toBeFalsy();
  const user = await findUserByCredentials({email: 'anhhung@gmail.com', password: 'anhhung123'},  'email');
  expect(user.error).toBeFalsy();
});

test('Should not sign up invalid user 1', async () => {
  const response = await request(app).post('/users/register')
    .send({
      email: '@gmail.com',
      name: '',
      phone: '123',
      password: 'qwe'
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    email: 'Invalid email',
    name: 'Name is missing',
    password: 'Password is too short',
    accType: 'Invalid Account Type',
    phone: 'Invalid phone number'
  });
});

test('Should not sign up invalid user 2', async () => {
  const response = await request(app).post('/users/register')
    .send({
      email: validNormalUser.email,
      name: 'longlonglonglonglonglonglonglonglonglonglonglonglong',
      phone: '0912345678',
      password: '',
      accType: 2.3
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    email: 'Email used',
    name: 'Name is too long',
    password: 'Password is missing',
    accType: 'Invalid Account Type',
    phone: 'Phone number used'
  })
});

test('Should sign up valid admin user', async () => {
  const response = await request(app).post('/users/register')
    .set('access-token', jwt.sign({ id: validAdminUser._id, platform: 'web' }, secret, { expiresIn: '2h' }))
    .send({
      email: 'anhno@gmail.com',
      name: 'anh No',
      password: 'anhno123',
      phone: '0978546812',
      accType: 0
    })
    .expect(201);
  expect(response.body.error.isError).toBeFalsy();
  const user = await findUserByCredentials({email: 'anhno@gmail.com', password: 'anhno123'}, 'email');
  expect(user.error).toBeFalsy();
});

test('Should not sign up admin user with false token (wrong secret)', async () => {
  const response = await request(app).post('/users/register')
    .set('access-token', jwt.sign({ id: validAdminUser._id }, 'secret', { expiresIn: '2h' }))
    .send({
      email: 'anonymous@gmail.com',
      name: 'Anony',
      password: 'anonymous',
      phone: '0961458921',
      accType: 0
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Shoud not sign up admin user with false token (normal user)', async () => {
  const response = await request(app).post('/users/register')
    .set('access-token', jwt.sign({ id: validNormalUser._id, platform: 'web' }, secret, { expiresIn: '2h' }))
    .send({
      email: 'anonymous@gmail.com',
      name: 'Anony',
      password: 'anonymous',
      phone: '0961458921',
      accType: 0
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    accType: 'Cannot create admin account'
  });
})
