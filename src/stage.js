import tooltip from 'tippy.js';
import Shortcut from 'mousetrap';
import Musician from './musician';
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
    this.instruments = ['Synth', 'Sampler', 'Synth'];
    this.instrumentOptions = [{}, {'C3': 'kick.wav'}, {}]
    this.avatars = ['1', '2', '3'];
    this.musiciansElement = musiciansElement;
    this.isPlaying = false;
    this.playButton = document.getElementById('play-button');
    this.pauseButton = document.getElementById('pause-button');
    this.stopButton = document.getElementById('stop-button');
  }

  initToolbar () {
    this.playButton.disabled = true;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;

    tooltip('[data-tippy-content]', { delay: [800, 100] });

    this.playButton.addEventListener('click', () => {
      this.play();
      this.isPlaying = !this.isPlaying;
    });
    this.pauseButton.addEventListener('click', () => {
      this.pause();
      this.isPlaying = !this.isPlaying;
    });
    this.stopButton.addEventListener('click', () => {
      this.stop();
      this.isPlaying = false;
    });

    Shortcut.bind('space', () => {
      this.isPlaying ? this.pause() : this.play();
      this.isPlaying = !this.isPlaying;
    });
    Shortcut.bind('esc', () => {
      this.stop();
      this.isPlaying = false;
    });
  }

  initStage () {
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
    this.musicians.push(musician);
    this.playButton.disabled = false;
  }

  play () {
    this.musicians.forEach((musician) => { musician.play(); } );
    this.playButton.disabled = true;
    this.pauseButton.disabled = false;
    this.stopButton.disabled = false;
  }

  pause () {
    this.musicians.forEach((musician) => { musician.pause(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = false;
  }

  stop () {
    this.musicians.forEach((musician) => { musician.stop(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;
  }
}
