var connection = exports; exports.constructor = function connection() {};

var io = require('socket.io');
var SoundManager = require('./sound_manager').SoundManager;

function Connection(host, port) {
  this.host = host;
  this.port = port;
  this.soundManager = new SoundManager();
  this.sockets = {};
}

Connection.prototype.listen = function() {
  this.io = io.listen(this.port);

  this.io.sockets.on('connection', function(socket) {
    this.sockets[socket.id] = socket;

    socket.on('note', function(data) {
      this.soundManager.sounds[socket.diatonic](data.note);
    }.bind(this));


  }.bind(this));
};

connection.Connection = Connection;
