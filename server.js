var Connection = require('./lib/connection').Connection;

var keypress = require('keypress');

var conn = new Connection('192.168.2.106', 6666);


function main() {
  conn.listen();

  keypress(process.stdin);
  keypress.enableMouse(process.stdout);
  process.stdin.setRawMode(true);
  process.stdin.resume();

  var opts = {
    'key':44
  };

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    //console.log('got "keypress"', key);
    if (key && key.ctrl && key.name == 'c') {
      process.stdin.pause();
    }

    var action = {
      'a': conn.send.bind(conn, 'maj', opts.key),
      's': conn.send.bind(conn, 'min', opts.key + 2),
      'd': conn.send.bind(conn, 'min', opts.key + 4),
      'f': conn.send.bind(conn, 'maj', opts.key + 5),
      'g': conn.send.bind(conn, 'maj', opts.key + 7),
      'h': conn.send.bind(conn, 'min', opts.key + 9),
      'j': conn.send.bind(conn, 'dim', opts.key + 11),
      'k': conn.send.bind(conn, 'maj', opts.key + 12)

      'q': conn.send.bind(conn, 'note', 12 + opts.key);
      'w': conn.send.bind(conn, 'note', 12 + opts.key + 2);
      'e': conn.send.bind(conn, 'note', 12 + opts.key + 4)
      'r': conn.send.bind(conn, 'note', 12 + opts.key + 5)
      't': conn.send.bind(conn, 'note', 12 + opts.key + 7)
      'y': conn.send.bind(conn, 'note', 12 + opts.key + 9)
      'u': conn.send.bind(conn, 'note', 12 + opts.key + 11)
      'i': conn.send.bind(conn, 'note', 12 + opts.key + 12)
    };

  if (!action[key.name]) return;

  action[key.name]();

  process.stdin.on('mousepress', function (info) {
    console.log('got "mousepress" event at %d x %d', info.x, info.y);
  });

  process.on('exit', function () {
    // disable mouse on exit, so that the state
    // is back to normal for the terminal
    keypress.disableMouse(process.stdout);
  });
}

main();

