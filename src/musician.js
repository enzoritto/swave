import SoundFactory from './soundFactory';

export default class Musician {
  constructor (soundPath, avatar) {
    this.state = 'stopped';
    this.soundFactory = new SoundFactory;
    this.muted = false;
    this.createElement(avatar);
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
    this.muted = !this.muted;
    this.muted ? this.element.className += ' muted' : this.element.className = 'musician';
    this.soundFactory.mute(this.sound, this.muted);
  }

  createElement (avatar) {
    this.element = document.createElement('div');
    this.element.className = 'musician';
    this.element.style.backgroundImage = 'url(https://api.adorable.io/avatars/150/' + avatar + '@adorable.png';
  }

  display (parent) {
    parent.appendChild(this.element);
  }
}
