import Tone from 'tone';
import Sequencer from './sequencer';

export default class Musician {
  constructor (graphic, instrument, instrumentOptions) {
    this.state = 'stopped';
    this.instrument = this.createInstrument(instrument, instrumentOptions);
    this.muted = false;
    this.toggledSequencer = false;
    this.createElement(graphic);
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

  createElement (graphic) {
    this.element = document.createElement('div');
    this.editButton = document.createElement('button');
    this.editButton.className = 'edit-button';
    this.element.className = 'musician';
    this.element.innerHTML = `
      <button class="mute-button"></button>
      <div class=${graphic}></div>
    `;
    this.element.append(this.editButton);
  }

  display (parent) {
    parent.appendChild(this.element);
  }
}
