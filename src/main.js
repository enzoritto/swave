let isPaused = true;
let metronomeInterval;
let counter = 0;
let metronomeElement;

function init () {
  let stage = new createjs.Stage('canvas');
  let instruments = {
    guitar: new createjs.Shape(),
    drums: new createjs.Shape(),
  }

  instruments.guitar.graphics.beginFill('DeepSkyBlue').drawCircle(-70, 0, 50);
  instruments.drums.graphics.beginFill('Orange').drawCircle(70, 0, 50);

  stage.x = canvas.width / 2;
  stage.y = canvas.height / 2;
  stage.addChild(instruments.guitar);
  stage.addChild(instruments.drums);
  stage.update();

  document.getElementById('play-button').addEventListener('click', playPauseClicked);
  metronomeElement = document.getElementById('metronome');
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
    metronomeElement.innerHTML = counter;
    metronomeElement.className = 'metronome-' + counter;
    if (counter == 1) {
      sounds.tock.play();
    } else {
      sounds.tick.play();
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

const sounds = {
  guitar: new Howl({ src: ['assets/guitar.wav'], loop: true }),
  drums: new Howl({ src: ['assets/drums.wav'], loop: true }),
  tick: new Howl({ src: ['assets/tick.wav'] }),
  tock: new Howl({ src: ['assets/tock.wav'] }),
}

function playPauseClicked (event) {
  if (isPaused) {
    isPaused = false;
    metronome.start(70, 4);
    sounds.guitar.play();
    sounds.drums.play();
  } else {
    isPaused = true;
    metronome.stop();
    sounds.drums.stop();
    sounds.guitar.stop();
  }
}
