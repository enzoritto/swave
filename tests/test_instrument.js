import jsdom from 'jsdom-global';
import Instrument from '../src/instrument';

describe('Instrument', () => {
  it('Creates an easlejs Shape', () => {
    let called = false;
    const instrument = new Instrument();
    instrument.createShape = () => { called = true; };

    instrument.shape('DeepSkyBlue');
    expect(called).to.be(true);
  });
  it('Create a new Howl', () => {
    let called = false;
    const instrument = new Instrument();
    instrument.createSound = () => { called = true; };

    instrument.initSound('assets/sound.wav');
    expect(called).to.be(true);
  });
  it('Instrument.play plays instrument.sound', () => {
    const instrument = new Instrument();
    instrument.playSound = () => {};

    instrument.play();
    expect(instrument.state).to.equal('playing');
  });
  it('Instrument.pause stops instrument.sound', () => {
    const instrument = new Instrument();
    instrument.pauseSound = () => {};

    instrument.pause();
    expect(instrument.state).to.equal('paused');
  });
  it('Instrument.stop stops instrument.sound', () => {
    const instrument = new Instrument();
    instrument.stopSound = () => {};

    instrument.stop();
    expect(instrument.state).to.equal('stopped');
  });
});
