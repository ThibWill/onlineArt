/**
 * @author Thibault Willer
 * Date: 17/02/2022
 */
const canvasSketch = require('canvas-sketch');
const colors = require("nice-color-palettes/200.json");

const settings = {
  dimensions: "A4",
  pixelsPerInch: "300",
  units: "cm"
};

const drawCircle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
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
    const radiusCircle = width / 10;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (let i = radiusCircle; i < width; i += 2 * 1.75 * radiusCircle) {
      for (let j = 0; j < height; j += radiusCircle) {
        drawCircle(context, i, j, radiusCircle, colors[0][Math.floor(Math.random() * 5)])
      }
    }

    for (let i = 2 * radiusCircle; i < width; i += 2 * 1.75 * radiusCircle) {
      for (let j = 0; j < height; j += radiusCircle) {
        drawCircle(context, i, j, radiusCircle, colors[0][Math.floor(Math.random() * 5)])
      }
    }

    drawMargin(context, 3, width, height);
  };
};

canvasSketch(sketch, settings);
