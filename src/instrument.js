export default class Instrument {
  shape (color, x, y, radius) {
    return this.createShape(color, x, y, radius);
  }
  sound (path) {
    return this.createSound(path);
  }
  createShape (color, x, y, radius) {
    const shape = new window.createjs.Shape();

    shape.graphics.beginFill(color).drawCircle(x, y, radius);
    return shape;
  }
  createSound (path) {
    return new Howl({ src: [path], loop: true });
  }
}
