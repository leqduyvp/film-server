const express = require('express');
const router = new express.Router();
const userValid = require('../services/users.valid');
const userSave = require('../services/users.save');
const userLogin = require('../services/users.login');
//Dang Ky
router.post('/register', userValid, userSave);
//(req, res) => {
//   res.send({
//     error: {
//       isError: false,
//       errorMessage: {}
//     }
//   });
// });

//Dang nhap
router.post('/login', userLogin);
// (req, res) => {
//   res.send({
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDI1OWUzZjI3OGE4NjMzZ" +
//       "jRiYzg3MDQiLCJpYXQiOjE1NjI4MzE3MDF9.e58bXnXQGQg9d-ep6FJ5sFqseLPKeZzLhDzGAAnbBE4",
//     "error": { "isError": false, "errorMessage": {} }
//   });
// });

//Dang xuat
router.post('/logout', (req, res) => {
  res.send({
    error: {
      isError: false,
      errorMessage: {}
    }
  });
});

//Lay profile
router.get('/me', (req, res) => {
  res.send({
    "error": {
      "isError": false,
      "errorMessage": {}
    },
    "user": {
      "dateRegistered": "2019-07-10T08:13:40.824Z",
      "watchedFilms": null,
      "ratedFilms": [],
      "email": "nguyenxuanphuc@gmail.com",
      "name": "XuanPhuc",
      "accType": 2
    }
  });
});

//Sua profile
router.patch('/edit', (req, res) => {
  res.send({
    "error": {
      "isError": false,
      "errorMessage": {}
    }
  });
});

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
