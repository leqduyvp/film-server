const makeKeyFilter = (input, page, records) => {
  const fields = ['category', 'arrange', 'country', 'type', 'year'];
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

  return key
}

module.exports = {
  makeKeyFilter
}