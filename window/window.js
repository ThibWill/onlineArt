/**
 * @author Thibault Willer
 * Date: 09/11/2021
 */
window.onload = () => {

  const MAX_HEIGHT = window.innerHeight;
  const MAX_WIDTH = window.innerWidth;

  const MIN_BORDER_EXPLORER = MAX_WIDTH > MAX_HEIGHT ? MAX_HEIGHT : MAX_WIDTH;
  const RADIUS_WINDOW = MIN_BORDER_EXPLORER / 3;
  const BAR_WIDTH = 16;

  const WINDOW_RAIN = {
    xStart: 0,
    xEnd: MAX_WIDTH,
    yStart: 0,
    yEnd: MAX_HEIGHT,
    speedRain: 5,
    newRain: 4
  }

  const canvas = document.createElement('canvas');
  canvas.height = MAX_HEIGHT;
  canvas.width = MAX_WIDTH;
  document.body.append(canvas);
  const canvasOperations = canvasAPI(canvas.getContext('2d'));

  function drawWindow()
  {
    canvasOperations.circleFilled(MAX_WIDTH / 2, MAX_HEIGHT / 2, RADIUS_WINDOW, 0, 2 * Math.PI, 0);
    canvasOperations.circleClear(MAX_WIDTH / 2, MAX_HEIGHT / 2, RADIUS_WINDOW - 20);
    canvasOperations.rectangle(MAX_WIDTH / 2 - BAR_WIDTH / 2, MAX_HEIGHT / 2 - MIN_BORDER_EXPLORER / 3, BAR_WIDTH, 2 * RADIUS_WINDOW);
    canvasOperations.rectangle(MAX_WIDTH / 2 - MIN_BORDER_EXPLORER / 3, MAX_HEIGHT / 2 - BAR_WIDTH / 2, 2 * RADIUS_WINDOW, BAR_WIDTH);
  }

  let rains = [];
  function generateRain()
  {
    const newRain = {
      lengthRain: Math.random() * 15 + 10,
      angleRain: Math.random() * 2 + 60,
      xStartRain: (Math.random() * (WINDOW_RAIN.xEnd - WINDOW_RAIN.xStart)) + WINDOW_RAIN.xStart,
      yStartRain: WINDOW_RAIN.yStart,
    }
    rains.push(newRain);
  }

  function calculateEndRain(xStart, yStart, lengthRain, angleRain) 
  {
    const x = xStart + (Math.cos(2 * Math.PI * angleRain / 360) * lengthRain);
    const y = yStart + (Math.sin(2 * Math.PI * angleRain / 360) * lengthRain);
    return { x, y };
  }

  function drawRain()
  {
    rains.forEach(rain => {
      const { x, y } = calculateEndRain(rain.xStartRain, rain.yStartRain, rain.lengthRain, rain.angleRain);
      if (
          (x - MAX_WIDTH / 2) ** 2 + (y - MAX_HEIGHT / 2) ** 2 < (RADIUS_WINDOW) ** 2 &&
          (rain.xStartRain - MAX_WIDTH / 2) ** 2 + (rain.yStartRain - MAX_HEIGHT / 2) ** 2 < (RADIUS_WINDOW) ** 2
        ) {
        canvasOperations.line(rain.xStartRain, rain.yStartRain, x, y);
      }
    });
  }

  function clearCanvas()
  {
    canvasOperations.clearRect(WINDOW_RAIN.xStart, WINDOW_RAIN.yStart, WINDOW_RAIN.xEnd, WINDOW_RAIN.yEnd);
  }

  function moveRain()
  {
    rains.forEach(rain => {
      const { x, y } = calculateEndRain(rain.xStartRain, rain.yStartRain, WINDOW_RAIN.speedRain, rain.angleRain)
      rain.xStartRain = x;
      rain.yStartRain = y;
    });
  }

  function moreRain()
  {
    for (let i = 0; i < WINDOW_RAIN.newRain; i++) {
      generateRain();
    }
  }

  function deleteRain()
  {
    rains = rains.filter(rain => rain.yStartRain < WINDOW_RAIN.yEnd);
  }

  let animated = false;
  function raining()
  {
    if (!animated) { 
      clearCanvas();
      drawWindow();
    }

    moreRain();
    drawRain();
    moveRain();
    deleteRain();
    window.requestAnimationFrame(raining);
  }

  const animation = (function(){
    let colors = ['#003B46', '#07575B', '#66A5AD', '#C4DFE6'];
    let indexColor = 0;
    let positiv = true;
    function nextIndexColors()
    {
      if (indexColor === 0) {
        positiv = true;
      } else if (indexColor === colors.length) {
        positiv = false;
      }

      if (positiv) {
        indexColor ++;
      } else {
        indexColor --;
      }
    }
    return setInterval(function() {
      animated = true;
      nextIndexColors();
      canvasOperations.setStrokeStyle(colors[indexColor]);
    }, 5000)
  });

  window.onkeydown = (e) => {
    console.log(e);
    if(e.code === 'Space') {
      animation();
    } 
  }
  
  window.requestAnimationFrame(raining);
}