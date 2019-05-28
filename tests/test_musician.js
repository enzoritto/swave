import jsdom from 'jsdom-global';
import Musician from '../src/musician';

describe('Musician', () => {
  it('.initElement creates a div element', () => {
    let called = false;
    const musician = new Musician();
    musician.createElement = () => { called = true; };

    musician.initElement('#0d72c4');
    expect(called).to.be(true);
  });
  it('.initSound creates a new Howl', () => {
    let called = false;
    const musician = new Musician();
    musician.createSound = () => { called = true; };

    musician.initSound('assets/sound.wav');
    expect(called).to.be(true);
  });
  it('.play plays musician.sound', () => {
    const musician = new Musician();
    musician.playSound = () => {};

    musician.play();
    expect(musician.state).to.equal('playing');
  });
  it('.pause pauses musician.sound', () => {
    const musician = new Musician();
    musician.pauseSound = () => {};

    musician.pause();
    expect(musician.state).to.equal('paused');
  });
  it('.stop stops musician.sound', () => {
    const musician = new Musician();
    musician.stopSound = () => {};

    musician.stop();
    expect(musician.state).to.equal('stopped');
  });
  it('.mute mutes musician.sound', () => {
    const musician = new Musician();
    musician.toggleSound = () => {};

    musician.toggleMute();
    expect(musician.state).to.equal('muted');
  });
});
