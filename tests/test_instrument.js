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

    instrument.sound('assets/guitar.wav');
    expect(called).to.be(true);
  });
});
