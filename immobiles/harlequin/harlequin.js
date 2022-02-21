/**
 * @author Thibault Willer
 * Date: 19/02/2022
 */
const canvasSketch = require('canvas-sketch');
const pallette = require("nice-color-palettes/100.json");

const settings = {
  dimensions: "A4",
  pixelsPerInch: "300",
  units: "cm"
};

const drawBar = (ctx, y, fullWidth, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, y, fullWidth, height);
  ctx.restore();
}

const drawWhiteBars = (ctx, width, height) => {
  const diagA4 = 36.3;
  const diagCurrent = Math.sqrt(width**2 + height**2);
  for (let i = 0; i < 50; i += 1) {
    ctx.save();
    ctx.translate(- 1.5 * width + i * (width / 21.0) , - height / 10);
    ctx.rotate(Math.PI / 4);
    drawBar(ctx, 0, height * 2, 0.6 * (diagCurrent / diagA4), "white")
    ctx.restore()
  }
}

const drawMargin = (ctx, marginHeight, width, height) => {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = marginHeight;
  ctx.strokeRect(0, 0, width, height);
  ctx.restore();
}


const sketch = () => {
  return ({ context, width, height }) => {
    const marginHeight = height / 9.9;
    const barHeight = (height - marginHeight * 2) / 13;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    for (let i = 0; i < height; i += barHeight) {
      drawBar(context, i, width, barHeight, pallette[0][Math.floor(Math.random() * 5)]);
    }

    drawWhiteBars(context, width, height);
    drawMargin(context, marginHeight, width, height);
  };
};

canvasSketch(sketch, settings);
