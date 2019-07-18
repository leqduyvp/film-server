const mongoose = require('mongoose');

const watchedFilmsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  films: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    episodeNumber: {
      type: Number,
      required: true
    },
    episodeNumberCurrent: {
      type: Number,
      required: true
    },
    thumb: {
      type: String,
      required: true
    }
  }]
});

const watchedFilms = mongoose.model('watchedFilms', watchedFilmsSchema);
module.exports = watchedFilms;