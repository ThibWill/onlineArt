window.onload = () => {
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

  function drawLines(y) { drawLine(0, y*60, mainFrameWidth, y*60); }
  function drawCollumns(x) { drawLine(x*100, 0, x*100, mainFrameHeight); }

  function drawLine(xStart, yStart, xEnd, yEnd) {
    context.beginPath();
    context.moveTo(xStart,yStart);
    context.lineTo(xEnd,yEnd);
    context.stroke();
  }

  function drawArrowUp(xStart, yStart) {
    drawLine(xStart, yStart, xStart+50, yStart-20);
    drawLine(xStart+50, yStart-20, xStart+100, yStart);
    drawLine(xStart, yStart+20, xStart+50, yStart);
    drawLine(xStart+50, yStart, xStart+100, yStart+20);

    /*drawLine(xStart+40, yStart-10, xStart+50, yStart-15);
    drawLine(xStart+50, yStart-15, xStart+60, yStart-10);*/
    /*drawLine(xStart+40, yStart+10, xStart+50, yStart+5);
    drawLine(xStart+50, yStart+5, xStart+60, yStart+10);*/
  }

  function drawArrowDown(xStart, yStart) {
    drawLine(xStart, yStart, xStart+50, yStart+20);
    drawLine(xStart+50, yStart+20, xStart+100, yStart);
    drawLine(xStart, yStart+20, xStart+50, yStart+40);
    drawLine(xStart+50, yStart+40, xStart+100, yStart+20);
  }
  
  function drawArrowRight(xStart, yStart) {
    drawLine(xStart, yStart, xStart+20, yStart+30);
    drawLine(xStart+20, yStart+30, xStart, yStart+60);
    drawLine(xStart+20, yStart, xStart+40, yStart+30);
    drawLine(xStart+40, yStart+30, xStart+20, yStart+60);
  }

  function drawArrowLeft(xStart, yStart) {
    drawLine(xStart, yStart, xStart-20, yStart+30);
    drawLine(xStart-20, yStart+30, xStart, yStart+60);
    drawLine(xStart+20, yStart, xStart, yStart+30);
    drawLine(xStart, yStart+30, xStart+20, yStart+60);
  }

  function drawDirectionLeftRight(i, j, offset, direction) {
    directions[direction].drawFunc.call(this, (j-1)*40  + offset, i*60)
  }
  function drawDirectionUpDown(i, j, offset, direction) {
    directions[direction].drawFunc.call(this, j*100, (i-1)*40 + offset);
  }

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
 
  function drawGrid(offset, direction) {
    context.clearRect(0, 0, mainFrameWidth, mainFrameHeight);
    for(let i=0; i<=directions[direction].nbArrowsHeight; i++) {
      directions[direction].drawLines.call(this, i);
      for(let j=0; j<=directions[direction].nbArrowsWidth; j++) {
        directions[direction].drawDirection.call(this, i, j, offset, direction);
      }
    }
  }

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

  startLoop("up");
}