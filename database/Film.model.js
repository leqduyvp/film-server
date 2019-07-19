const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const FilmSchema = new Schema({
  title: {
    type: Object,
    required: true
  },
  supportedResolution: {
    type: Array,
    required: false
  },
  dateReleased: {
    type: Date,
    required: false
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
    requried: false
  },
  time: {
    type: Number,
    required: false
  },
  episodeNumber: {
    type: Number,
    required: true
  },
  imdb: {
    type: Number,
    required: false
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
    requried: false
  },
  image: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    required: true
  },
  type: {
    type: Array,
    required: true
  },
  links: {
    type: Array,
    required: true
  },
  rating: {
    type: Object,
    required: true,
    ratingNumber: {
      type: Number,
      required: true
    },
    ratingId: {
      type: ObjectId,
      required: true
    }
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
  content: [{
    title: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    },
    paragraphs: {
      type: Array,
      required: false
    }
  }]
});

module.exports = Film = mongoose.model('film', FilmSchema);
