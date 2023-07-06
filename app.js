var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   res.sendFile('D:/socket_project/index.html');});
users = [];
io.on('connection', function(socket){
   console.log('A new user is connected');
   socket.on('setUsername', function(data){
      console.log(data);
      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is already exists or used before! Please try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});
http.listen(3000, function(){
   console.log('running on localhost:3000');
});