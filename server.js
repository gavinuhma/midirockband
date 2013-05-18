var Connection = require('./lib/connection').Connection;

var keypress = require('keypress');

var conn = new Connection('192.168.2.106', 6666);


function main() {
  conn.listen();

  keypress(process.stdin);
  var opts = {
    'key':44
  };

  // listen for the "keypress" event
  var drumMode = 0;
  process.stdin.on('keypress', function (ch, key) {

    console.log('helloooo', ch, key, arguments);
    //console.log('got "keypress"', key);

 //   if (key.name === '\') drumMode = 1 - drumMode;

    var action = {
      'a': conn.send.bind(conn, 'maj', opts.key),
      's': conn.send.bind(conn, 'min', opts.key + 2),
      'd': conn.send.bind(conn, 'min', opts.key + 4),
      'f': conn.send.bind(conn, 'maj', opts.key + 5),
      'g': conn.send.bind(conn, 'maj', opts.key + 7),
      'h': conn.send.bind(conn, 'min', opts.key + 9),
      'j': conn.send.bind(conn, 'dim', opts.key + 11),
      'k': conn.send.bind(conn, 'maj', opts.key + 12),

      'q': conn.send.bind(conn, 'note', 12 + opts.key),
      'w': conn.send.bind(conn, 'note', 12 + opts.key + 2),
      'e': conn.send.bind(conn, 'note', 12 + opts.key + 4),
      'r': conn.send.bind(conn, 'note', 12 + opts.key + 5),
      't': conn.send.bind(conn, 'note', 12 + opts.key + 7),
      'y': conn.send.bind(conn, 'note', 12 + opts.key + 9),
      'u': conn.send.bind(conn, 'note', 12 + opts.key + 11),
      'i': conn.send.bind(conn, 'note', 12 + opts.key + 12),

      'z': conn.config.bind(conn, 'octave', -12),
      'x': conn.config.bind(conn, 'octave', 12),
      'c': conn.config.bind(conn, 'program', -1),
      'v': conn.config.bind(conn, 'program', 1),
      'b': conn.config.bind(conn, 'key', -1),
      'n': conn.config.bind(conn, 'key', 1),
    };
    if (!!drumMode && drum[key.name]) {
//      return drum[key.name]();
    }

  //  if (!action[key.name]) return;

    action[key.name]();
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
}

main();

