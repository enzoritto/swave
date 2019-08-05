import tooltip from 'tippy.js';
import Musician from './musician';
import ControlPanel from './control-panel';
import './assets/icons/play.svg';
import './assets/icons/pause.svg';
import './assets/icons/stop.svg';
import './assets/icons/add.svg';
import './assets/icons/bpm.svg';
import './assets/icons/source.svg';
import './assets/icons/mute.svg';
import './assets/icons/note.svg';

export default class Stage {
  constructor (musiciansElement) {
    this.musicians = [];
    this.instruments = ['Synth', 'AMSynth', 'Synth'];
    this.instrumentOptions = [{ oscillator: { type: 'sine' } }, {}, { oscillator: { type: 'triangle' } }];
    this.graphics = ['triangle', 'circle', 'square'];
    this.musiciansElement = musiciansElement;
    this.controlPanel = new ControlPanel(this.musicians);
    this.view = 'stage';
    this.toolbarElement = document.getElementById('toolbar');
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
        this.createMusician(this.graphics[i], this.instruments[i], this.instrumentOptions[i]);
      });
    });
  }

  createMusician (graphic, instrument, instrumentOptions) {
    let musician = new Musician(graphic, instrument, instrumentOptions);
    musician.display(this.musiciansElement);
    musician.editButton.addEventListener('click', () => {
      this.toggleSequencer(musician);
    });
    this.musicians.push(musician);
  }

  toggleSequencer (musician) {
    this.musicians.forEach((m, i) => {
      if (i === this.musicians.indexOf(musician)) {
        m.toggledSequencer = !m.toggledSequencer;
        m.toggledSequencer ? m.sequencer.revealRows() : m.sequencer.hideRows();
        if (m.toggledSequencer) {
          this.toolbarElement.classList.add('edit-mode');
          this.musiciansElement.classList.add('edit-mode');
        } else {
          this.toolbarElement.classList.remove('edit-mode');
          this.musiciansElement.classList.remove('edit-mode');
        }
      } else {
        m.toggledSequencer = false;
        m.sequencer.hideRows();
      }
    });
  }
}
