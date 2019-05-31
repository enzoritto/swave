export default class SoundFactory {
  createSound (path, loop) {
    return new Howl({ src: [path + '.ogg', path + '.mp3'], loop: loop });
  }

  play (sound) {
    sound.play();
  }

  pause (sound) {
    sound.pause();
  }

  stop (sound) {
    sound.stop();
  }

  mute (sound, mute) {
    sound.mute(mute);
  }
}
