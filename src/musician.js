import Tone from 'tone';

export default class Musician {
  constructor (avatar, instrument, instrumentOptions) {
    this.state = 'stopped';
    this.instrument = this.createInstrument(instrument, instrumentOptions);
    this.part = this.createPart();
    this.muted = false;
    this.createElement(avatar);
    this.element.addEventListener('click', () => { this.mute(); });
  }

  createInstrument (type, options) {
    if (type === 'Sampler') {
      return new Tone[type](options, {
        'release': 1,
        'curve': 'exponential',
        'baseUrl': '/audio/'
      }).toMaster();
    }
    return new Tone[type](options).toMaster();
  }

  createPart () {
    let part = new Tone.Part((time, value) => {
      this.instrument.triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }, [
      {'time': '0:0', 'note': 'C3', 'duration': '4n', 'velocity': 1},
      {'time': '0:1', 'note': 'C3', 'duration': '4n', 'velocity': 1},
      {'time': '0:1:3', 'note': 'C3', 'duration': '4n', 'velocity': 0.7},
      {'time': '0:2', 'note': 'C3', 'duration': '4n', 'velocity': 1}
    ]).start(0);
    part.loop = true;
    part.loopEnd = '1m';
    return part;
  }

  play () {
    Tone.Transport.start();
  }

  pause () {
    Tone.Transport.pause();
  }

  stop () {
    Tone.Transport.stop();
  }

  mute () {
    this.muted = !this.muted;
    this.muted ? this.element.className += ' muted' : this.element.className = 'musician';
    this.muted ? this.part.mute = true : this.part.mute = false;
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
