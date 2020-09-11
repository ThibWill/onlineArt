
const color = "black";
window.onload = function() { 
  const mainFrame = document.getElementById("mainFrame");
  const percent = document.getElementById("percentCompletion");

  // support canvas navigateur
  if(mainFrame.getContext) {
    const ctx = mainFrame.getContext('2d');
    function colorify(event) {
      ctx.beginPath();
      ctx.arc(event.clientX - mainFrame.offsetLeft, event.clientY - mainFrame.offsetTop, 30, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.g
    }

    function countColor() {
      const ImageDatas = ctx.getImageData(0, 0, mainFrame.width, mainFrame.height).data;
      let whitePixels = 0;
      for(let i=0; i<ImageDatas.length; i+=4) {
        if(ImageDatas[i] === 0 && ImageDatas[i+1] === 0 && ImageDatas[i+2] === 0 && ImageDatas[i+3] === 0) {
          whitePixels ++;
        }
      }
      percent.innerHTML = Math.round((1 - whitePixels / (mainFrame.width * mainFrame.height)) * 10000) / 100 + "%";
      return;
    }
    setInterval(countColor, 3000);
    
    mainFrame.onmousemove = colorify;

  } else {

  }

};



