const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, normalUserFilms, validNormalUser } = require('./users.dataInit');
const app = require('../server');

beforeAll(setupDatabase);

const userToken = jwt.sign({ id: validNormalUser._id, platform: 'web' }, secret, { expiresIn: '2h' });

test("Should get user's watched films", async () => {
  const response = await request(app).get('/api/users/watchFilms')
    .set('access-token', userToken)
    .send()
    .expect(200);

  expect(response.error.isError).toBeFalsy();
  response.body.watchedFilms.forEach((film) => {
    delete film._id
  });
  normalUserFilms.films.forEach((film) => {
    film.id = film.id.toHexString();
  });
  expect(response.body.watchedFilms).toEqual(normalUserFilms.films);
});

test("Should not get unauthenticated user's watched films", async () => {
  const response = await request(app).get('/api/users/watchFilms')
    .send()
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});