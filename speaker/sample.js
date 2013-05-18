var Conn = require('./lib/connection').Connection;
var config = require('./lib/config');

config.load();

var conn = new Conn(config.host, config.port);
conn.listen();
