function init () {
  let stage = new createjs.Stage('canvas');
  let circle = new createjs.Shape();

  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = 100;
  circle.y = 100;

  stage.addChild(circle);
  stage.update();

  circle.addEventListener('click', circleClick);
}

function metronome (bpm, bpb) {
  let counter = 0;
  setInterval(() => {
    counter++;
    if (counter % bpb) {
      tick.play();
    } else {
      tock.play();
    }
  }, 60000 / bpm);
}

const guitar = new Howl({ src: ['assets/guitar.wav'], loop: true });
const tick = new Howl({ src: ['assets/tick.wav'] });
const tock = new Howl({ src: ['assets/tock.wav'] });

function circleClick (event) {
  metronome(70, 4);
  guitar.play();
}
