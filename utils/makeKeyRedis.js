const makeKey = (input, page, records, fields) => {
  let key = '';

  fields.forEach(field => {
    if (input[field]) {
      key += field + '|' + input[field].toString().trim().toLowerCase() + '/';
    } else {
      key += field + '|' + input[field] + '/';
    }
  });

  key += 'page' + '|' + page + '/';
  key += 'records' + '|' + records;

  return key;
}

module.exports = {
  makeKey
}