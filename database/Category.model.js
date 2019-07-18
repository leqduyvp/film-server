const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  key: {
    type: String,
    required: true
  },
  values: {
    type: Array,
    required: false
  }
});

module.exports = Category = mongoose.model('category', CategorySchema);