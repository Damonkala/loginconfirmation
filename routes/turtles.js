'use strict';

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/confirmed');

router.get('/', authMiddleware, function(req, res) {
  console.log(req.user)
  res.send('aofiejaoiefjioaejfioefj TURTLES oaiejf oaiwejf oaiwejf oaiejf oiaej f');
});

module.exports = router;
