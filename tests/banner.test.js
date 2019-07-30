const request = require('supertest');

const app = require('../app');

const { setupDatabase } = require('./banner.dataInit');

// beforeAll(setupDatabase);

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('Should get all banners', async () => {
  const response = await request(app).get('/api/banners')
    .expect(200)
    .then(res => console.log('res'));
})