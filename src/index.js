import './style.scss';
import Musician from './musician';
import Stage from './stage';

function init () {
  const musiciansElement = document.getElementById('musicians');
  const stage = new Stage(musiciansElement);

  stage.initStage();
  stage.initToolbar();
}

window.onload = init;
