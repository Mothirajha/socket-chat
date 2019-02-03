let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

// app.get('/', function(req, res){
//     res.send("hello world");
// })

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        io.emit('chat message', "One user has left");
    })
})


http.listen(3001, function(){
    console.log('listening on *:3001');
});