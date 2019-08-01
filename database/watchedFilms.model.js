const mongoose = require('mongoose');

const WatchedFilmsSchema = new mongoose.Schema({
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
      type: Object,
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

const WatchedFilms = mongoose.model('watchedFilms', WatchedFilmsSchema);
module.exports = WatchedFilms;