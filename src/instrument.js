export default class Instrument {
  create () {
    const instrument = new createjs.Shape();
    instrument.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    return instrument;
  }
}
