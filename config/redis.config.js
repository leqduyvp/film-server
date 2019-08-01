module.exports = {
  // Connection configs
  redisPort: process.env.REDIS_PORT || 6379,
  redisHost: '127.0.0.1',
  redisConnectTimeout: 60000,               // miliseconds

  limitedPagesCache: 10,                     // The number of pages cached

  // Custom configs
  timeoutAllBanners: 10,           // seconds
  timeoutAllCategories: 10,        // seconds
  timeoutAllConfigs: 10,     // seconds
  timeoutFilmsCategory: 10,                 // seconds
  timeoutFilterFilms: 10,                   // seconds
  timeoutSearchFilmByField: 10,             // seconds
  timeoutAllFilms: 10,                      // seconds
  timeoutSearchFilm: 10,                    // seconds
  timeoutRelatedFilms: 10,                  // seconds

  // Total films
  timeoutTotalAllFilms: 10,                  // seconds
  timeoutTotalFilterFilms: 10,               // seconds
  timeoutTotalSearchFilmsByField: 10,        // seconds
  timeoutTotalSeachFilms: 10,                // seconds
  timeoutTotalRelatedFilms: 10               // seconds
}