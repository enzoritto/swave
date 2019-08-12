import Tone from 'tone';
import Sequencer from './sequencer';

export default class Musician {
  constructor(graphic, instrument, instrumentOptions) {
    this.state = 'stopped';
    this.instrument = this.createInstrument(instrument, instrumentOptions);
    this.muted = false;
    this.toggledSequencer = false;
    this.createElement(graphic);
    this.part = this.createPart();
    this.sequencerEl = document.getElementById('sequencer-body');
    this.sequencer = new Sequencer(this.sequencerEl, this.instrument, this.part);
    this.sequencer.hideRows();
    this.delay = ms => new Promise(res => setTimeout(res, ms));
  }

  createInstrument(type, options) {
    if (Tone[type].prototype instanceof Tone.Monophonic) {
      return new Tone.PolySynth(4, Tone[type]).set(options).toMaster();
    } else {
      return new Tone[type](options).toMaster();
    }
  }

  createElement(graphic) {
    this.element = document.createElement('div');
    this.editButton = document.createElement('button');
    this.editButton.className = 'edit-button';
    this.editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12 3v11l-2-1a4 4 0 1 0 4 4V7h4V3h-6z"/>
      </svg>
    `;
    this.muteButton = document.createElement('button');
    this.muteButton.className = 'mute-button';
    this.muteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path d="M3 9v6h4l5 5V4L7 9H3zm14 3c0-2-2-3-3-4v8c1-1 3-2 3-4zm-3-9v2a7 7 0 0 1 0 14v2a9 9 0 0 0 0-18z"/>
      </svg>
    `;
    this.element.className = 'musician';
    this.graphicEl = document.createElement('div');
    this.graphicEl.className = 'graphic';
    this.graphicEl.innerHTML = graphic;
    this.element.append(this.graphicEl);
    this.element.append(this.editButton);
    this.element.append(this.muteButton);
  }

  createPart() {
    return new Tone.Part((time, value) => {
      this.instrument.triggerAttackRelease(value.note, "8n", time, value.velocity);
      Tone.Draw.schedule(async () => {
        console.log(this.graphicEl);
        this.graphicEl.classList.add('active');
        await this.delay(100);
        this.graphicEl.classList.remove('active');
      }, time);
    }).start(0);
  }

  play() {
    Tone.Transport.start();
  }

  pause() {
    Tone.Transport.pause();
  }

  stop() {
    Tone.Transport.stop();
  }

  mute() {
    this.muted = !this.muted;
    this.muted ? this.element.className += ' muted' : this.element.className = 'musician';
    this.muted ? this.part.mute = true : this.part.mute = false;
  }

  display(parent) {
    parent.appendChild(this.element);
  }
}
