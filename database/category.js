// Load Category model
const Category = require('../database/Category.model');

const getAllCategories = () => {
  return Category.find({});
}

const addCategory = (parentCategory, childrenCategories) => {
  const category = new Category({
    parentCategory,
    childrenCategories
  });

  return category.save();
}

const updateCategory = (id, parentCategory, childrenCategories) => {
  return Category.findByIdAndUpdate(id, {parentCategory, childrenCategories});
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