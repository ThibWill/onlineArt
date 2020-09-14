window.onload = () => {

  const arrowsFrame = document.getElementById("arrowsFrame");
  const contextArrows = arrowsFrame.getContext("2d");

  /* Draw a line on a canvas */
  function drawLine(xStart, yStart, xEnd, yEnd, ctx) {
    ctx.beginPath();
    ctx.moveTo(xStart,yStart);
    ctx.lineTo(xEnd,yEnd);
    ctx.stroke();
  }

  /* Draw the static arrows in the upper canvas */
  function drawFrameArrows() {
    drawLine(30, 35, 45, 50, contextArrows);
    drawLine(45, 50, 60, 35, contextArrows);
    drawLine(45, 50, 45, 20, contextArrows);

    drawLine(105, 20, 120, 35, contextArrows);
    drawLine(120, 35, 105, 50, contextArrows);
    drawLine(90, 35, 120, 35, contextArrows);

    drawLine(150, 35, 165, 20, contextArrows);
    drawLine(165, 20, 180, 35, contextArrows);
    drawLine(165, 20, 165, 50, contextArrows);

    drawLine(225, 20, 210, 35, contextArrows);
    drawLine(210, 35, 225, 50, contextArrows);
    drawLine(240, 35, 210, 35, contextArrows);
  }
  drawFrameArrows();

  const mainFrame = document.getElementById("mainFrame");
  const context = mainFrame.getContext("2d");
  const mainFrameWidth = mainFrame.width;
  const mainFrameHeight = mainFrame.height;
  const nbArrowsWidthUpDown = Math.round(mainFrameWidth/100)
  const nbArrowsHeightUpDown = Math.round(mainFrameHeight/40) + 1;
  const nbArrowsWidthRightLeft = Math.round(mainFrameWidth/40) + 1;
  const nbArrowsHeightRightLeft = Math.round(mainFrameHeight/60);

  const offsetsUpLeft = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const offsetsDownRight = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -9, -8, -7, -6, -5, -4, -3, -2, -1];

  /* Draw lines and columns for the moving arrows */
  function drawLines(y) { drawLine(0, y*60, mainFrameWidth, y*60, context); }
  function drawCollumns(x) { drawLine(x*100, 0, x*100, mainFrameHeight, context); }

  /* Draw the up arrow */
  function drawArrowUp(xStart, yStart) {
    drawLine(xStart, yStart, xStart+50, yStart-20, context);
    drawLine(xStart+50, yStart-20, xStart+100, yStart, context);
    drawLine(xStart, yStart+20, xStart+50, yStart, context);
    drawLine(xStart+50, yStart, xStart+100, yStart+20, context);

    /*drawLine(xStart+40, yStart-10, xStart+50, yStart-15);
    drawLine(xStart+50, yStart-15, xStart+60, yStart-10);*/
    /*drawLine(xStart+40, yStart+10, xStart+50, yStart+5);
    drawLine(xStart+50, yStart+5, xStart+60, yStart+10);*/
  }

  /* Draw the down arrow */
  function drawArrowDown(xStart, yStart) {
    drawLine(xStart, yStart, xStart+50, yStart+20, context);
    drawLine(xStart+50, yStart+20, xStart+100, yStart, context);
    drawLine(xStart, yStart+20, xStart+50, yStart+40, context);
    drawLine(xStart+50, yStart+40, xStart+100, yStart+20, context);
  }
  
  /* Draw the right arrow */
  function drawArrowRight(xStart, yStart) {
    drawLine(xStart, yStart, xStart+20, yStart+30, context);
    drawLine(xStart+20, yStart+30, xStart, yStart+60, context);
    drawLine(xStart+20, yStart, xStart+40, yStart+30, context);
    drawLine(xStart+40, yStart+30, xStart+20, yStart+60, context);
  }

  /* Draw the left arrow */
  function drawArrowLeft(xStart, yStart) {
    drawLine(xStart, yStart, xStart-20, yStart+30, context);
    drawLine(xStart-20, yStart+30, xStart, yStart+60, context);
    drawLine(xStart+20, yStart, xStart, yStart+30, context);
    drawLine(xStart, yStart+30, xStart+20, yStart+60, context);
  }

  /* Specific rendering in the loop for each direction */
  function drawDirectionLeftRight(i, j, offset, direction) {
    directions[direction].drawFunc.call(this, (j-1)*40  + offset, i*60)
  }
  function drawDirectionUpDown(i, j, offset, direction) {
    directions[direction].drawFunc.call(this, j*100, (i-1)*40 + offset);
  }

  /* specifications of each arrow */
  const directions = {
    up: {
      nbArrowsHeight: nbArrowsHeightUpDown,
      nbArrowsWidth: nbArrowsWidthUpDown,
      offset: offsetsUpLeft,
      drawFunc: drawArrowUp,
      drawLines: drawCollumns,
      drawDirection: drawDirectionUpDown
    },
    down: {
      nbArrowsHeight: nbArrowsHeightUpDown,
      nbArrowsWidth: nbArrowsWidthUpDown,
      offset: offsetsDownRight,
      drawFunc: drawArrowDown,
      drawLines: drawCollumns,
      drawDirection: drawDirectionUpDown
    },
    right: {
      nbArrowsHeight: nbArrowsHeightRightLeft,
      nbArrowsWidth: nbArrowsWidthRightLeft,
      offset: offsetsDownRight,
      drawFunc: drawArrowRight,
      drawLines: drawLines,
      drawDirection: drawDirectionLeftRight
    },
    left: {
      nbArrowsHeight: nbArrowsHeightRightLeft,
      nbArrowsWidth: nbArrowsWidthRightLeft,
      offset: offsetsUpLeft,
      drawFunc: drawArrowLeft,
      drawLines: drawLines,
      drawDirection: drawDirectionLeftRight
    }
  }
 
  /* Draw the entire grid on the canvas */
  function drawGrid(offset, direction) {
    context.clearRect(0, 0, mainFrameWidth, mainFrameHeight);
    for(let i=0; i<=directions[direction].nbArrowsHeight; i++) {
      directions[direction].drawLines.call(this, i);
      for(let j=0; j<=directions[direction].nbArrowsWidth; j++) {
        directions[direction].drawDirection.call(this, i, j, offset, direction);
      }
    }
  }

  /* Loop to create and move the grid */
  let indice = -1;
  let flow;
  function startLoop(direction) {
    clearInterval(flow);
    flow = setInterval(() => {
      indice += 1;
      if(indice === 20) { indice = 0; }
      drawGrid(directions[direction].offset[indice], direction)
    }, 15);
  } 

  /* listener for keyboard keys */
  window.onkeydown = (e) => {
    if(e.keyCode === 38) {
      startLoop("up");
    } else if(e.keyCode === 40) {
      startLoop("down");
    } else if(e.keyCode === 39) {
      startLoop("right");
    } else if(e.keyCode === 37) {
      startLoop("left");
    }
  }

  // start
  startLoop("up");
}