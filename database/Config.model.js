const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  values: {
    type: Array,
    required: true
  }
});

module.exports = Config = mongoose.model('config', ConfigSchema);