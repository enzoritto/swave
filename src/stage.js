import tooltip from 'tippy.js';
import Musician from './musician';
import ControlPanel from './control-panel';
import './assets/icons/drums.png';
import './assets/icons/piano.png';
import './assets/icons/guitar.png';
import './assets/svg/add-button.svg';
import './assets/svg/play.svg';
import './assets/svg/source.svg';
import './assets/svg/pause.svg';
import './assets/svg/stop.svg';
import './assets/svg/menu.svg';
import './assets/svg/dropdown.svg';
import './assets/svg/logo.svg';
import './assets/audio/kick.wav';

export default class Stage {
  constructor (musiciansElement) {
    this.musicians = [];
    this.instruments = ['Synth', 'NoiseSynth', 'Synth'];
    this.instrumentOptions = [{ oscillator: { type: 'sine' } }, { noise: { type: 'white' } }, { oscillator: { type: 'triangle' } }];
    this.avatars = ['1', '2', '3'];
    this.musiciansElement = musiciansElement;
    this.controlPanel = new ControlPanel(this.musicians);
  }

  initStage () {
    this.musicians.forEach((musician, i) => {
      console.log('1');
    });
    this.controlPanel.initControlPanel();

    this.musicianButton = document.createElement('button');
    this.musicianButton.className = 'musician-button';
    this.musicianDropdownContent = document.createElement('div')
    this.musicianDropdownContent.innerHTML = `
      <button id="piano" class="instrument-button">
        <img src="images/piano.png">
      </button>
      <button id="drums" class="instrument-button">
        <img src="images/drums.png">
      </button>
      <button id="guitar" class="instrument-button">
        <img src="images/guitar.png">
      </button>
    `;
    Array.prototype.forEach.call(this.musicianDropdownContent.children, (button, i) => {
      button.addEventListener('click', () => {
        this.createMusician(this.avatars[i], this.instruments[i], this.instrumentOptions[i]);
      });
    });
    tooltip(this.musicianButton, {
      theme: 'black',
      animateFill: false,
      animation: 'scale',
      trigger: 'click',
      arrow: true,
      arrowType: 'sharp',
      placement: 'right',
      interactive: true,
      content: this.musicianDropdownContent
    });
    document.body.appendChild(this.musicianButton);
  }

  createMusician (avatar, instrument, instrumentOptions) {
    let musician = new Musician(avatar, instrument, instrumentOptions);
    musician.display(this.musiciansElement);
    musician.element.addEventListener('click', () => {
      this.musicians.forEach((m, i) => {
        if (i === this.musicians.indexOf(musician)) {
          m.toggledSequencer = !m.toggledSequencer;
          m.toggledSequencer ? m.sequencer.revealRows() : m.sequencer.hideRows();
        } else {
          m.toggledSequencer = false;
          m.sequencer.hideRows();
        }
      });
    });
    this.musicians.push(musician);
  }
}
