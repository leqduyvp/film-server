const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, validNormalUser } = require('./users.dataInit');
const app = require('../server');

beforeAll(setupDatabase);

test("Should get profile for authenticated user", async () => {
  const response = await request(app).get('/api/users/me')
    .set('access-token', jwt.sign({ id: validNormalUser._id, platform: 'web' }, secret, { expiresIn: '2h' }))
    .send()
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
  expect(response.body.user.password).toBeFalsy();
});

test('Should not get profile for unauthenticated user', async () => {
  const response = await request(app).get('/api/users/me')
    .send()
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
})