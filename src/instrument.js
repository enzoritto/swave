export default class Instrument {
  constructor () {
    this.state = 'stopped';
  }
  play () {
    this.state = 'playing';
    this.playSound();
  }
  pause () {
    this.state = 'paused';
    this.pauseSound();
  }
  stop () {
    this.state = 'stopped';
    this.stopSound();
  }
  shape (color, x, y, radius) {
    return this.createShape(color, x, y, radius);
  }
  createShape (color, x, y, radius) {
    const shape = new window.createjs.Shape();

    shape.graphics.beginFill(color).drawCircle(x, y, radius);
    return shape;
  }
  initSound (path) {
    this.createSound(path);
  }
  playSound () {
    this.sound.play();
  }
  pauseSound () {
    this.sound.pause();
  }
  stopSound () {
    this.sound.stop();
  }
  createSound (path) {
    this.sound = new Howl({ src: [path], loop: true });
  }
}
