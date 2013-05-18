var coremidi = require('coremidi');
var midiApi = require('midi-api');
var soundManager = exports; exports.constructor = function soundManager() {};

function SoundManager() {
  this.opts = {
    'key': 44,
    'bank': 1,
    'program': 1,
    'rest': 0,
    'octave': 0
  };
}

SoundManager.prototype.createMidi = function() {
  return midiApi()
    .bank(this.opts.bank)
    .program(this.opts.program)
    .rest(this.opts.rest);
};

SoundManager.prototype.endMidi = function(midi, rest) {
  midi.rest(rest || 1000);
  midi.noteOff();
  midi.pipe(coremidi());
};

SoundManager.prototype.change = function(data) {
  this.opts[data.stat] = this.opts[data.stat] + data.diff
};

SoundManager.prototype.sounds = function(diatonic, note) {
  console.log(diatonic, note, 'program', this.opts.program, 'key', this.opts.key, 'octave', this.opts.octave);
  switch (diatonic) {
    case 'note':
      var midi = this.createMidi();  
      midi.noteOff().noteOn(note);
      this.endMidi(midi);
      break;

    case 'maj':
      var midi = this.createMidi();  
      midi.noteOff().noteOn(note).noteOn(note + 4).noteOn(note + 7);
      this.endMidi(midi);
      break;

    case 'min':
      var midi = this.createMidi();  
      midi.noteOff().noteOn(note).noteOn(note + 3).noteOn(note + 7);
      this.endMidi(midi);
      break;

    case 'maj7':
      var midi = this.createMidi();  
      midi.noteOff().noteOn(note).noteOn(note + 4).noteOn(note + 7).noteOn(note + 11);
      this.endMidi(midi);
      break;

    case 'dim':
      var midi = this.createMidi();  
      midi.noteOff().noteOn(note).noteOn(note + 3).noteOn(note + 6);
      this.endMidi(midi);
      break;
  }
};

soundManager.SoundManager = SoundManager;
