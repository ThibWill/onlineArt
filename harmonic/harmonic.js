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
  const OFFSET_FRAME = 200;
  const OFFSET_SIDES = 20;

  function drawSides ({ xStart, yStart }, { xEnd, yEnd }) {
    context.save();
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";

    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.closePath();
    context.stroke();

    context.restore();
  }

  function drawRails ({ xStart, yStart }, { xEnd, yEnd }) {
    context.save();
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";

    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.stroke();

    context.restore();
  }

  function drawBall ({ xCenter, yCenter }, { ratioX, ratioY }, radius) {
    context.save();
    context.fillStyle = `rgb(${Math.floor(255 - 200 * ratioX)}, 0, ${Math.floor(255 - 200 * ratioY)}, 0.5)`;

    context.beginPath();
    context.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, true);
    context.fill();

    context.restore();
  }

  function drawStatic (numberBalls) {
    console.log(context)

    drawSides(
      { xStart: OFFSET_FRAME, yStart: OFFSET_FRAME - OFFSET_SIDES }, 
      { xEnd: OFFSET_FRAME, yEnd: heightCanvas - OFFSET_FRAME + OFFSET_SIDES }
    );
    drawSides(
      { xStart: widthCanvas - OFFSET_FRAME, yStart: OFFSET_FRAME - OFFSET_SIDES }, 
      { xEnd: widthCanvas - OFFSET_FRAME, yEnd: heightCanvas - OFFSET_FRAME + OFFSET_SIDES }
    );

    const gapY = 1 / numberBalls;
    const radiusBall = (heightCanvas - 2 * OFFSET_FRAME) / (numberBalls * 2);
    for (let i = 0; i < numberBalls; i++) {
      const axeY = (((i + 1) * gapY) * (heightCanvas - 2 * OFFSET_FRAME)) - radiusBall + OFFSET_FRAME;
      
      drawRails(
        { xStart: OFFSET_FRAME + radiusBall, yStart: axeY }, 
        { xEnd: widthCanvas - OFFSET_FRAME - radiusBall, yEnd: axeY }
      );

      drawBall(
        { xCenter: OFFSET_FRAME + radiusBall, yCenter: axeY }, 
        { 
          ratioX: (i + 1) / numberBalls, 
          ratioY: axeY 
        }, 
        radiusBall
      );
    }
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
  
  const canvasHarmonic = document.getElementById('harmonic')
  initCanvas(window, canvasHarmonic, MAX_WIDTH, MAX_HEIGHT)

  const canvasOps = canvasOperations(canvasHarmonic)
  canvasOps.drawStatic(harmonicModel.number_balls)

}