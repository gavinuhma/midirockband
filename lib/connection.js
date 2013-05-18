var connection = exports; exports.constructor = function connection() {};

var io = require('socket.io-client');

function Connection(host, port) {
  this.host = host;
  this.port = port;
  this.socket = null;
}

Connection.prototype.listen = function() {
  this.socket = io.connect('192.168.2.105:6666');
};

Connection.prototype.send = function(diatonic, note) {
  this.socket.emit('note', {diatonic: diatonic, note: note});
};

Connection.prototype.config = function(stat, diff) {
  this.socket.emit('change', {stat: stat, diff: diff});
};

Connection.prototype.done = function(action) {
  console.log('emitting done\n');
  this.socket.emit('done');
};

connection.Connection = Connection;
