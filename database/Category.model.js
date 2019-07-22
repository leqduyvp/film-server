const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new Schema({
  // title: {
  //   type: String,
  //   required: true
  // },
  // type: {
  //   type: String,
  //   required: true
  // },
  // parentId: {
  //   type: ObjectId,
  //   required: true
  // }

  parentCategory: {
    title: {
      type: String,
      required: true
    },
    typeCategory: {
      type: String,
      required: true
    }
  },
  childrenCategories: {
    titles: {
      type: [String],
      required: false
    },
    typeCategory: {
      type: String,
      required: false
    }
  }
});

module.exports = Category = mongoose.model('category', CategorySchema);