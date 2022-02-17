/**
 * @author Thibault Willer
 * Date: 17/02/2022
 */
const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: "A4",
  pixelsPerInch: "300",
  units: 'cm'
};

const initStateCanvas = (context) => {
  context.save();
  context.translate(-15, 14.7);
  context.rotate(-45 * Math.PI / 180);
}

const drawRectangle = (ctx, x, y, w, h, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

const drawMargin = (ctx, marginLength, w, h) => {
  ctx.save();
  ctx.strokeStyle = "white";
  ctx.lineWidth = marginLength;
  ctx.strokeRect(0, 0, w, h);
  ctx.restore();
}

const drawGridRectangles = (ctx, width, height) => {
  const widthRectangle = 1;
  const heightRectangle = 4.5;
  const borderRectangle = 0.25;
  for (let i = 0; i < width * 2 ; i += widthRectangle + borderRectangle) {
    for (let j = random.range(-4, -1); j < height * 2; j += heightRectangle + borderRectangle) {
      drawRectangle(ctx, i, j, widthRectangle, heightRectangle, random.value() < 0.02 ? "#DE213D" : "#00DEC2");
    }
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    drawRectangle(context, 0, 0, width, height, "#FFF1D9");
    initStateCanvas(context);
    drawGridRectangles(context, width, height);
    context.restore();
    drawMargin(context, 3, width, height);
  };
};

canvasSketch(sketch, settings);
