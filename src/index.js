import './style.scss';
import './assets/favicon.svg';
import Musician from './musician';
import Stage from './stage';

function init () {
  const musiciansElement = document.getElementsByClassName('musicians-container')[0];
  const stage = new Stage(musiciansElement);

  stage.initStage();
}

window.onload = init;
