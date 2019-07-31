const express = require('express');
const router = new express.Router();
const userValid = require('../services/users.valid');
const userSave = require('../services/users.save');
const userLogin = require('../services/users.login');
const authToken = require('../services/token.auth');
const userLogout = require('../services/users.logout');
const getUserProfile = require('../services/users.getProfile');
const changeUserProfile = require('../services/users.changeProfile');
const getAllUser = require('../services/users.getAll');
const userDelete = require('../services/users.delete');
const getWatchedFilms = require('../services/users.getWatchedFilms');
const userActivate = require('../services/users.activate');
//Dang Ky
router.post('/register', userValid, userSave);

//Active
router.post('/activate', userActivate);

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
//router.get('/', authToken, getAllUser);

//Xoa user 
// trung id trong token = tu xoa
// hoac id trong token cua admin
//router.delete('/', authToken, userDelete);

//Lay phim da xem
//List phim tra theo mang object
router.get('/watchFilms', authToken, getWatchedFilms);

router.all('/*', (req, res) => {
  res.status(404).send({
    error: {
      isError: true,
      errorMessage: {
        server: 'Page not found'
      }
    }
  })
})

module.exports = router;
