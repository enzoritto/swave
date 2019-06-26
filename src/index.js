import './style.scss';
import './assets/favicon.png';
import Musician from './musician';
import Stage from './stage';

function init () {
  const musiciansElement = document.getElementsByClassName('musicians-container')[0];
  const stage = new Stage(musiciansElement);

  stage.initStage();
  stage.initToolbar();
}

window.onload = init;
