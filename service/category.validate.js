const { checkString } = require('../utils/checkString');
const checkId = id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(id);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.id = 'id ' + err.message;

    return error;
  }

  return error;
}

const checkInput = (parentCategory, childrenCategories) => {
  let error = checkParentCategory(parentCategory);

  if (error.isError) {
    return error;
  }

  error = checkChildrenCategories(childrenCategories);
  if (error.isError) {
    return error;
  }

  return error;
}

const checkParentCategory = parentCategory => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  if (parentCategory === undefined || parentCategory === null) {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory is required';

    return error;
  }

  if (typeof parentCategory !== 'object') {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory must be an object';

    return error;
  }

  if (!parentCategory.hasOwnProperty('title')) {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory must has title property';

    return error;
  }

  if (!parentCategory.hasOwnProperty('typeCategory')) {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory must has typeCategory property';

    return error;
  }

  let err = checkString(parentCategory.title);
  if (err.isError) {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory.title ' + err.message;

    return error;
  }

  err = checkString(parentCategory.typeCategory);
  if (err.isError) {
    error.isError = true;
    error.errorMessage.parentCategory = 'parentCategory.typeCategory ' + err.message;

    return error;
  }

  return error;
}

const checkChildrenCategories = childrenCategories => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  if (childrenCategories === undefined || childrenCategories === null) {
    // Uncomment this to require childrenCategories
    // error.isError = true;
    // error.errorMessage.childrenCategories = 'childrenCategories is required';

    return error;
  }

  if (typeof childrenCategories !== 'object' || childrenCategories instanceof Array) {
    error.isError = true;
    error.errorMessage.childrenCategories = 'childrenCategories must be an object';

    return error;
  }

  if (!childrenCategories.hasOwnProperty('titles')) {
    error.isError = true;
    error.errorMessage.childrenCategories = 'childrenCategories must has titles property';

    return error;
  }

  if (!childrenCategories.hasOwnProperty('typeCategory')) {
    error.isError = true;
    error.errorMessage.childrenCategories = 'childrenCategories must has typeCategory property';

    return error;
  }

  let err = checkString(childrenCategories.typeCategory);
  if (err.isError) {
    error.isError = true;
    error.errorMessage.childrenCategories = 'childrenCategories.typeCategory ' + err.message;

    return error;
  }

  if (!(childrenCategories.titles instanceof Array)) {
    error.isError = true;
    error.errorMessage.childrenCategories = 'childrenCategories.titles must be an array';

    return error;
  }

  return error;
}

module.exports = {
  checkId,
  checkInput
}