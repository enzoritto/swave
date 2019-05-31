export default class Musician {
  constructor (soundPath, color) {
    this.state = 'stopped';
    this.muted = false;
    this.initElement(color);
    this.sound = new Howl({ src: [soundPath + '.ogg', soundPath + '.mp3'], loop: true });
    this.element.addEventListener('click', () => { this.toggleMute(); });
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

  toggleMute () {
    if(!this.muted) { this.state = 'muted'; }
    else { this.state = 'playing'; }
    this.toggleSound();
  }

  initElement (color) {
    this.createElement(color);
  }

  createElement (color) {
    this.element = document.createElement('div');
    this.element.className = 'musician';
    this.element.style.backgroundColor = color;
  }

  display (parent) {
    parent.appendChild(this.element);
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

  toggleSound () {
    this.muted = !this.muted;
    this.sound.mute(!this.sound.mute());
  }

}
