let isPaused = true;

function init () {
  let stage = new createjs.Stage('canvas');
  let circle = new createjs.Shape();

  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);

  stage.x = canvas.width / 2;
  stage.y = canvas.height / 2;
  stage.addChild(circle);
  stage.update();

  document.getElementById('play-button').addEventListener('click', playPauseClicked);
}

let metronomeInterval;
let counter = 0;

const metronome = {
  start: (bpm, bpb) => {
    metronome.tick(bpm, bpb);
    metronomeInterval = setInterval(() => {
      metronome.tick(bpm, bpb);
    }, 60000 / bpm);
  },
  tick: (bpm, bpb) => {
    counter++;
    document.getElementById('metronome').innerHTML = counter;
    document.getElementById('metronome').className = 'metronome-' + counter;
    if (counter == 1) {
      tock.play();
    } else {
      tick.play();
    }
    if (counter % bpb == 0) {
      counter = 0;
    }
  },
  stop: () => {
    counter = 0;
    clearInterval(metronomeInterval);
  }
}

const guitar = new Howl({ src: ['assets/guitar.wav'], loop: true });
const tick = new Howl({ src: ['assets/tick.wav'] });
const tock = new Howl({ src: ['assets/tock.wav'] });

function playPauseClicked (event) {
  if (isPaused) {
    isPaused = false;
    metronome.start(70, 4);
    guitar.play();
  } else {
    isPaused = true;
    metronome.stop();
    guitar.stop();
  }
}
