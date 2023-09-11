const initCanvas = (windowElement, canvasElement, widthScreen, heightScreen) => {
  canvasElement.height = heightScreen;
  canvasElement.width = widthScreen > 1080 ? 1080 : widthScreen;
}

const harmonicModel = {
  number_balls: 5,
  speed : 1,
  // ball => xPos (percent), offset (ms)
  balls: []
}

function controllerHarmonic() {
  function initSystem () {
    // draw initvue
    return null;
  }

  function definitionFunctionMovementBall (xPosBall) {
    return () => xPosBall;
  }

  function calculateBallPosition (xPosBall) {
    return 0;
  }

  function calculateBallsPosition (balls) {
    return [];
  }

  function lifeHarmonic () {
    // update model
    // update vue
    return null;
  }

  return {
    initSystem,
    definitionFunctionMovementBall,
    calculateBallsPosition,
    calculateBallPosition,
    lifeHarmonic
  } 
}

function canvasOperations(canvas) {
  function drawStatic () {

  }

  function drawBall (xPos, yPos) {

  }

  function erase () {

  }

  return {
    drawStatic,
    drawBall,
    erase
  }
}


window.onload = () => {
  const MAX_WIDTH = window.innerWidth;
  const MAX_HEIGHT = window.innerHeight;
  
  const canavsHarmonic = document.getElementById('harmonic')
  initCanvas(window, canavsHarmonic, MAX_WIDTH, MAX_HEIGHT)

}