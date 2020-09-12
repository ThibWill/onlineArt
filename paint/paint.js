
window.onload = function() { 
  const mainFrame = document.getElementById("mainFrame");
  const percent = document.getElementById("percentCompletion");

  // support canvas navigateur
  if(mainFrame.getContext) {
    const mainFrameWidth = mainFrame.width;
    const mainFrameHeight = mainFrame.height;
    const ctx = mainFrame.getContext('2d');

    /* Draw a black circle on the canvas */ 
    function colorify(event) {
      ctx.beginPath();
      ctx.arc(event.clientX - mainFrame.offsetLeft, event.clientY - mainFrame.offsetTop, 30, 0, 2 * Math.PI, 0);
      ctx.fill();
    }
    mainFrame.onmousemove = colorify;

    /* Give the percentage of black pixels of the canvas */
    function countColor() {
      const ImageDatas = ctx.getImageData(0, 0, mainFrameWidth, mainFrameHeight).data;
      let whitePixels = 0;
      for(let i=0; i<ImageDatas.length; i+=4) {
        if(ImageDatas[i] === 0 && ImageDatas[i+1] === 0 && ImageDatas[i+2] === 0 && ImageDatas[i+3] === 0) {
          whitePixels ++;
        }
      }
      const percentPixel = Math.round((1 - whitePixels / (mainFrameWidth * mainFrameHeight)) * 10000) / 100 ;
      percent.innerHTML = percentPixel + "%";

      if(percentPixel === 100) {
        completeColor();
      }
    }
    const intervalCount = setInterval(countColor, 2000);

    /* Trigger when after fill 100% */
    function completeColor() {
      clearInterval(intervalCount);
      mainFrame.onmousemove = null;
      setInterval(changeColorCanvas, 20);
    }

    let rgb = [0, 0, 0];
    let limits = [0, 255];
    let direction = 1;
    let sign = 1;
    /* Allow to change the color randomly after fill 100% */
    function changeColorCanvas() {
      if(rgb.includes(limits[direction])) {
        sign = -sign;
        direction = direction === 1 ? 0 : 1;
      }
      let column = Math.floor(Math.random() * 3);
      ctx.clearRect(0, 0, mainFrameWidth, mainFrameHeight);
      rgb[column] += 1 * sign;
      ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
      ctx.fillRect(0, 0, mainFrameWidth, mainFrameHeight);
    }
  } else {
    percent.innerHTML = "Canvas not supported by the navigator"
  }
};



