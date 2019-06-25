import expect from 'expect.js';
import Stage from '../src/stage';
import jsdom from 'jsdom-global';

describe('Stage', function () {
  let stage;

  beforeEach(function () {
    document.body.innerHTML = `
      <div id="musicians"></div>
      <button id="play-button"></button>
      <button id="pause-button"></button>
      <button id="stop-button"></button>
    `;
    const audioContext = { decodeAudioData () {} };
    stage = new Stage(audioContext, document.getElementById('musicians'));
  });

  it('disables play button at first', function () {
    stage.initToolbar();
    expect(stage.playButton.disabled).to.be(true);
  });

  it('enables the play button when an musician is added', function () {
    stage.initToolbar();
    stage.createMusician('synth_drum', '1');
    expect(stage.playButton.disabled).to.be(false);
  });
});
