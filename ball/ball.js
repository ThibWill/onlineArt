window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const ctx = mainFrame.getContext("2d");
  const mainFrameWidth = mainFrame.width;
  const mainFrameHeight = mainFrame.height;
  const radiusBall = 30;
  const colors = [["#facc70", 50], ["#de7a22", 20], ["#20948b", 70], ["#6ab187", 15]];

  function drawBall(x , y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function moveBall(y, numberBall, color) {
    let posBall = infosBall[numberBall][0];
    if(posBall === mainFrameWidth-radiusBall) { infosBall[numberBall][1] = -1; }
    if(posBall === radiusBall) { infosBall[numberBall][1] = 1; }
    ctx.clearRect(0, y-radiusBall, mainFrameWidth, 60);
    infosBall[numberBall][0] += 2*infosBall[numberBall][1];
    drawBall(posBall, y, color);
  }

  let infosBall = []; 
  let intervals = [];
  function start() {
    const nbBalls = Math.floor(mainFrameHeight / (radiusBall*2));
    for(let i=0; i < nbBalls; i++) {
      infosBall.push([radiusBall, 1]);
      intervals.push(setInterval(() => moveBall(radiusBall + radiusBall*2*i, i, "black"), 10*(i+1)));
    }
    setInterval(changeColors, 10000);
  }
  start();
  
  function changeColors() {
    for(let i=0; i<intervals.length; i++) {
      let rand = Math.floor(Math.random()*colors.length);
      clearInterval(intervals[i]);
      intervals[i] = setInterval(() => moveBall(radiusBall + radiusBall*2*i, i, colors[rand][0]), colors[rand][1]);
    }
  }
}