const initCanvas = (windowElement, canvasElement, widthScreen, heightScreen) => {
  canvasElement.height = heightScreen;
  canvasElement.width = widthScreen > 1080 ? 1080 : widthScreen;
}

const harmonicModel = {
  number_balls: 5,
  radius_ball: 15,
  speed : 1,
  // ball => xPos (percent), offset (ms), radius
  balls: []
}

function canvasOperations(canvas) {
  const context = canvas.getContext('2d');
  const widthCanvas = canvas.width;
  const heightCanvas = canvas.height;
  const OFFSET_FRAME = 20;
  const WIDTH_SIDES = 20;

  function drawStatic (numberBalls) {
    context.clearRect(OFFSET_FRAME, OFFSET_FRAME, WIDTH_SIDES, heightCanvas - 2 * OFFSET_FRAME);
    context.clearRect(widthCanvas - OFFSET_FRAME - WIDTH_SIDES, OFFSET_FRAME, WIDTH_SIDES, heightCanvas - 2 * OFFSET_FRAME);

    const gapY = 100 / numberBalls;
    for (let i = 0; i < numberBalls; i++) {
      const axeY = (((i + 1) * gapY) * (heightCanvas - 2 * OFFSET_FRAME)) + OFFSET_FRAME;
      context.beginPath();
      context.moveTo(OFFSET_FRAME + WIDTH_SIDES, axeY);
      context.lineTo(widthCanvas - WIDTH_SIDES - OFFSET_FRAME, axeY);
      context.stroke();

      drawBall(OFFSET_FRAME + WIDTH_SIDES + 15, axeY, 15)
    }
  }

  function drawBall (xPos, yPos) {
    const radius = 15
    context.beginPath();
    context.arc(OFFSET_FRAME + WIDTH_SIDES + radius, axeY, radius, 0, 2 * Math.PI, true);
    context.stroke();
  }

  function erase () {

  }

  return {
    drawStatic,
    drawBall,
    erase
  }
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

window.onload = () => {
  const MAX_WIDTH = window.innerWidth;
  const MAX_HEIGHT = window.innerHeight;
  
  const canavsHarmonic = document.getElementById('harmonic')
  initCanvas(window, canavsHarmonic, MAX_WIDTH, MAX_HEIGHT)

}