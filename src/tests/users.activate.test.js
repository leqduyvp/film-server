const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, notActivatedUser, validNormalUser } = require('./users.dataInit');
const { findUserById, findUserByCredentials, findUserOtp } = require('../database/users');
const app = require('../app').router;

beforeEach(setupDatabase);

test('Should activate for not activated user', async () => {
  const regisObject = {};
  for (let key in notActivatedUser) regisObject[key] = notActivatedUser[key];
  delete regisObject._id;
  delete regisObject.activated;
  regisObject.password = 'unactivated';

  const regisRes = await request(app).post('/users/register').send(regisObject);

  const otp = await findUserOtp(regisRes.body.userId);
  const response = await request(app).post('/users/activate')
    .query({ userId: regisRes.body.userId })
    .send({ otp })

    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
  const user = JSON.parse(await findUserById(regisRes.body.userId));
  expect(user.activated).toBeTruthy();
});

test('Should not activate for activated user', async () => {
  const response = await request(app).post('/users/activate')
    .query({ userId: validNormalUser._id.toHexString() })
    .send({ otp: '1234' })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
})
