// Load Category model
const Category = require('../database/Category.model');

const getAllCategories = () => {
  return Category.find({});
}

const addCategory = (key, values) => {
  const category = new Category({ key, values });
  return category.save();
}

const updateCategory = (id, key, values) => {
  return Category.findByIdAndUpdate(id, {key, values});
}

const deleteCategory = id => {
  return Category.findByIdAndRemove(id);
}

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
}