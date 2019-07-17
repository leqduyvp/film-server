const express = require('express');
const router = new express.Router();
const userValid = require('../services/users.valid');
const userSave = require('../services/users.save');
const userLogin = require('../services/users.login');
const authToken = require('../services/token.auth');
const userLogout = require('../services/users.logout');
const getUserProfile = require('../services/users.getProfile');
const changeUserProfile = require('../services/users.changeProfile');
//Dang Ky
router.post('/register', userValid, userSave);

//Dang nhap
router.post('/login', userLogin);

//Dang xuat
router.post('/logout', authToken, userLogout);

//Lay profile
router.get('/me', authToken, getUserProfile);

//Sua profile
router.patch('/edit', authToken, changeUserProfile);

//Lay tat ca users 
//Chi admin
router.get('/', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    },
    users: [{
      name: 'XuanPhuc',
      email: 'nguyenxuanphuc@gmail.com'
    },
    {
      name: 'PhuTrong',
      email: 'nguyenphutrong@gmail.com'
    }]
  });
});

//Xoa user 
// trung id trong token = tu xoa
// hoac id trong token cua admin
router.delete('/', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    }
  });
});

//Lay phim da xem
//List phim tra theo mang object
router.get('/watchFilms', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    },
    watchedFilms: []
  });
});

module.exports = router;
