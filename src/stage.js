import tooltip from 'tippy.js';
import Musician from './musician';
import ControlPanel from './control-panel';
import './assets/icons/play.svg';
import './assets/icons/pause.svg';
import './assets/icons/stop.svg';
import './assets/icons/add.svg';
import './assets/icons/bpm.svg';
import './assets/icons/source.svg';

export default class Stage {
  constructor (musiciansElement) {
    this.musicians = [];
    this.instruments = ['Synth', 'NoiseSynth', 'Synth'];
    this.instrumentOptions = [{ oscillator: { type: 'sine' } }, {}, { oscillator: { type: 'triangle' } }];
    this.avatars = ['1', '2', '3'];
    this.musiciansElement = musiciansElement;
    this.controlPanel = new ControlPanel(this.musicians);
  }

  initStage () {
    this.musicians.forEach((musician, i) => {
      console.log('1');
    });
    this.controlPanel.initControlPanel();

    let dropdownContent = document.getElementsByClassName('content')[0];
    document.getElementsByClassName('add-button')[0].addEventListener('click', () => {
      dropdownContent.classList.toggle('show');
    });
    window.onclick = function(event) {
      if (!event.target.matches('.add-button')) {
        if (dropdownContent.classList.contains('show')) {
          dropdownContent.classList.remove('show');
        }
      }
    }

    Array.prototype.forEach.call(document.getElementsByClassName('option'), (option, i) => {
      option.addEventListener('click', () => {
        this.createMusician(this.avatars[i], this.instruments[i], this.instrumentOptions[i]);
      });
    });
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
