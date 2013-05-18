var connection = exports; exports.constructor = function connection() {};

var io = require('socket.io');
var SoundManager = require('./sound_manager').SoundManager;

function Connection(host, port) {
  this.host = host;
  this.port = port;
  // this.soundManager = new SoundManager();
  this.sockets = {};
}

Connection.prototype.listen = function() {
  console.log('port', this.port);
  this.io = io.listen(this.port);
  this.timer;

  this.io.sockets.on('connection', function(socket) {
    this.sockets[socket.id] = new SoundManager();

    socket.on('note', function(data) {
      if (!data.diatonic) return;

      if (this.timer) {
        console.log('clear timer');
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(function() {
        this.sockets[socket.id].sounds(data.diatonic, data.note);
        socket.emit('sound', data.note);
      }.bind(this), 100);
    }.bind(this));

    socket.on('change', function(data) {
      this.sockets[socket.id].change(data);
    }.bind(this));


  }.bind(this));
};

connection.Connection = Connection;
