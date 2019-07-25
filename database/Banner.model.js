const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  image: {
    type: String,
    require: true,
    trim: true
  },
  action: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  payload: {
    type: Object,
    required: true
  }
});

module.exports = Banner = mongoose.model('banner', BannerSchema);
