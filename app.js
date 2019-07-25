const express = require('express');
const mongoose = require('mongoose');

const bannerRouter = require('./router/banner');
const { dbTestURI } = require('./config/database.config');

mongoose.connect(dbTestURI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const app = express();

app.use(express.json());

app.use('/api/banners', bannerRouter);

module.exports = app;
