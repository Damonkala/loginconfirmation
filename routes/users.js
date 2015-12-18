'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var conf = Math.floor(Math.random()*90000) + 10000;
// USERS

// register a new user
router.post('/register', function(req, res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});
router.put('/confirm', function(req, res) {
  User.findOneAndUpdate({code: req.body.code}, {$set:{confirmed: true, code: null} },
    function(err, data){
      console.log(data);
    })
});
router.put('/reset', function(req, res) {
  User.findOneAndUpdate({phone: req.body.phone}, {$set:{code: conf} },
    function(err, data){
      console.log(data);
    })
});

router.post('/login', function(req, res) {
  User.authenticate(req.body, function(err, user){
    // res.setRequestHeader('Authorization', `Bearer ${token}`)

    if(err || !user) {
      res.status(400).send(err);
    } else {
      var token = user.token();
      console.log('token:', token);
      // res.setRequestHeader('Authorization', `Bearer ${token}`)
      res.cookie('token', token);
      res.send(user);
    }
  });
});

router.post('/logout', function(req, res) {
  res.clearCookie('username');
  res.clearCookie('userId');
  res.clearCookie('token');
  res.send();
})

module.exports = router;
