const mongoose = require('mongoose');
const Category = require('../database/Category.model');

const cateInit = {
  _id: new mongoose.Types.ObjectId(),
  "childrenCategories": {
    "titles": ["Tâm lý", "Tình cảm", "Hành động"],
    "typeCategory": "type"
  },
  "parentCategory": {
    "title": "Thể loại",
    "typeCategory": "type"
  }
}

const databaseInit = async () => {
  await Category.deleteMany({});
  await new Category(cateInit).save();
}

module.exports = {
  databaseInit,
  cateInit
}