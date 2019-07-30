const mongoose = require('mongoose');

const Banner = require('../database/Banner.model');

const bannerInit = new Banner({
  image: 'https://image.com/banner1',
  "action": "link",
  "payload": {
    "id": "3hjhu3h4u3h4u33uh",
    "title": "Biệt đội siêu anh hùng"
  }
});

const setupDatabase = async () => {
  try {
    console.log('Init db')
    await Banner.deleteMany({});
    await bannerInit.save();
  } catch (error) {
    console.log('Init test banner failed: ', error.message);
  }
}

module.exports = {
  setupDatabase,
  bannerInit
}