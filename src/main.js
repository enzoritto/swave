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

let sound = new Howl({
  src: ['assets/guitar.wav'],
  loop: true,
  autoplay: true
});

function circleClick (event) {
}
