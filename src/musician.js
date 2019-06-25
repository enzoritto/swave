import * as soundfont from 'soundfont-player';

export default class Musician {
  constructor (audioContext, instrument, avatar) {
    this.state = 'stopped';
    this.audioContext = audioContext;
    this.instrument = soundfont.instrument(this.audioContext, instrument);
    this.bpm = 60/120;
    this.muted = false;
    this.createElement(avatar);
    this.element.addEventListener('click', () => { this.mute(); });
    this.notes = [{
      time: 0,
      note: 50
    }, {
      time: 1,
      note: 53
    }, {
      time: 2,
      note: 57
    }, {
      time: 3,
      note: 60
    }];
  }

  play () {
    this.instrument.then((player) => {
      player.schedule(this.audioContext.currentTime, this.notes);
    });
  }

  pause () {
  }

  stop () {
    this.instrument.then((player) => {
      player.stop();
    });
  }

  mute () {
    this.muted = !this.muted;
    this.muted ? this.element.className += ' muted' : this.element.className = 'musician';
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
