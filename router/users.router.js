const express = require('express');
const router = new express.Router();
const userValid = require('../service/users.valid');
const userSave = require('../service/users.save');
const userLogin = require('../service/users.login');
const authToken = require('../service/token.auth');
const userLogout = require('../service/users.logout');
const getUserProfile = require('../service/users.getProfile');
const changeUserProfile = require('../service/users.changeProfile');
const getAllUser = require('../service/users.getAll');
const userDelete = require('../service/users.delete');
const addWatchedFilms = require('../service/users.addWatchedFilms');
const getWatchedFilms = require('../service/users.getWatchedFilms');
const userActivate = require('../service/users.activate');
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
router.post('/watchFilms', authToken, addWatchedFilms)

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
