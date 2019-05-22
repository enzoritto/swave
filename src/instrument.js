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
  initElement (color) {
    this.createElement(color);
  }
  createElement (color) {
    this.element = document.createElement('div');
    this.element.className = 'musician';
    this.element.style.backgroundColor = color;
  }
  initSound (path) {
    this.createSound(path);
  }
  createSound (path) {
    this.sound = new Howl({ src: [path + '.ogg', path + '.mp3'], loop: true });
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
}
