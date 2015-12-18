'use strict';

var User = require('../models/user');
// var jwt = require('jwt-simple');

module.exports = function(req, res, next){
  if(!req.user.confirmed){
    return res.status(401).send({err: 'Must confirm account. Check yo email.'})
  } else {
    next();
  }
};
