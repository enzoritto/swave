import './style.scss';
import './assets/piano.ogg';
import './assets/piano.mp3';
import './assets/drums.ogg';
import './assets/drums.mp3';
import Musician from './musician';
import Stage from './stage';

function init () {
  const musicians = [
    new Musician('audio/piano', '#e8280b'),
    new Musician('audio/drums', '#0d72c4'),
  ];
  const stage = new Stage(musicians);
  const musiciansElement = document.getElementById('musicians');

  stage.initToolbar();

  musicians.forEach((musician) => {
    musician.display(musiciansElement);
  });
}

window.onload = init;
