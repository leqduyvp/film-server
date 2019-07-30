const request = require('supertest');

const app = require('../app');
const Banner = require('../database/Banner.model');

const { setupDatabase, bannerInit } = require('./banner.dataInit');

beforeAll(setupDatabase);

test('Should get all banners', async () => {
  const response = await request(app).get('/api/banners')
    .send()
    .expect(200);
});

test('Should add new banner(action: link)', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', 'Sua cho nay')
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
    .set('access-token', 'Sua cho nay')
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

test('Should not add new banner with invalid information', async () => {
  const response = await request(app).post('/api/banners')
    .set('access-token', 'Sua cho nay')
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
    .set('access-token', 'Sua cho nay')
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

test('Should not change banner with invalid id', async () => {
  const response = await request(app).patch('/api/banners')
    .set('access-token', 'Sua cho nay')
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
    .set('access-token', 'Sua cho nay')
    .query({ id: bannerInit._id.toString() })
    .send({
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should delete banner with correct id', async () => {
  const response = await request(app).delete('/api/banners')
    .set('access-token', 'Sua cho nay')
    .query({ id: bannerInit._id.toString() })
    .send()
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
})

test('Should not delete banner with invalid id', async () => {
  const response = await request(app).delete('/api/banners')
    .set('access-token', 'Sua cho nay')
    .query({ id: '123123123' })
    .send()
    .expect(500);
  expect(response.body.error.isError).toBeTruthy();
})
