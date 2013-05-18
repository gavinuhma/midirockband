var keypress = require('keypress');
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
  if (key.name == 'a') maj(opts.key);
  if (key.name == 's') min(opts.key + 2);
  if (key.name == 'd') min(opts.key + 4);
  if (key.name == 'f') maj(opts.key + 5);
  if (key.name == 'g') maj(opts.key + 7);
  if (key.name == 'h') min(opts.key + 9);
  if (key.name == 'j') dim(opts.key + 11);
  if (key.name == 'k') maj(opts.key + 12);

  if (key.name == 'q') note(12 + opts.key);
  if (key.name == 'w') note(12 + opts.key + 2);
  if (key.name == 'e') note(12 + opts.key + 4);
  if (key.name == 'r') note(12 + opts.key + 5);
  if (key.name == 't') note(12 + opts.key + 7);
  if (key.name == 'y') note(12 + opts.key + 9);
  if (key.name == 'u') note(12 + opts.key + 11);
  if (key.name == 'i') note(12 + opts.key + 12);
});

process.stdin.on('mousepress', function (info) {
  console.log('got "mousepress" event at %d x %d', info.x, info.y);
});

process.on('exit', function () {
  // disable mouse on exit, so that the state
  // is back to normal for the terminal
  keypress.disableMouse(process.stdout);
});

