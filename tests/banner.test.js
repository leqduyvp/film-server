const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../server');
const secret = require('../config/jwtSecret');
const Banner = require('../database/Banner.model');

const { setupDatabase, bannerInit } = require('./banner.dataInit');
const { validAdminUser } = require('./users.dataInit');

const adminToken = jwt.sign({ id: validAdminUser._id, platform: 'web', accType: 0 }, secret);

beforeAll(setupDatabase);

test('Should get all banners', async () => {
  const response = await request(app).get('/api/banners')
    .send()
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
});

test('Should add new banner(action: link)', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', adminToken)
    .send({
      "image": "https://image.com/banner2",
      "action": "link",
      "payload": {
        "id": "3hjhu3h4u3h4u33uh",
        "title": "Biệt đội siêu anh hùng"
      }
    })
    .expect(201);
  expect(response.body.error.isError).toBeFalsy();
  const banner = Banner.find({ image: "https://image.com/banner2" });
  expect(banner).toBeTruthy();
});

test('Should add new banner(action: tag)', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', adminToken)
    .send({
      "image": "https://image.com/banner3",
      "action": "tag",
      "payload": {
        tag: 'marvel'
      }
    })
    .expect(201);
  expect(response.body.error.isError).toBeFalsy();
  const banner = Banner.find({ image: "https://image.com/banner3" })
  expect(banner).toBeTruthy();
});

test('Should not add new banner for false token', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', adminToken + '3')
    .send({
      "image": "https://image.com/banner2",
      "action": "link",
      "payload": {
        "id": "3hjhu3h4u3h4u33uh",
        "title": "Biệt đội siêu anh hùng"
      }
    })
    .expect(500);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should not add new banner with invalid information', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', adminToken)
    .send({})
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
  expect(response.body.error).toMatchObject({
    "isError": true,
    "errorMessage": {
      "image": "image must not be empty",
      "action": "action must not be empty",
      "payload": "payload must not be empty"
    }
  });
});

test('Should change invalid banner', async () => {
  const response = await request(app).patch('/api/banners')
    .set('access-token', adminToken)
    .query({ id: bannerInit._id.toString() })
    .send({
      image: 'image.com/newImage',
      action: 'tag',
      payload: {
        tag: 'Hell'
      }
    })
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
  const banner = await Banner.findById(bannerInit._id);
  expect(banner.action).toBe('tag');
});

test('Should not change banner with invalid token', async () => {
  const response = await request(app).patch('/api/banners')
    .query({ id: bannerInit._id.toString() })
    .set('access-token', adminToken + '3')
    .send({
      image: 'image.com/newImage',
      action: 'tag',
      payload: {
        tag: 'Hell'
      }
    });
  expect(response.body.error.isError).toBeTruthy();
});

test('Should not change banner with invalid id', async () => {
  const response = await request(app).patch('/api/banners')
    .set('access-token', adminToken)
    .send({
      image: 'image.com/newImage',
      action: 'tag',
      payload: {
        tag: 'Hell'
      }
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should not change banner with invalid update', async () => {
  const response = await request(app).patch('/api/banners')
    .set('access-token', adminToken)
    .query({ id: bannerInit._id.toString() })
    .send({
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should delete banner with correct id', async () => {
  const response = await request(app).delete('/api/banners')
    .set('access-token', adminToken)
    .query({ id: bannerInit._id.toString() })
    .send()
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
})

test('Should not delete banner with invalid id', async () => {
  const response = await request(app).delete('/api/banners')
    .set('access-token', adminToken)
    .query({ id: '123123123' })
    .send()
    .expect(500);
  expect(response.body.error.isError).toBeTruthy();
})

test('Should not delete banner with invalid token', async () => {
  const response = await request(app).delete('/api/banners')
    .set('access-token', adminToken + '3')
    .query({ id: bannerInit._id })
    .send();
  expect(response.body.error.isError).toBeTruthy();
})
