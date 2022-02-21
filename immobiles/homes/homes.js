const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const choseSign = (ctx, x, y, proba) => {
  let sign = '.';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((proba + 1 / 2) * 2 * Math.PI)
  drawText(ctx, 0, 0, sign);
  ctx.restore();
} 

const drawText = (ctx, x, y, sign) => {
  ctx.save();
  ctx.fillStyle = random.value() > 0.01 ? 'white': 'orange';
  ctx.font = '80px serif';
  ctx.fillText(sign, x, y);
  ctx.restore();
}

const drawMargin = (ctx, marginHeight, width, height) => {
  ctx.strokeStyle = "black";
  ctx.lineWidth = marginHeight;
  ctx.strokeRect(0, 0, width, height);
}

const sketch = () => {
  return ({ context, width, height }) => {
    const nbSymlbolsLine = 100;
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    const u = width / nbSymlbolsLine;
    const v = height / nbSymlbolsLine;
    for (let i = 0; i <= nbSymlbolsLine; i++) {
      for (let j = 0; j <= nbSymlbolsLine; j++) {
        choseSign(context, i * u + width / 81.92, j * u, random.noise2D(i, j, width, 1));
      }
    }

    drawMargin(context, width / 10, width, height);
  };
};

canvasSketch(sketch, settings);
