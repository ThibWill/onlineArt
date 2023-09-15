const initCanvas = (windowElement, canvasElement, widthScreen, heightScreen) => {
  canvasElement.height = heightScreen;
  canvasElement.width = widthScreen > 1080 ? 1080 : widthScreen;
}

const harmonicModel = {
  number_balls: 6,
  speed : 1,
  // ball => xPos (percent), offset (ms), direction, speed
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
    context.strokeStyle = "rgba(0, 0, 0, 0.2)";

    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.closePath();
    context.stroke();

    context.restore();
  }

  function drawRails ({ xStart, yStart }, { xEnd, yEnd }) {
    context.save();
    context.strokeStyle = "rgba(0, 0, 0, 0.2)";

    context.beginPath();
    context.moveTo(xStart, yStart);
    context.lineTo(xEnd, yEnd);
    context.stroke();

    context.restore();
  }

  function drawBall ({ xCenter, yCenter }, { ratioX, ratioY }, radius) {
    context.save();
    console.log(ratioY)
    context.strokeStyle = `rgb(${Math.floor(255 - 200 * ratioX)}, 0, ${Math.floor(255 - 200 * ratioY)}, 0.5)`;

    context.lineWidth = 2;
    context.beginPath();
    context.arc(xCenter, yCenter, radius - 1, 0, 2 * Math.PI, true);
    context.stroke();

    context.restore();
  }

  function drawStatic (numberBalls) {

    drawSides(
      { xStart: OFFSET_FRAME - 0.5, yStart: OFFSET_FRAME - OFFSET_SIDES }, 
      { xEnd: OFFSET_FRAME - 0.5, yEnd: heightCanvas - OFFSET_FRAME + OFFSET_SIDES }
    );
    drawSides(
      { xStart: widthCanvas - OFFSET_FRAME + 0.5, yStart: OFFSET_FRAME - OFFSET_SIDES }, 
      { xEnd: widthCanvas - OFFSET_FRAME + 0.5, yEnd: heightCanvas - OFFSET_FRAME + OFFSET_SIDES }
    );

    const gapY = 1 / numberBalls;
    const radiusBall = (heightCanvas - 2 * OFFSET_FRAME) / (numberBalls * 2);
    for (let i = 0; i < numberBalls; i++) {
      const axeY = (((i + 1) * gapY) * (heightCanvas - 2 * OFFSET_FRAME)) - radiusBall + OFFSET_FRAME;
      
      drawRails(
        { xStart: OFFSET_FRAME + radiusBall, yStart: axeY }, 
        { xEnd: widthCanvas - OFFSET_FRAME - radiusBall, yEnd: axeY }
      );
    }
  }

  function drawDynamic (balls) {
    const numberBalls = balls.length;
    const gapY = 1 / numberBalls;
    const radiusBall = (heightCanvas - 2 * OFFSET_FRAME) / (numberBalls * 2);
    for (let i = 0; i < numberBalls; i++) {
      const axeY = (((i + 1) * gapY) * (heightCanvas - 2 * OFFSET_FRAME)) - radiusBall + OFFSET_FRAME;
      const ballProgress = balls[i].progress / 100;
      drawBall(
        { xCenter: OFFSET_FRAME + radiusBall + ballProgress * (widthCanvas - 2 * (OFFSET_FRAME + radiusBall)), yCenter: axeY }, 
        { 
          ratioX: ballProgress, 
          ratioY: gapY * ( i + 1)
        }, 
        radiusBall
      );
    }
  }


  function erase () {
    context.clearRect(0, 0, widthCanvas, heightCanvas);
  }

  return {
    drawStatic,
    drawDynamic,
    erase
  }
}

function controllerHarmonic (canvasHarmonic) {
  const canvasOps = canvasOperations(canvasHarmonic)

  function initSystem () {
    // Init model
    harmonicModel.balls = new Array(harmonicModel.number_balls).fill(false).map((_ball, i) => ({
      progress: 0,
      direction: 1,
      timeOffset: i * 200
    }));
    // Init vue
    canvasOps.drawStatic(harmonicModel.number_balls);
  }

  function definitionFunctionMovementBall (xPosBall) {
    return () => Math.cos(xPosBall);
  }

  function calculateBallPosition (xPosBall) {
    return 0;
  }

  function calculateBallsPosition (balls) {
    return [];
  }

  function lifeHarmonic () {
    // Update model
    harmonicModel.balls = harmonicModel.balls.map(ball => {
      if (ball.timeOffset > 0) {
        return {
          ...ball,
          timeOffset: ball.timeOffset - 1
        }
      }

      const progress = ball.progress;
      let direction = ball.direction;
      if ((direction === 1 && progress >= 100) || (direction === -1 && progress <= 0)) {
        direction *= -1;
      }

      return {
        ...ball,
        direction,
        progress: progress + direction * 0.1
      }
    })

    // Erase canvas
    canvasOps.erase()

    // Recreate frame
    canvasOps.drawStatic(harmonicModel.number_balls);

    // Update vue
    canvasOps.drawDynamic(harmonicModel.balls)
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

  const harmonicController = controllerHarmonic(canvasHarmonic)
  harmonicController.initSystem()

  // Start harmonic
  setInterval(harmonicController.lifeHarmonic, 10);

}