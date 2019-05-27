import './style.scss';
import './assets/piano.ogg';
import './assets/piano.mp3';
import './assets/drums.ogg';
import './assets/drums.mp3';
import Instrument from './instrument';

let isPlaying = false;
let metronomeInterval;
let bpm = 70;
let bpb = 4;
let counter = 0;
let bpmLabel;
let playButton;
let pauseButton;
let stopButton;
const piano = new Instrument();
const drums = new Instrument();

function init () {
  const canvas = document.getElementById('canvas');
  const musiciansElement = document.getElementById('musicians');
  bpmLabel = document.getElementById('bpm-label');
  playButton = document.getElementById('play-button');
  pauseButton = document.getElementById('pause-button');
  stopButton = document.getElementById('stop-button');
  playButton.disabled = false;
  pauseButton.disabled = true;
  stopButton.disabled = true;

  piano.initElement('#e8280b');
  drums.initElement('#0d72c4');

  musiciansElement.appendChild(piano.element);
  musiciansElement.appendChild(drums.element);

  piano.element.addEventListener('click', () => {
    piano.toggleMute();
  });
  drums.element.addEventListener('click', () => {
    drums.toggleMute();
  });

  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
      isPlaying ? pauseClicked() : playClicked();
      isPlaying = !isPlaying;
    }
    if (e.keyCode === 27) {
      stopClicked();
      isPlaying = false;
    }
  });

  piano.initSound('audio/piano');
  drums.initSound('audio/drums');

  playButton.addEventListener('click', playClicked);
  pauseButton.addEventListener('click', pauseClicked);
  stopButton.addEventListener('click', stopClicked);
}

const metronome = {
  start() {
    this.tick(bpm, bpb);
    metronomeInterval = setInterval(() => {
      this.tick(bpm, bpb);
    }, 60000 / bpm);
  },
  tick(bpm, bpb) {
    counter++;
    if (counter == 1) {
      // Something
    } else {
      // Something
    }
    if (counter % bpb == 0) {
      counter = 0;
    }
  },
  pause() {
    counter = 0;
    clearInterval(metronomeInterval);
  },
  stop() {
    counter = 0;
    clearInterval(metronomeInterval);
  }
}

function playClicked (event) {
  metronome.start();
  piano.play();
  drums.play();
  bpmLabel.style.webkitAnimationPlayState = 'running';
  bpmLabel.style.webkitAnimationDuration = 60/70 + 's';
  playButton.disabled = true;
  pauseButton.disabled = false;
  stopButton.disabled = false;
}

function pauseClicked (event) {
  metronome.pause();
  piano.pause();
  drums.pause();
  bpmLabel.style.webkitAnimationPlayState = 'paused';
  playButton.disabled = false;
  pauseButton.disabled = true;
  stopButton.disabled = false;
}

function stopClicked (event) {
  metronome.stop();
  piano.stop();
  drums.stop();
  bpmLabel.style.webkitAnimation = '';
  playButton.disabled = false;
  pauseButton.disabled = true;
  stopButton.disabled = true;
}

window.onload = init;
