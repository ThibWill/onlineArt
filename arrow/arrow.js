window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const context = mainFrame.getContext("2d");
  const mainFrameWidth = mainFrame.width;
  const mainFrameHeight = mainFrame.height;
  const nbArrowsWidth = Math.round(mainFrameWidth/100)
  const nbArrowsHeight = Math.round(mainFrameHeight/40) + 1;


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
    drawLine(xStart, yStart, xStart+50, yStart+20);
    drawLine(xStart+50, yStart+20, xStart+100, yStart);
    drawLine(xStart, yStart+20, xStart+50, yStart+40);
    drawLine(xStart+50, yStart+40, xStart+100, yStart+20);
  }

  const drawArrows = [drawArrowUp, drawArrowDown];

  function drawCollumns(x) {
    drawLine(x*100, 0, x*100, mainFrameHeight);
  }

  function drawGrid(offset, direction) {
    context.clearRect(0, 0, mainFrameWidth, mainFrameHeight);
    for(let i=0; i<=nbArrowsHeight; i++) {
      drawCollumns(i);
      for(let j=0; j<nbArrowsWidth; j++) {
        drawArrows[direction].call(this, j*100, (i-1)*40 + offset);
      }
    }
  }

  const offsetsUp = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const offsetsDown = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -9, -8, -7, -6, -5, -4, -3, -2, -1];
  const offsets = [offsetsUp, offsetsDown];
  let indice = -1;
  let flow;
  function startLoop(direction) {
    clearInterval(flow);
    flow = setInterval(() => {
      indice += 1;
      if(indice === 20) { indice = 0; }
      drawGrid(offsets[direction][indice], direction)
    }, 15);
  } 

  window.onkeydown = (e) => {
    if(e.keyCode === 38) {
      startLoop(0);
    } else if(e.keyCode === 40) {
      startLoop(1);
    }
  }

  startLoop(0);
}