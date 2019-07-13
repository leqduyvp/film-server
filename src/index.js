const app = require('./app');
const port = 3000 || process.env.PORT;

require('./database/db.connection');

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});