// YOUR CODE HERE:
// YOUR CODE HERE:
var app = {}

app.init = function(){
  app.fetch();
  //window.setInterval(app.fetch,5000)

}
app.send = function(message){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log(data)
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
};
app.fetch = function(){
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  data: {order: '-createdAt'},
  contentType: 'application/json',
  success: function (data) {
    console.log(data)
    app.renderMessage(data)
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
};
app.clearMessages = function(){
  $('#chats').empty();
};
app.renderMessage = function(message){
  for(var key in message.results){
    $('#chats').prepend(('<div class=userName> ' + message.results[key].username  + ' </div><div class=text> '+ message.results[key].text  +'</div><div>'+ message.results[key].roomname+ '</div>'));
  }
  $('#main').prepend('<form method="post" name="form_name" id="form_id" class="form_class">\
    Username:<br>\
    <input class="username" type="text" name="username"><br>\
    Message:<br>\
    <input class="text" type="text" name="message"><br>\
    Roomname:<br>\
    <select name="lobbies">\
      <option value="lobby">Lobby</option>\
      <option value="new1">new1</option>\
      <option value="new2">new2</option>\
      <option value="new3">new3</option>\
    </select>\
    <br><br>\
    <input id="button" type="submit" value= "Submit">');
  $(document).delegate(".userName", "click", app.handleUsernameClick);
  $(document).delegate("#button","click", app.handleSubmit);
};
app.renderRoom = function(roomName){
  $('#roomSelect').append('<div class=room ' + roomName + '>');
};
app.handleUsernameClick = function(person){
  console.log(person.target.outerText);
};
//.bind('click',app.handleUsernameClick)
app.handleSubmit = function(something){
  something.preventDefault();
  var message = {
    username: 'STEVEN',
    text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    roomname: 'lobby'
  };
  console.log($(something.target.form).val())
  app.send(message);
  app.fetch();
};
app.init();
