const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes/200.json');

const settings = {
  dimensions: "A4",
  pixelsPerInch: "300",
  units: "cm"
};

const drawCircle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius / 1, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.lineWidth = radius / 5;
  ctx.stroke();
}

const drawMargin = (ctx, marginLength, w, h) => {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = marginLength;
  ctx.strokeRect(0, 0, w, h);
  ctx.restore();
}

const sketch = () => {
  return ({ context, width, height }) => {
    const palette = palettes[Math.floor(Math.random() * 200)];
    const centerCircles = [
      { x: width / 3, y: height / 5 },
      { x: 4 * width / 5, y: 4 * height / 5 }
    ]
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < centerCircles.length; i++) {
      for (let j = 4; j > 0; j--) {
        const color = palette[Math.floor(Math.random() * 5)];
        drawCircle(context, centerCircles[i].x, centerCircles[i].y, 2 * j, color);
      }
      if (i === 0) {
        drawMargin(context, 3, width, height);
      }
    }
  };
};

canvasSketch(sketch, settings);
