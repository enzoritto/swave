import SoundFactory from './soundFactory';

export default class Musician {
  constructor (soundPath, color) {
    this.state = 'stopped';
    this.soundFactory = new SoundFactory;
    this.muted = false;
    this.createElement(color);
    this.sound = this.soundFactory.createSound(soundPath, true);
    this.element.addEventListener('click', () => { this.mute(); });
  }

  play () {
    this.soundFactory.play(this.sound);
  }

  pause () {
    this.soundFactory.pause(this.sound);
  }

  stop () {
    this.soundFactory.stop(this.sound);
  }

  mute () {
    this.soundFactory.mute(this.sound, this.muted);
    this.muted = !this.muted;
  }

  createElement (color) {
    this.element = document.createElement('div');
    this.element.className = 'musician';
    this.element.style.backgroundColor = color;
  }

  display (parent) {
    parent.appendChild(this.element);
  }
}
