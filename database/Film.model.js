const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  title: {
    type: Object,
    required: true
  },
  supportedResolution: {
    type: Array,
    required: false,
    default: null
  },
  dateReleased: {
    type: Date,
    required: false,
    default: null
  },
  dateCreated: {
    type: Date,
    required: false,
    default: Date.now()
  },
  dateUpdated: {
    type: Date,
    required: false,
    default: Date.now()
  },
  category: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    requried: false,
    trim: true,
    lowercase: true,
    default: null
  },
  time: {
    type: Number,
    required: false,
    default: null
  },
  episodeNumber: {
    type: Number,
    required: true
  },
  imdb: {
    type: Number,
    required: false,
    default: null
  },
  scripts: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: true
  },
  characters: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    requried: false,
    trim: true,
    default: null
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  thumb: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: Array,
    required: true
  },
  links: {
    type: Array,
    required: true
  },
  ratingNumber: {
   type: Number,
   required: true,
   default: 0
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  tags: {
    type: Array,
    required: true
  },
  content: {
    type: String,
    require: false,
    default: null
  }
});

module.exports = Film = mongoose.model('film', FilmSchema);
