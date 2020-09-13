window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const ctx = mainFrame.getContext("2d");
  const mainFrameWidth = mainFrame.width;
  const mainFrameHeight = mainFrame.height;
  const radiusBall = 30;
  const nbBalls = Math.floor(mainFrameHeight / (radiusBall*2));
  const colors = [["#facc70", 25], ["#de7a22", 10], ["#20948b", 30], ["#6ab187", 7]];
  let intervals = new Array(nbBalls);
  let infosBall = new Array(nbBalls);

  for(let i=0; i < nbBalls; i++) {
    infosBall[i] = [radiusBall, 1];
  }

  /* Draw a ball on the canavs */
  function drawBall(x , y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  /* Move one ball for one pixel left or right*/
  function moveBall(y, numberBall, color) {
    let posBall = infosBall[numberBall][0];
    if(posBall === mainFrameWidth-radiusBall) { infosBall[numberBall][1] = -1; }
    if(posBall === radiusBall) { infosBall[numberBall][1] = 1; }
    ctx.clearRect(0, y-radiusBall, mainFrameWidth, 60);
    infosBall[numberBall][0] += infosBall[numberBall][1];
    drawBall(posBall, y, color);
  }

  /* Start the balls and change color */
  function changeColors() {
    for(let i=0; i<nbBalls; i++) {
      let rand = Math.floor(Math.random()*colors.length);
      clearInterval(intervals[i]);
      intervals[i] = setInterval(() => moveBall(radiusBall + radiusBall*2*i, i, colors[rand][0]), colors[rand][1]);
    }
  }
  changeColors();
  setInterval(changeColors, 10000);
}