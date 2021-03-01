window.onload = () => {
  const canvas = document.createElement('canvas');
  const numberBalls = 24;
  const radiusBall = 20;
  const maxHeight = window.innerHeight;
  const maxWidth = window.innerWidth;
  const numberCircles = window.innerWidth/100;
  canvas.height = maxHeight;
  canvas.width = maxWidth;
  document.body.append(canvas);

  const context = canvas.getContext('2d');

  const drawRounds = function() {
    context.clearRect(0, 0, maxWidth, maxHeight);

    for(let j=0; j<numberCircles; j++) {
      drawCircle(100 * (j + 1));
    }
    
    window.requestAnimationFrame(drawRounds);
  } 

  const drawCircle = function(radiusCircle) {
    let date = new Date();
    let milliseconds = date.getMilliseconds();
    let seconds = date.getSeconds();
    let SM = seconds * 1000 + milliseconds - 30000;

    for(let i=0; i<numberBalls; i++) {
      drawBall(
        maxWidth/2 + radiusCircle * Math.cos((SM*i / 30000) * 2 * Math.PI),
        maxHeight/2 + radiusCircle * Math.sin((SM*i / 30000) * 2 * Math.PI),
        radiusBall, 0, 2*Math.PI, 0)
    }
  }

  const drawBall = function(xstart, ystart, radius, anglestart, angleend, directiondraw) {
    context.beginPath();
    context.arc(xstart, ystart, radius, anglestart, angleend, directiondraw);
    context.fill();
  }

  window.requestAnimationFrame(drawRounds);

}