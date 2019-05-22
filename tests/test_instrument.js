import jsdom from 'jsdom-global';
import Instrument from '../src/instrument';

describe('Instrument', () => {
  it('.initElement creates a div element', () => {
    let called = false;
    const instrument = new Instrument();
    instrument.createElement = () => { called = true; };

    instrument.initElement('#0d72c4');
    expect(called).to.be(true);
  });
  it('.initSound creates a new Howl', () => {
    let called = false;
    const instrument = new Instrument();
    instrument.createSound = () => { called = true; };

    instrument.initSound('assets/sound.wav');
    expect(called).to.be(true);
  });
  it('.play plays instrument.sound', () => {
    const instrument = new Instrument();
    instrument.playSound = () => {};

    instrument.play();
    expect(instrument.state).to.equal('playing');
  });
  it('.pause stops instrument.sound', () => {
    const instrument = new Instrument();
    instrument.pauseSound = () => {};

    instrument.pause();
    expect(instrument.state).to.equal('paused');
  });
  it('.stop stops instrument.sound', () => {
    const instrument = new Instrument();
    instrument.stopSound = () => {};

    instrument.stop();
    expect(instrument.state).to.equal('stopped');
  });
  it('.mute mutes instrument.sound', () => {
    const instrument = new Instrument();
    instrument.toggleSound = () => {};

    instrument.toggleMute();
    expect(instrument.state).to.equal('muted');
  });
});
