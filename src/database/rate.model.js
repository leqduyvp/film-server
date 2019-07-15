const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  ratingNumber: {
    type: Number,
    required: true
  },
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rate: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }]
});

const Rate = mongoose.model('Rate', RateSchema);

module.exports = Rate;