import tooltip from 'tippy.js';
import Tone from 'tone';
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
import './assets/icons/edit.png';

export default class Stage {
  constructor(musiciansElement) {
    this.musicians = [];
    this.instruments = ['Synth', 'Synth', 'Synth', 'Synth'];
    this.instrumentOptions = [{
      oscillator: {
        type: "sine"
      }
    }, {
      oscillator: {
        type: "square"
      },
      volume: -13
    }, {
      oscillator: {
        type: "triangle"
      }
    }, {
      oscillator: {
        type: "sawtooth"
      },
      volume: -13
    }];
    this.graphics = [
      `<svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="#000"/>
      </svg>`,
      `<svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000" d="M0 0h200v200H0z"/>
      </svg>`,
      `<svg width="174" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M87 0l86.603 150H.397L87 0z" fill="#000"/>
      </svg>`,
      `<svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M128.814 69.201L179.661 200H77.966l50.848-130.798z" fill="#000"/>
        <path d="M161.299 100.38L200 200h-77.401l38.7-99.62z" fill="#000"/>
        <path d="M77.966 0l77.966 200H0L77.966 0z" fill="#000"/>
      </svg>`
    ];
    this.musiciansElement = musiciansElement;
    this.controlPanel = new ControlPanel(this.musicians);
    this.view = 'stage';
    this.toolbarElement = document.getElementById('toolbar');
  }

  initStage() {
    this.musicians.forEach((musician, i) => {
      console.log('1');
    });
    this.controlPanel.initControlPanel();

    this.bpmInput = document.getElementById('bpm-input');
    this.bpmInput.addEventListener('input', (e) => {
      Tone.Transport.bpm.value = this.bpmInput.value;
    });

    let dropdownContent = document.getElementsByClassName('content')[0];
    document.getElementsByClassName('add-button')[0].addEventListener('click', () => {
      dropdownContent.classList.toggle('show');
    });
    window.onclick = function(event) {
      if (!event.target.matches('.add-button') && !event.target.matches('.option')) {
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

    this.transportElement = document.getElementsByClassName('transport')[0];
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = '4m';
    Tone.Transport.scheduleRepeat((time) => {
      Tone.Draw.schedule(() => {
        this.transportElement.value = Tone.Transport.progress * 100;
      }, time);
    }, 0.05);
  }

  createMusician(graphic, instrument, instrumentOptions) {
    let musician = new Musician(graphic, instrument, instrumentOptions);
    musician.display(this.musiciansElement);
    musician.editButton.addEventListener('click', () => {
      this.toggleSequencer(musician);
    });
    musician.muteButton.addEventListener('click', () => {
      musician.mute();
    });
    this.musicians.push(musician);
  }

  toggleSequencer(musician) {
    this.musicians.forEach((m, i) => {
      if (i === this.musicians.indexOf(musician)) {
        m.toggledSequencer = !m.toggledSequencer;
        m.toggledSequencer ? m.sequencer.revealRows() : m.sequencer.hideRows();
        if (m.toggledSequencer) {
          document.body.classList.add('edit-mode');
        } else {
          document.body.classList.remove('edit-mode');
        }
      } else {
        m.toggledSequencer = false;
        m.sequencer.hideRows();
      }
    });
  }
}
