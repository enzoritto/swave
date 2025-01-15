import "./styles/main.scss";
import Stage from "./stage";

function init() {
  const musiciansElement = document.getElementsByClassName(
    "musicians-container",
  )[0];
  const stage = new Stage(musiciansElement);

  stage.initStage();
}

window.onload = init;
