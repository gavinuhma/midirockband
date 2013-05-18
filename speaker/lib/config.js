var config = exports; exports.constructor = function config() {};

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

config.load = function() {
  var conf = fs.readFileSync(path.join(__dirname, '/config/config.json'));
  conf = JSON.parse(conf);
  _.each(conf, function(value, key) {
    config[key] = value;
  });
};
