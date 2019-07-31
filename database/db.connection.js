const mongoose = require('mongoose');
const dbURL = require('../config/dbURL.js');

mongoose.connect(dbURL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
});