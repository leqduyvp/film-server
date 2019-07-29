const express = require('express');
const cors = require('cors');
// const userRouter = require('./router/users.router');
const rateRouter = require('./router/rate.router');

class App {
    constructor() {
        this.router = express();
        this.cache = require('./database/cache.connection');
    }
    databaseConnect() {
        require('./database/db.connection');
    }
}

const app = new App();

app.router.use(express.json());
app.router.use(cors());

app.databaseConnect();
// app.router.use('/users', userRouter);
app.router.use('/rate', rateRouter);

module.exports = app;