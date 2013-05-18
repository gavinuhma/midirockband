var connection = exports; exports.constructor = function connection() {};

var io = require('socket.io-client');

function Connection(host, port) {
  this.host = host;
  this.port = port;
  this.socket = null;
}

Connection.prototype.listen = function() {
  this.socket = io.connect('192.168.2.106:6666');
};

Connection.prototype.send = function(diatonic, note) {
  this.socket.emit('note', {diatonic: diatonic, note: note});
};

connection.Connection = Connection;
