var express = require("express");

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));
console.log("My server is running");

var socket = require("socket.io");

var io = socket(server);

let currentConnections = [];

io.sockets.on("connection", newConnection);

//Rashad code

function newConnection(socket) {
  socket.on("disconnect", function() {
    onDisconnect(socket);
  });
  console.log("new connection: " + socket.id);

  currentConnections.push(socket.id);
  sendAllPlayersTheirNumber();

  socket.on("mouse", mouseMsg);
 
  function mouseMsg(data) {
    socket.broadcast.emit("mouse", data);
    console.log(data);
  }
  socket.on("cherry", cherryMsg);
 
  function cherryMsg(data) {
    socket.broadcast.emit("cherry", data);
    console.log(data);
  }
  socket.on("move", moveMsg);
  
  function moveMsg(data) {
    socket.broadcast.emit("move", data);
  }

}

function onDisconnect(socket) {
  console.log(socket.id + " has disconnected");
  var index = currentConnections.indexOf(socket.id);
  if (index !== -1) {
    currentConnections.splice(index, 1);
  }
}

function sendAllPlayersTheirNumber() {
  for (let socketID of currentConnections) {
    io.to(socketID).emit("private", currentConnections.indexOf(socketID));
  }
}