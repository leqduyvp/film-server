const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, userRate, rateFilm } = require('./rate.dataInit');
const { getRateByFilmId } = require('../database/rate');
const app = require('../app');

beforeEach(setupDatabase);

const userToken = jwt.sign({ id: userRate._id, platform: 'web' }, secret, { expiresIn: '2h' });

test('Should rate film for user', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .set('access-token', userToken)
    .send({
      rate: 5
    })
    .expect(201);

  expect(response.body.error.isError).toBeFalsy();
  const newRate = await getRateByFilmId(rateFilm.filmId);
  expect(newRate.ratingNumber).toBe(5);
});

test('Should not rate film for invalid user', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .send()
    .expect(400);

  expect(response.body.error.isError).toBeTruthy();
});

test('Should not rate film with invalid rate(float rate)', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .set('access-token', userToken)
    .send({
      rate: 5.6
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    rate: 'Rate number is not an integer'
  });
});

test('Should not rate film with invalid rate(out of range)', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .set('access-token', userToken)
    .send({
      rate: 6
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error.errorMessage).toMatchObject({
    rate: 'Rate number is out of range [1 .. 5]'
  });
});