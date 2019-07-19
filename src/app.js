const express = require('express');
const userRouter = require('./router/users.router');
const rateRouter = require('./router/rate.router');
require('./database/db.connection');

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/rate', rateRouter);

module.exports = app;