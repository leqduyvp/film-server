// Loasd film model
const Film = require('../database/Film.model');
const Rate = require('./rate.model');
const { pageNumber, recordsNumber } = require('../config/film.config');
const {
  setTotalAllFilmsToCache,
  getTotalAllFilmsFromCache,
  setTotalFilterFilmsToCache,
  getTotalFilterFilmsFromCache,
  setTotalSearchFilmsByFieldToCache,
  getTotalSearchFilmsByFieldFromCache,
  setTotalSearchFilmsToCache,
  getTotalSearchFilmsFromCache,
  setTotalRelatedFilmsToCache,
  getTotalRelatedFilmsFromCache

} = require('../service/film.cache');

const getAllFilms = async (page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  // Get total records in cache
  totalRecords = await getTotalAllFilmsFromCache();

  if (!totalRecords && totalRecords !== 0) {
    // Get total records in db
    totalRecords = await Film.countDocuments({});

    // Set total records to cache
    setTotalAllFilmsToCache(totalRecords);
  }

  const films = await Film
    .find({})
    .skip((page - 1) * records)
    .limit(records);

  return {
    films,
    totalRecords
  }
}

const addFilm = async input => {
  const film = new Film({
    title: input.title,
    supportedResolution: input.supportedResolution,
    dateReleased: input.dateReleased,
    dateCreated: input.dateCreated,
    dateUpdated: input.dateUpdated,
    category: input.category,
    country: input.country,
    time: input.time,
    episodeNumber: input.episodeNumber,
    imdb: input.imdb,
    scripts: input.scripts,
    directors: input.directors,
    characters: input.characters,
    description: input.description,
    trailer: input.trailer,
    image: input.image,
    thumb: input.thumb,
    type: input.type,
    links: input.links,
    tags: input.tags,
    content: input.content
  });

  const rate = new Rate({
    filmId: film._id,
    ratingNumber: 0
  });

  try {
    await rate.save();
  } catch (error) {
    console.log(error.message);
  }

  return film.save();
}

const getFilmById = id => {
  return Film.findById(id);
}

const filterFilm = async (input, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const fields = ['category', 'country', 'type'];
  let query = {};
  let where = null;
  let totalRecords = 0;
  let sort = {};

  fields.forEach(field => {
    if (input[field]) {
      // Make regex to ignore case
      query[field] = new RegExp(input[field], 'i');
    }
  });

  where = input.year ? `this.dateReleased.getFullYear() == ${input.year}` : `/./`;

  // Get total records in cache
  totalRecords = await getTotalFilterFilmsFromCache(input);

  if (!totalRecords && totalRecords !== 0) {
    // Get total records in db
    totalRecords = await Film.count({
      ...query,
      $where: where
    });

    // Set total records to cache
    setTotalFilterFilmsToCache(input, totalRecords);
  }

  switch (input.arrange) {
    case 0:
      // Sort by dateCreated
      console.log('sort by dateCreate:');
      sort = { dateCreated: -1 };
      break;

    case 1:
      // Sort by dateReleased
      console.log('sort by dateReleased:');
      sort = { dateReleased: -1 };
      break;

    case 2:
      // Sort by title
      console.log('sort by title:');
      sort = { title: 1 };
      break;

    case 3:
      // Sort by imdb
      console.log('sort by imdb:');
      sort = { imdb: -1 };
      break;

    case 4:
      // Sort by views
      console.log('sort by views:');
      sort = { views: -1 };
      break;

    case 5:
      //  Sort by ratingNumber
      console.log('sort by ratingNumber:');
      sort = { ratingNumber: -1 };
      break;

    default:
      // Sort by title
      console.log('sort by title:');
      sort = { title: -1 };
  }

  let films = await Film
    .find({
      ...query,
      $where: where
    })
    .sort({ ...sort })
    .skip((page - 1) * records)
    .limit(records);

  return {
    films,
    totalRecords
  };
}

const searchFilmByField = async (input, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const { field, value } = input;
  let query = {};
  let totalRecords = 0;

  // Make regex to ignore case
  query[field] = new RegExp(value, 'i');

  // Get total records in cache
  totalRecords = await getTotalSearchFilmsByFieldFromCache(input);

  if (!totalRecords && totalRecords !== 0) {
    // Get total records in db
    totalRecords = await Film.countDocuments({
      ...query
    });

    // Set total records to cache
    setTotalSearchFilmsByFieldToCache(input, totalRecords);
  }

  const films = await Film
    .find({
      ...query
    })
    .skip((page - 1) * records)
    .limit(records);

  return {
    films,
    totalRecords
  }
}

const deleteFilm = id => {
  return Film.findByIdAndRemove(id);
}

const searchFilm = async (input, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  // Make regex to ignore case
  search = new RegExp(input.value, 'i');

  let totalRecords = 0

  // Get total records in cache
  totalRecords = await getTotalSearchFilmsFromCache(input);

  if (!totalRecords && totalRecords !== 0) {
    // Get total records in db
    totalRecords = await Film.countDocuments({
      $or: [
        { "title.title_vn": search },
        { "title.title_en": search },
        { directors: search },
        { characters: search },
        { tags: search }
      ]
    });

    // Set total records to cache
    setTotalSearchFilmsToCache(input, totalRecords);
  }

  const films = await Film
    .find({
      $or: [
        { "title.title_vn": search },
        { "title.title_en": search },
        { directors: search },
        { characters: search },
        { tags: search }
      ]
    })
    .skip((page - 1) * records)
    .limit(records);

  return {
    films,
    totalRecords
  }
}

const getRelatedFilms = async (id, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const currentFilm = await Film.findById(id);

  // const fields = ['tags', 'directors', 'characters'];
  const fields = ['tags'];
  let filter = [];
  let totalRecords = 0;

  fields.forEach(field => {
    const key = currentFilm[field];
    if (key) {
      key.forEach(value => {
        let temp = {};

        // Make regex to ignore case
        temp[field] = new RegExp(value, 'i');
        filter.push({ ...temp });
      });
    }
  });

  // Get total records in cache
  totalRecords = await getTotalRelatedFilmsFromCache(id);

  if (!totalRecords && totalRecords !== 0) {
    // Get total records in db
    totalRecords = await Film.countDocuments({
      $or: [
        ...filter
      ]
    });

    // Set total records to cache
    setTotalRelatedFilmsToCache(id, totalRecords);
  }

  const films = await Film
    .find({
      $or: [
        ...filter
      ]
    })
    .skip((page - 1) * records)
    .limit(records);

  return {
    films,
    totalRecords
  }
}

module.exports = {
  getAllFilms,
  addFilm,
  getFilmById,
  filterFilm,
  searchFilmByField,
  searchFilm,
  deleteFilm,
  getRelatedFilms
}