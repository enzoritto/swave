import Instrument from './instrument';
import creatjs from 'createjs';

let isPaused = true;
let metronomeInterval;
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

  document.getElementById('play-button').addEventListener('click', playPauseClicked);
}

const metronome = {
  start(bpm, bpb) {
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
  stop() {
    counter = 0;
    clearInterval(metronomeInterval);
  }
}

function playPauseClicked (event) {
  if (isPaused) {
    isPaused = false;
    metronome.start(70, 4);
    piano.sound('assets/piano.wav').play();
    drums.sound('assets/drums.wav').play();
    bpmLabel.style.webkitAnimationPlayState = 'running';
    bpmLabel.style.webkitAnimationDuration = 60/70 + 's';
  } else {
    isPaused = true;
    metronome.stop();
    piano.sound('assets/piano.wav').pause();
    drums.sound('assets/drums.wav').pause();
  }
}

window.onload = init;
