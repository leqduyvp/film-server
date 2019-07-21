const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/jwtSecret');
const { findUserById } = require('../database/users');
const { setupDatabase, validNormalUser } = require('./users.dataInit');
const app = require('../app');

beforeEach(setupDatabase);

const userToken = jwt.sign({ id: validNormalUser._id, platform: 'web' }, secret, { expiresIn: '2h' });

test("Should update valid field", async () => {
  const response = await request(app).patch('/users/edit')
    .set('access-token', userToken)
    .send({
      name: 'newname',
      password: 'newpassword'
    })
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
  const user = JSON.parse(await findUserById(validNormalUser._id));
  expect(user.name).toEqual('newname');
  expect(bcrypt.compareSync('newpassword', user.password)).toBeTruthy();
});

test("Should not update unauthenticated user", async () => {
  const response = await request(app).patch('/users/edit')
    .send({
      name: 'newname',
      password: 'newpassword'
    })
    .expect(400);
  //console.log(response.body);
  expect(response.body.error.isError).toBeTruthy();
});

test("Should not update invalid field", async () => {
  const response = await request(app).patch('/users/edit')
    .set('access-token', userToken)
    .send({
      invalid: 'invalid'
    })
    .expect(400);
  //expect(response.body.error.isError).toBeTruthy();
});

test("Should not update invalid data", async () => {
  const response = await request(app).patch('/users/edit')
    .set('access-token', userToken)
    .send({
      name: '',
      password: '123'
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
})