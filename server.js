const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const redis = require('redis');
const cors = require('cors');

const { port } = require('./config/server.config');
const { dbURI } = require('./config/database.config');
const { client } = require('./service/redis.connection');

const categories = require('./router/category');
const banners = require('./router/banner');
const configs = require('./router/config');
const films = require('./router/film');
const users = require('./router/users.router');
const rates = require('./router/rate.router');


// Handle error
client.on('error', error => {
  console.log(error.message);
});

// Connect to Redis
client.on('connect', () => {
  console.log('Redis connected...');
});

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Database connected...'))
  .catch(error => console.log('Can not connect to database: ', error.message));

app.use('/api/categories', categories);
app.use('/api/banners', banners);
app.use('/api/configs', configs);
app.use('/api/films', films);
app.use('/api/users', users);
app.use('/api/rate', rates)
module.exports = app;
app.listen(port, () => console.log(`Server running on port: ${port}`));