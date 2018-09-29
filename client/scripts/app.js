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
var count = 0;
var friendList = []
app.renderMessage = function(message){
  count++;
  if(count === 1){
    $("#form_id").on("submit", app.handleSubmit);
  }
  for(var key in message.results){
    if(message.results[key].roomname){
      if(!message.results[key].roomname.includes('<')){
        if(message.results[key].text){
          if(!message.results[key].text.includes('<')){
            if(message.results[key].username){
              if(!message.results[key].username.includes('<')){ 
                var newMessage = ('<style> .userName{ color:blue }</style><div class=userName font:"blue" onclick=app.handleUsernameClick(\'' + message.results[key].username + '\') </div>' + message.results[key].username  + ' </div><div class=text> '+ message.results[key].text  +'</div><div>'+ message.results[key].roomname+ '</div><br>');
                $('#chats').append(newMessage);
              }
            }
          }
        }
      }
    }
   }
};
app.renderRoom = function(roomName){
  $('#roomSelect').append('<div class=room ' + roomName + '>');
};
app.handleUsernameClick = function(person){
  if(!friendList.includes(person) && person !== window.location.search.substring(window.location.search.indexOf('=')+1)){
    friendList.push(person)
  }
  console.log(friendList)
};
//.bind('click',app.handleUsernameClick)
app.handleSubmit = function(something){
  console.log(window.location.search.substring(window.location.search.indexOf('=')+1))
  something.preventDefault();
  var message = {
    username: window.location.search.substring(window.location.search.indexOf('=')+1),
    text: $('#form_id')[0][0].value,
    roomname: $('#form_id')[0][1].value
  };
  $("#form_id")[0].reset();
  //console.log($(something.target.form).val())
  app.send(message);
  app.clearMessages()
  app.fetch();
};
app.init();
