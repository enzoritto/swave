const Shortcut = require('mousetrap');

export default class Stage {
  constructor (musicians) {
    this.musicians = musicians;
    this.isPlaying = false;
    this.playButton = document.getElementById('play-button');
    this.pauseButton = document.getElementById('pause-button');
    this.stopButton = document.getElementById('stop-button');
  }

  initToolbar () {
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;

    this.playButton.addEventListener('click', () => {
      this.play();
      this.isPlaying = !this.isPlaying;
    });
    this.pauseButton.addEventListener('click', () => {
      this.pause();
      this.isPlaying = !this.isPlaying;
    });
    this.stopButton.addEventListener('click', () => {
      this.stop();
      this.isPlaying = false;
    });

    Shortcut.bind('space', () => {
      this.isPlaying ? this.pause() : this.play();
      this.isPlaying = !this.isPlaying;
    });
    Shortcut.bind('esc', () => {
      this.stop();
      this.isPlaying = false;
    });
  }

  play () {
    this.musicians.forEach((musician) => { musician.play(); } );
    this.playButton.disabled = true;
    this.pauseButton.disabled = false;
    this.stopButton.disabled = false;
  }

  pause () {
    this.musicians.forEach((musician) => { musician.pause(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = false;
  }

  stop () {
    this.musicians.forEach((musician) => { musician.stop(); } );
    this.playButton.disabled = false;
    this.pauseButton.disabled = true;
    this.stopButton.disabled = true;
  }
}
