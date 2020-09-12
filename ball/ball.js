window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const ctx = mainFrame.getContext("2d");
  const mainFrameWidth = mainFrame.width;
  const mainFrameHeight = mainFrame.height;
  const radiusBall = 30;

  function drawBall(x , y) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2*Math.PI);
    ctx.fill();
  }

  function moveBall(y, numberBall) {
    let posBall = inc[numberBall][0];
    if(posBall === mainFrameWidth-radiusBall) { inc[numberBall][1] = -1; }
    if(posBall === radiusBall) { inc[numberBall][1] = 1; }
    ctx.clearRect(0, y-radiusBall, mainFrameWidth, 60);
    inc[numberBall][0] += 2*inc[numberBall][1];
    drawBall(posBall, y);
  }

  let inc = []; 
  function start() {
    const nbBalls = Math.floor(mainFrameHeight / (radiusBall*2));
    for(let i=0; i < nbBalls; i++) {
      inc.push([radiusBall, 1]);
      setInterval(() => moveBall(radiusBall + radiusBall*2*i, i), 10*(i+1));
    }
  }

  function rebond() {

  }
  start();
}