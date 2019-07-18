module.exports = {
  // Connection configs
  redisPort: process.env.REDIS_PORT || 6379,
  redisHost: '127.0.0.1',
  redisConnectTimeout: 60000,               // miliseconds

  // Custom configs
  timeoutAllBanners: 6 * 60 * 60,           // seconds
  timeoutAllCategories: 6 * 60 * 60,        // seconds
  timeoutAllConfigs: 10 * 24 * 60 * 60      // seconds
}