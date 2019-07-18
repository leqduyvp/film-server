const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  image: {
    type: String,
    required: true
  }
});

module.exports = Banner = mongoose.model('banner', BannerSchema);
