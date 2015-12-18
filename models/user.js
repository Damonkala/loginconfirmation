'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var conf = Math.floor(Math.random()*90000) + 10000;

var User;
// Twilio Credentials
var accountSid = 'AC7f5aff252fbfb619877510a50882b0e9';
var authToken = '116db4eefdabc7d5c5e835f6004e34ed';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, required: true, default: false},
  phone: {type: String, required: true},
  code: {type: String}
});

userSchema.methods.token = function() {
  var payload = {
    username: this.username,
    _id: this._id
  };
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
};

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  var password = user.password;
  var phone = user.phone;
  User.findOne({username: username}, function(err, user){
    if(err || user) return cb(err || 'Username already taken.');
    bcrypt.genSalt(13, function(err1, salt) {
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        var code = conf.toString();
        newUser.code = code;
        newUser.phone = phone;
        newUser.username = username;
        newUser.password = hash;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
          client.messages.create({
            to: savedUser.phone,
          	from: "+14088161071",
            body: code,
          }, function(err, message) {
          	console.log(message.sid);
          });
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(inputUser, cb){
  User.findOne({username: inputUser.username}, function(err, dbUser) {
    if(err || !dbUser) return cb(err || 'Incorrect username or password.');
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
      if(err || !isGood) return cb(err || 'Incorrect username or password.');
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
