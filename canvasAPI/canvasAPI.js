function canvasAPI(baseCanvasCtx) 
{
  let canvasCtx = baseCanvasCtx;

  function setCanvas(newCanvasCtx) 
  {
    canvasCtx = newCanvasCtx;
  }

  function setStrokeStyle(color) 
  {
    canvasCtx.strokeStyle = color;
  }

  /**
   * Draw a circle on the canvas
   * @param x Center of the circle in x
   * @param y Center of the circle in y
   * @param radius Radius of the circle
   * @param angleStart Start angle of the circle
   * @param angleEnd End angle of the circle
   * @param direction Direction to go to fill the complete angle (0 clockwise, 1 counter-clockwise)
   */
  function circleFilled(x, y, radius, angleStart, angleEnd, direction) 
  {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, angleStart, angleEnd, direction);
    canvasCtx.fill();
  } 

  /**
   * Remove a circle of mater/color on the canvas
   * @param x Center of the circle in x
   * @param y Center of the circle in y
   * @param radius Radius of the circle
   */
  function circleClear(x, y, radius) 
  {
    canvasCtx.save();
    canvasCtx.globalCompositeOperation = 'destination-out';
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, 2 * Math.PI, 0);
    canvasCtx.fill();
    canvasCtx.restore();
  } 

  /**
   * Fill a rectangle on the canvas
   * @param x Start of the rectangle in x
   * @param y Start of the rectangle in y
   * @param width Width of the rectangle
   * @param height Height of the rectangle
   */
  function rectangle(x, y, width, height)
  {
    canvasCtx.fillRect(x, y, width, height);
  }

  /**
   * Draw a line on the canvas
   * @param xStart Start of the line in x
   * @param yStart Start of the line in y
   * @param xEnd End of the line in x
   * @param yEnd End of the line in y
   */
  function line(xStart, yStart, xEnd, yEnd)
  {
    canvasCtx.beginPath();
    canvasCtx.moveTo(xStart, yStart);
    canvasCtx.lineTo(xEnd, yEnd);
    canvasCtx.stroke();
  }

  /**
   * Fill a rectangle on the canvas
   * @param x Start of the rectangle in x
   * @param y Start of the rectangle in y
   * @param width Width of the rectangle
   * @param height Height of the rectangle
   */
   function clearRect(x, y, width, height)
   {
     canvasCtx.clearRect(x, y, width, height);
   }

  return {
    setCanvas,
    setStrokeStyle,
    circleFilled,
    circleClear,
    rectangle,
    line,
    clearRect
  }
}