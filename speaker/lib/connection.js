var connection = exports; exports.constructor = function connection() {};

var io = require('socket.io');
var SoundManager = require('./sound_manager').SoundManager;

function Connection(host, port) {
  this.host = host;
  this.port = port;
  this.soundManager = new SoundManager();
}

Connection.prototype.listen = function() {
  this.io = io.listen(this.port);

  this.io.sockets.on(connection(socket) {
    this.sockets[socket.id] = socket;

    socket.on('note', function(data) {
      this.soundManager.sounds[socket.diatonic](data.note);
    });


  }.bind(this));
};

connection.Connection = Connection;
