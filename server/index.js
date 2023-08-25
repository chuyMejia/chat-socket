'use strict'


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var cors = require('cors');



app.use(cors({ origin: '*' }));


app.use(express.static('client'));


app.get('/hola',function(req,res){

	//console.log('dddddddd');

	return res.status(200).send('hi');

});


var messages = [{
	id:1,
	text:'bienvedido al chat',
	nickname:'ADMINISTRADOR'
}];




io.on('connection', (socket) => {
	 const clientIpAddress = socket.handshake.address;
     console.log(`El nodo con IP ${clientIpAddress} se ha conectado.`);

  socket.emit('messages',messages);
  socket.on('add-message',function(data){
	messages.push(data);
	io.sockets.emit('messages',messages);


  });




});

server.listen(6677,function(){


	console.log('el servidor esta funcionando http://localhost:6677');
});
