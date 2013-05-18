var coremidi = require('coremidi');
var opts = {
  'key':44,
  'bank':1,
  'program':1,
  'rest':0,
  'octave':0
};

var soundManager = exports; exports.constructor = function soundManager() {};

function SoundManager() {
}

function createMidi() {
  return require('midi-api')().bank(opts.bank).program(opts.program).rest(opts.rest);
}

function endMidi(midi, rest) {
  midi.rest(rest || 1000);
  midi.noteOff();
  midi.pipe(coremidi());
}

SoundManager.prototype.sounds = {
  'note': function(note) {
    console.log('note', note);
    var root = note;
    var midi = createMidi();  
    midi.noteOff().noteOn(root);
    endMidi(midi, 500);
  },

  'maj': function(note) {
    console.log('maj', note);
    var root = note;
    var midi = createMidi();  
    midi.noteOff().noteOn(root).noteOn(root + 4).noteOn(root + 7);
    endMidi(midi, 500);
  },

  'min': function(note) {
    console.log('min', note);
    var root = note;
    var midi = createMidi();  
    midi.noteOff().noteOn(root).noteOn(root + 4).noteOn(root + 7).noteOn(root + 11);
    endMidi(midi, 500);
  },

  'dim': function(note) {
    console.log('dim', note);
    var root = note;
    var midi = createMidi();  
    midi.noteOff().noteOn(root).noteOn(root + 3).noteOn(root + 6);
    endMidi(midi, 500);
  }
};

soundManager.SoundManager = SoundManager;
