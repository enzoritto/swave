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
    this.sequencer = new Sequencer(this.sequencerEl, ['C3', 'D4', 'E4'], this.instrument);
    this.sequencer.hideRows();
  }

  createInstrument (type, options) {
    if (Tone[type].prototype instanceof Tone.Monophonic) {
      return new Tone.PolySynth(4, Tone[type]).set(options).toMaster();
    } else {
      return new Tone[type](options).toMaster();
    }
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
