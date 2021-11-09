window.onload = () => {
  const canvas = document.createElement('canvas');
  const maxHeight = window.innerHeight;
  const maxWidth = window.innerWidth;
  const minBorderExplorer = maxWidth > maxHeight ? maxHeight : maxWidth;
  canvas.height = maxHeight;
  canvas.width = maxWidth;
  document.body.append(canvas);

  const canvasOperations = canvasAPI(canvas.getContext('2d'));

  const radiusWindow = minBorderExplorer / 3
  function drawWindow()
  {
    canvasOperations.circleFilled(maxWidth / 2, maxHeight / 2, radiusWindow, 0, 2 * Math.PI, 0);
    canvasOperations.circleClear(maxWidth / 2, maxHeight / 2, radiusWindow - 20);
    canvasOperations.rectangle(maxWidth / 2 - 8, maxHeight / 2 - minBorderExplorer / 3, 16, 2 * radiusWindow);
    canvasOperations.rectangle(maxWidth / 2 - minBorderExplorer / 3, maxHeight / 2 - 8, 2 * radiusWindow, 16);
  }

  const WINDOW_RAIN = {
    xStart: 0,
    xEnd: maxWidth,
    yStart: 0,
    yEnd: maxHeight,
    speedRain: 5,
    newRain: 4
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
          (x - maxWidth / 2) ** 2 + (y - maxHeight / 2) ** 2 < (radiusWindow) ** 2 &&
          (rain.xStartRain - maxWidth / 2) ** 2 + (rain.yStartRain - maxHeight / 2) ** 2 < (radiusWindow) ** 2
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


  function raining()
  {
    moreRain();
    clearCanvas();
    drawWindow();
    drawRain();
    moveRain();
    deleteRain();
    window.requestAnimationFrame(raining);
  }


  drawWindow();
  window.requestAnimationFrame(raining);
}