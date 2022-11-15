const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);




app.use(express.static('public'));
server.listen(3000, () => console.log('Servidor iniciado en 3000'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

let i =0

io.on('connection', function (socket) {
i = i+1
  console.log('socket_conectado',socket.id);
  io.emit('socket_conectado', 'Usuario ' + " " +  i + " " + 'conectado :D' + "  " + socket.id + "    "  + '<br>' );

  socket.on('disconnect', () => {
    console.log('socket_desconectado',socket.id);
    io.emit('socket_conectado', 'Usuario ' + " " +  i + " " + 'desconectado :(' + "  " + socket.id + "    " + '<br>' );

   /* io.emit('socket_desconectado', {texto: 'Usuario desconectado :(',
    id: socket.id,
    
  });
*/
  });
  
  socket.on('chat: mensaje', (data) =>{
    io.emit('chat:mensaje', data);
  });

  socket.on('chat:escribiendo', (usuario) =>{
    socket.broadcast.emit('chat:escribiendo', usuario);

  });

});
