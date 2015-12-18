'use strict';

$(document).ready(init);

function init() {
  $('#logout').click(logout);
  // $('#turtles').click(turtle);
}

function logout() {
  $.post('/users/logout')
  .done(function(){
    window.location.replace('/');
  });
}
// function turtle() {
//   $.get('turtles/')
//   $.setRequestHeader('Authorization', `Bearer ${res.cookie('token')}`)
//   .done(function(){
//     window.location.replace('/turtles');
//   });
// }
