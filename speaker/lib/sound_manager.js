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
    var midi = createMidi();  
    midi.noteOff().noteOn(note);
    endMidi(midi, 500);
  },

  'maj': function(note) {
    console.log('maj', note);
    var midi = createMidi();  
    midi.noteOff().noteOn(note).noteOn(note + 4).noteOn(note + 7);
    endMidi(midi, 500);
  },

  'min': function(note) {
    console.log('min', note);
    var midi = createMidi();  
    midi.noteOff().noteOn(note).noteOn(note + 4).noteOn(note + 7).noteOn(note + 11);
    endMidi(midi, 500);
  },

  'dim': function(note) {
    console.log('dim', note);
    var midi = createMidi();  
    midi.noteOff().noteOn(note).noteOn(note + 3).noteOn(note + 6);
    endMidi(midi, 500);
  }
};

soundManager.SoundManager = SoundManager;
