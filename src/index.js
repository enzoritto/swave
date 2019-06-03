import './style.scss';
import './assets/piano.ogg';
import './assets/piano.mp3';
import './assets/drums.ogg';
import './assets/drums.mp3';
import Musician from './musician';
import Stage from './stage';

function init () {
  const musicians = [];
  const stage = new Stage(musicians);
  const musiciansElement = document.getElementById('musicians');

  stage.initStage(musiciansElement);
  stage.initToolbar();

  musicians.forEach((musician) => {
    musician.display(musiciansElement);
  });
}

window.onload = init;
