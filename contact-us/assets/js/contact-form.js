var URL = 'https://d5ot9ts2c4.execute-api.us-west-2.amazonaws.com/PROD'
 
$('#contact-form').submit(function (event) {
  event.preventDefault()
  $('#contact-form').html('Processing the form...');
  var data = {
    name: $('#inputName').val(),
    email: $('#inputEmail').val(),
    message: $('#inputMessage').val()
  }
 
  $.ajax({
    type: 'POST',
    url: URL,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function (response) {
       $('#contact-form').html('SUBMIT');
       $('#inputDisplayError').css('visibility','hidden');
       $('#inputName').val('');
       $('#inputEmail').val('');
       $('#inputMessage').val('');
    },
    error: function (res) {
      $('#inputDisplayError').css('visibility','visible');
      $('#inputDisplayError').html(res.text);
    }
  })
})
