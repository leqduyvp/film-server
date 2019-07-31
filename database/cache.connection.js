const redis = require('redis');
const bluebird = require('bluebird');
const auth = require('../config/redis.password');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
client.auth(auth);

module.exports = client;