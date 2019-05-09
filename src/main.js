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
const metronome = {
  start: (bpm, bpb) => {
    let counter = 0;
    metronomeInterval = setInterval(() => {
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
    }, 60000 / bpm);
  },
  stop: () => {
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
