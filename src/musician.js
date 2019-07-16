import Tone from 'tone';
import Sequencer from './sequencer';

export default class Musician {
  constructor (avatar, instrument, instrumentOptions) {
    this.state = 'stopped';
    this.instrument = this.createInstrument(instrument, instrumentOptions);
    this.muted = false;
    this.toggledSequencer = false;
    this.createElement(avatar);
    this.sequencerEl = document.getElementById('sequencer-body');
    this.sequencer = new Sequencer(this.sequencerEl, ['C5', 'D5', 'E5'], this.instrument);
    this.sequencer.hideRows();
  }

  createInstrument (type, options) {
    if (type === 'Sampler') {
      return new Tone[type](options, {
        'release': 1,
        'curve': 'exponential',
        'baseUrl': '/audio/'
      }).toMaster();
    }
    return new Tone.PolySynth(4, Tone[type]).set({
      oscillator : {
        type : 'sine'
      },
      envelope : { attack : 0.005, decay : 0.1, sustain : 0.3, release : 1 }
    }).toMaster();
  }

  play () {
    Tone.Transport.start();
  }

  pause () {
    Tone.Transport.pause();
  }

  stop () {
    Tone.Transport.stop();
  }

  mute () {
    this.muted = !this.muted;
    this.muted ? this.element.className += ' muted' : this.element.className = 'musician';
    this.muted ? this.part.mute = true : this.part.mute = false;
  }

  createElement (avatar) {
    this.element = document.createElement('div');
    this.element.className = 'musician';
    this.element.style.backgroundImage = 'url(https://api.adorable.io/avatars/150/' + avatar + '@adorable.png';
  }

  display (parent) {
    parent.appendChild(this.element);
  }
}
