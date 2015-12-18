'use strict';

$(function(){
  $('#confirm').click(confirm);
})

function confirm(e) {
  e.preventDefault();

  var code = $('#sc').val();
  $.ajax({
    url: '/users/confirm',
    type: 'PUT',
    data: {code: code},
    success: function(){
      alert("You have confirmed your email!")
      window.location.replace('/');
    },
    error: function(err){
      console.log(err);
      console.log('hOi')
    }
  })
}
