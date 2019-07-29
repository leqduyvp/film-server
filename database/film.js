// Loasd film model
const Film = require('../database/Film.model');
const { pageNumber, recordsNumber } = require('../config/film.config');

const getAllFilms = (page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  return Film
    .find({})
    .skip((page - 1) * records)
    .limit(records);
}

const addFilm = input => {
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
    ratingNumber: input.ratingNumber,
    views: input.views,
    tags: input.tags,
    content: input.content
  });

  return film.save();
}

const getFilmById = id => {
  return Film.findById(id);
}

const filterFilm = (input, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const fields = ['category', 'country', 'type'];
  let filters = {};

  fields.forEach(field => {
    if (input[field]) {
      // Make regex to ignore case
      filters[field] = new RegExp(input[field], 'i');
    }
  });

  let filterFilms = Film
    .find({
      '$where': `${input.year} ? this.dateReleased.getFullYear() == ${input.year} : /./`,
      ...filters
    })
    .skip((page - 1) * records)
    .limit(records);

  if (!input.arrange && input.arrange !== 0) {
    console.log('no sort')
    return filterFilms;
  }

  switch (input.arrange) {
    case 0:
      // Sort by dateCreated
      console.log('sort by dateCreate:');
      return filterFilms.sort({
        dateCreated: -1
      });

    case 1:
      // Sort by dateReleased
      console.log('sort by dateReleased:');
      return filterFilms.sort({
        dateReleased: -1
      });

    case 2:
      // Sort by title
      console.log('sort by title:');
      return filterFilms.sort({
        title: 1
      });

    case 3:
      // Sort by imdb
      console.log('sort by imdb:');
      return filterFilms.sort({
        imdb: -1
      });

    case 4:
      // Sort by views
      console.log('sort by views:');
      return filterFilms.sort({
        views: -1
      });

    case 5:
      //  Sort by ratingNumber
      console.log('sort by ratingNumber:');
      return filterFilms.sort({
        ratingNumber: -1
      })

    default:
      // Sort by title
      console.log('sort by title:');
      return filterFilms.sort({
        title: -1
      });
  }
}

const searchFilmByField = (input, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const { field, value } = input;
  const search = {};

  // Make regex to ignore case
  search[field] = new RegExp(value, 'i');

  return Film
    .find({
      ...search
    })
    .skip((page - 1) * records)
    .limit(records);
}

const deleteFilm = id => {
  return Film.findByIdAndRemove(id);
}

const searchFilm = (value, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  // Make regex to ignore case
  search = new RegExp(value, 'i');

  return Film
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
}

const getRelatedFilms = async (id, page = pageNumber, records = recordsNumber) => {
  page = Number.parseInt(page);
  records = Number.parseInt(records);

  const currentFilm = await Film.findById(id);

  const fields = ['tags', 'directors', 'characters'];
  const filter = [];

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

  return Film
    .find({
      $or: [
        ...filter
      ]
    })
    .skip((page - 1) * records)
    .limit(records);

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