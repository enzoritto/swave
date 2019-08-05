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
    this.sequencer = new Sequencer(this.sequencerEl, this.instrument);
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
    this.muted ? this.muteSequences() : this.unmuteSequences();
  }

  muteSequences () {
    this.sequencer.sequences.forEach((sequence) => {
      sequence.mute = true;
    });
  }

  unmuteSequences () {
    this.sequencer.sequences.forEach((sequence) => {
      sequence.mute = false;
    });
  }

  createElement (graphic) {
    this.element = document.createElement('div');
    this.editButton = document.createElement('button');
    this.editButton.className = 'edit-button';
    this.muteButton = document.createElement('button');
    this.muteButton.className = 'mute-button';
    this.element.className = 'musician';
    this.element.innerHTML = `
      <div class=${graphic}></div>
    `;
    this.element.append(this.editButton);
    this.element.append(this.muteButton);
  }

  display (parent) {
    parent.appendChild(this.element);
  }
}
