const request = require('supertest');
const jwt = require('jsonwebtoken');

const secret = require('../config/jwtSecret');
const app = require('../server');
const { setupDatabase, validNormalUser, normalUserFilms, initFilm } = require('./users.dataInit');
const { getWatchedFilmsByUserId } = require('../database/watchedFilms');

const testUrl = '/api/users/watchFilms';
const userToken = jwt.sign({ id: validNormalUser._id, accType: 2, platform: 'web' }, secret);

beforeAll(setupDatabase);

test('Add a film to watchedFilms list', async () => {
  const response = await request(app).post(testUrl)
    .set('access-token', userToken)
    .send({ filmId: initFilm._id.toString() })
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
  const watchedFilms = JSON.parse(await getWatchedFilmsByUserId(validNormalUser._id));
  expect(watchedFilms.films.findIndex((film) => (film.id === initFilm._id.toString())) > -1).toBeTruthy();
})