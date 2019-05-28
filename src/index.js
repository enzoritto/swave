import './style.scss';
import './assets/piano.ogg';
import './assets/piano.mp3';
import './assets/drums.ogg';
import './assets/drums.mp3';
import Musician from './musician';
import Stage from './stage';

const musicians = [
  new Musician('audio/piano', '#e8280b'),
  new Musician('audio/drums', '#0d72c4'),
]
const stage = new Stage(musicians);

function init () {
  const musiciansElement = document.getElementById('musicians');
  stage.initToolbar();

  musicians.forEach((musician) => {
    musiciansElement.appendChild(musician.element);
  });
}

window.onload = init;
