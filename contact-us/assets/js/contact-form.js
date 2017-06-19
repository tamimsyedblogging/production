var URL = 'https://d5ot9ts2c4.execute-api.us-west-2.amazonaws.com/PROD'
 
$('#contact-form').click(function (event) {
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
      console.log('Success msg '+response.successMsg);

      console.log('Err : '+response.errorMessage);
      "undefined" === typeof response.successMsg
      
      if ("undefined" !== typeof response.successMsg)
      { 
         $('#contact-form').html('SUBMIT');
         $('#inputDisplayError').html(response.successMsg);
         $('#inputDisplaySuccess').css('display','block');
         $('#inputDisplayError').css('display','none');
         $('#inputName').val('');
         $('#inputEmail').val('');
         $('#inputMessage').val('');
       }    
      if ("undefined" !== typeof response.errorMessage)
       {
       $('#inputDisplaySuccess').css('display','none');
       $('#inputDisplayError').css('display','block');
         $('#inputDisplayError').html(response.errorMessage);
          $('#contact-form').html('SUBMIT');
       }
    },
    error: function (res) {

    }
  })
})