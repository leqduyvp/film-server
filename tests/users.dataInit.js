const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const phone = require('phone');
const User = require('../database/users.model');
const WatchedFilms = require('../database/watchedFilms.model');
const Film = require('../database/Film.model');

const validNormalUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validUser@valid.com',
  name: 'validUser',
  password: bcrypt.hashSync('validuser', 8),
  phone: phone('0912345678', 'VNM')[0],
  accType: 2,
  activated: true
}

const normalUserFilms = {
  _id: new mongoose.Types.ObjectId(),
  userId: validNormalUser._id,
  films: [{
    id: new mongoose.Types.ObjectId(),
    title: { title_en: 'Shazam(2019)' },
    episodeNumber: 1,
    episodeNumberCurrent: 1,
    thumb: 'asdf'
  }]
}

const validAdminUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'validAdmin@valid.com',
  name: 'validAdmin',
  phone: phone('0934567890', 'VNM')[0],
  password: bcrypt.hashSync('validamin', 8),
  accType: 0,
  activated: true
}

const adminUserFilms = {
  _id: new mongoose.Types.ObjectId(),
  userId: validAdminUser._id,
  films: []
}

const notActivatedUser = {
  _id: new mongoose.Types.ObjectId(),
  email: 'unactivateduser@valid.com',
  name: 'unactivated',
  phone: phone('0974812323', 'VNM')[0],
  password: bcrypt.hashSync('unactivated', 8),
  accType: 2,
  activated: false
}

const notActivatedUserFilms = {
  _id: new mongoose.Types.ObjectId(),
  userId: notActivatedUser._id,
  films: []
}

const initFilm = {
  _id: new mongoose.Types.ObjectId(),
  "supportedResolution": [
    "1080p",
    "480p"
  ],
  "dateReleased": "2018-07-25T07:09:54.979Z",
  "dateCreated": "2018-07-25T07:09:54.979Z",
  "dateUpdated": "2018-07-25T07:09:54.979Z",
  "category": [
    "Phim chiếu rạp",
    "Phim Lẻ"
  ],
  "country": "mỹ",
  "time": 120,
  "imdb": 9,
  "scripts": [
    "Kelly Marcel",
    "Will Beall"
  ],
  "directors": [
    "Ruben Fleischer"
  ],
  "characters": [
    "Tom Hardy",
    "Michelle Williams",
    "Marcella Bragio"
  ],
  "trailer": null,
  "type": [
    "Kinh dị",
    "Khoa học viễn tưởng",
    "Hành động",
    "Giật gân"
  ],
  "links": [
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
    "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg"
  ],
  "ratingNumber": 3,
  "views": 4,
  "tags": [
    "Đông kiếm em",
    "Ai là người thương em",
    "Có em chờ",
    "Sóng gió"
  ],
  "content": "Nothing here",
  "_id": "5d395748346c09473803f683",
  "title": {
    "title_vn": "Chữ c đầu tiên nè",
    "title_en": "This is a film",
    "title_jp": "Venom"
  },
  "episodeNumber": 15,
  "description": "Venom 2018 với nội dung xoay quanh một phóng viên lành nghề, Eddie Brook (Tom Hardy) bắt đầu bí mật điều tra những hành vi tội phạm của Drake. Anh dần tìm cách cận và dần khám phá ra một bí mật khủng khiếp. Song, anh chàng đã vô tình nhiễm phải Symbiote vào cơ thể. Từ đây, Eddie bắt đầu sở hữu những siêu năng lực và nhân cách tàn bạo của Venom. Eddie phải trải qua sự biến đổi kinh hoàng cả về thể chất lẫn tinh thần và cùng lúc đó phải chiến đấu với sự truy đuổi gắt gao của Life Foundation.",
  "image": "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg",
  "thumb": "https://img.khoai.tv/images/movies/19984/bg_01_guh75412.jpg"
}

const setupDatabase = async () => {
  await User.deleteMany({});
  await WatchedFilms.deleteMany({});
  await Film.deleteMany({});
  await new User(validNormalUser).save();
  await new WatchedFilms(normalUserFilms).save();
  await new User(validAdminUser).save();
  await new WatchedFilms(adminUserFilms).save();
  await new User(notActivatedUser).save();
  await new WatchedFilms(notActivatedUserFilms).save();
  await new Film(initFilm).save();
}

module.exports = {
  setupDatabase,
  validAdminUser,
  validNormalUser,
  adminUserFilms,
  normalUserFilms,
  notActivatedUser,
  initFilm
}