const request = require('supertest');
const jwt = require('jsonwebtoken');
const secret = require('../config/jwtSecret');
const { setupDatabase, userRate, userRateInit, rateFilm } = require('./rate.dataInit');
const { getRateByFilmId } = require('../database/rate');
const app = require('../app').router;

beforeEach(setupDatabase);

const userToken = jwt.sign({ id: userRate._id, platform: 'web' }, secret, { expiresIn: '2h' });
const userRatedToken = jwt.sign({ id: userRateInit._id, platform: 'web' }, secret, { expiresIn: '2h' });

test('Should rate film for user', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .set('access-token', userToken)
    .send({
      rate: 3
    })
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
  const newRate = await getRateByFilmId(rateFilm.filmId);
  expect(newRate.ratingNumber).toBe(4);
});

test('Should change rate for rated user', async () => {
  const response = await request(app).post('/rate')
    .query({ filmId: rateFilm.filmId })
    .set('access-token', userRatedToken)
    .send({
      rate: 4
    })
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
  const newRate = await getRateByFilmId(rateFilm.filmId);
  expect(newRate.ratingNumber).toBe(4);
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