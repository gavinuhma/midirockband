var coremidi = require('coremidi');
var keypress = require('keypress');
keypress(process.stdin);
keypress.enableMouse(process.stdout);
process.stdin.setRawMode(true);
process.stdin.resume();

var opts = {
  'key':44,
  'bank':1,
  'program':33,
  'rest':0,
  'octave':0
};

function createMidi() {
  return require('midi-api')().bank(opts.bank).program(opts.program).rest(opts.rest);
}

function endMidi(midi, rest) {
  midi.rest(rest || 1000);
  midi.noteOff();
  midi.pipe(coremidi());
}

function note(root) {
  console.log('play note');
  var midi = createMidi();  
  midi.noteOff().noteOn(root);
  endMidi(midi, 500);
}

function maj(root) {
  console.log('play maj');
  var midi = createMidi();  
  midi.noteOff().noteOn(root).noteOn(root + 4).noteOn(root + 7);
  endMidi(midi);
}

function maj7(root) {
  console.log('play maj7');
  var midi = createMidi();  
  midi.noteOff().noteOn(root).noteOn(root + 4).noteOn(root + 7).noteOn(root + 11);
  endMidi(midi);
}

function min(root) {
  console.log('play min');
  var midi = createMidi();  
  midi.noteOff().noteOn(root).noteOn(root + 3).noteOn(root + 7);
  endMidi(midi);
}

function dim(root) {
  console.log('play dim');
  var midi = createMidi();  
  midi.noteOff().noteOn(root).noteOn(root + 3).noteOn(root + 6);
  endMidi(midi);
}

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

  if (key.name == 'q') note(opts.octave + opts.key);
  if (key.name == 'w') note(opts.octave + opts.key + 2);
  if (key.name == 'e') note(opts.octave + opts.key + 4);
  if (key.name == 'r') note(opts.octave + opts.key + 5);
  if (key.name == 't') note(opts.octave + opts.key + 7);
  if (key.name == 'y') note(opts.octave + opts.key + 9);
  if (key.name == 'u') note(opts.octave + opts.key + 11);
  if (key.name == 'i') note(opts.octave + opts.key + 12);

  if (key.name == 'z') {
    opts.octave -= 12;
    console.log('octave', opts.octave);
  }
  if (key.name == 'x') {
    opts.octave += 12;
    console.log('octave', opts.octave);
  }
  if (key.name == 'c') {
    opts.program -= 1;
    console.log('program', opts.program);
  }
  if (key.name == 'v') {
    opts.program += 1;
    console.log('program', opts.program);
  }
  if (key.name == 'b') {
    opts.key -= 1;
    console.log('key', opts.key);
  }
  if (key.name == 'n') {
    opts.key += 1;
    console.log('key', opts.key);
  }
});

process.stdin.on('mousepress', function (info) {
  console.log('got "mousepress" event at %d x %d', info.x, info.y);
});

process.on('exit', function () {
  // disable mouse on exit, so that the state
  // is back to normal for the terminal
  keypress.disableMouse(process.stdout);
});

