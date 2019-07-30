const request = require('supertest');
const app = require('../server');
const Category = require('../database/Category.model');
const { databaseInit, cateInit } = require('./category.dataInit');

beforeAll(databaseInit);

test('Should get all categories', async () => {
  const response = await request(app).get('/api/categories')
    .send()
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
});

test('Should add new category', async () => {
  const response = await request(app).post('/api/categories')
    .set('access-token', 'Sua cho nay')
    .send({
      "childrenCategories": {
        "titles": ["Tâm lý", "Tình cảm", "Hành động"],
        "typeCategory": "type"
      },
      "parentCategory": {
        "title": "Thể loại",
        "typeCategory": "type"
      }
    })
    .expect(201);
  expect(response.body.error.isError).toBeFalsy();
  const category = await Category.find({
    "childrenCategories": {
      "titles": ["Tâm lý", "Tình cảm", "Hành động"],
      "typeCategory": "type"
    }
  });

  expect(category).toBeTruthy();
});

test('Should not add invalid category data', async () => {
  const response = await request(app).post('/api/categories')
    .set('access-token', 'Sua cho nay')
    .send({
      "childrenCategories": {
        "titles": ["Tâm lý", "Tình cảm", "Hành động"],
        "typeCategory": "type"
      },
      "parentCategory": {
      }
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should update category', async () => {
  const response = await request(app).patch('/api/categories')
    .query({ id: cateInit._id.toHexString() })
    .set('access-token', 'Sua cho nay')
    .send({
      "childrenCategories": {
        "titles": ["Tâm lý", "Tình cảm", "Hành động", "Action"],
        "typeCategory": "type"
      },
      "parentCategory": {
        "title": "Thể loại",
        "typeCategory": "type"
      }
    })
    .expect(200);
  expect(response.body.error.isError).toBeFalsy();
  const category = await Category.findById(cateInit._id);
  expect(category.childrenCategories.titles.includes('Action')).toBeTruthy();
});

test('Should not update invalid category data', async () => {
  const response = await request(app).patch('/api/categories')
    .set('access-token', 'Sua cho nay')
    .query({ id: cateInit._id.toHexString() })
    .send({
      "childrenCategories": {
        "titles": ["Tâm lý", "Tình cảm", "Hành động"],
        "typeCategory": "type"
      },
      "parentCategory": {
      }
    })
    .expect(400);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should not update invalid id category', async () => {
  const response = await request(app).patch('/api/categories')
    .set('access-token', 'Sua cho nay')
    .query({ id: '123123123' })
    .send({
      "childrenCategories": {
        "titles": ["Tâm lý", "Tình cảm", "Hành động"],
        "typeCategory": "type"
      },
      "parentCategory": {
        "title": "Thể loại",
        "typeCategory": "type"
      }
    })
    .expect(500);
  expect(response.body.error.isError).toBeTruthy();
});

test('Should delete category', async () => {
  const response = await request(app).delete('/api/categories')
    .query({ id: cateInit._id.toHexString() })
    .set('access-token', 'Sua cho nay')
    .send()
    .expect(200);

  expect(response.body.error.isError).toBeFalsy();
});

test('Should not delete category with invalid id', async () => {
  const response = await request(app).delete('/api/categories')
    .query({ id: '123123123' })
    .set('access-token', 'Sua cho nay')
    .send()
    .expect(500);
  expect(response.body.error.isError).toBeTruthy();
})
