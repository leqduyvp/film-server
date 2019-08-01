const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  ratingNumber: {
    type: Number,
    required: true
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    index: true,
    required: true
  },
  rates: [{
    rating: {
      type: Number,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }]
});

const Rate = mongoose.model('Rate', RateSchema);

module.exports = Rate;