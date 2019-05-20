import Instrument from './instrument';
import creatjs from 'createjs';

let metronomeInterval;
let bpm = 70;
let bpb = 4;
let counter = 0;
let bpmLabel;
const piano = new Instrument();
const drums = new Instrument();

function init () {
  const stage = new createjs.Stage('canvas');
  const canvas = document.getElementById('canvas');
  bpmLabel = document.getElementById('bpm-label');
  stage.x = canvas.width / 2;
  stage.y = canvas.height / 2;

  stage.addChild(piano.shape('Blue', -70, 0, 50));
  stage.addChild(drums.shape('Purple', 70, 0, 50));
  stage.update();

  piano.initSound('assets/piano.wav');
  drums.initSound('assets/drums.wav');

  document.getElementById('play-button').addEventListener('click', playClicked);
  document.getElementById('pause-button').addEventListener('click', pauseClicked);
  document.getElementById('stop-button').addEventListener('click', stopClicked);
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
      console.log('tock');
    } else {
      console.log('tick');
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
}

function pauseClicked (event) {
  metronome.pause();
  piano.pause();
  drums.pause();
  bpmLabel.style.webkitAnimationPlayState = 'paused';
}

function stopClicked (event) {
  metronome.stop();
  piano.stop();
  drums.stop();
  bpmLabel.style.webkitAnimation = '';
}

window.onload = init;
