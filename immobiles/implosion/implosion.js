const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes/200.json');
const palette = palettes[Math.floor(random.range(0, 199))];

const settings = {
  dimensions: [ 4096, 4096 ],
  pixelsPerInch: "300"
};

const drawMargin = (ctx, marginHeight, width, height) => {
  ctx.strokeStyle = "white";
  ctx.lineWidth = marginHeight;
  ctx.strokeRect(0, 0, width, height);
}

const sketch = () => {
  return ({ context, width, height }) => {
    const nbPointsCircle = 40000;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width / 2, height / 2);

    const points = [];
    const web = [];
    for (let c = 0; c < 7; c++) {
      for (let i = 0; i < nbPointsCircle; i++) {
        const radius = points[i] ? Math.sqrt((points[i].x) ** 2 + (points[i].y) ** 2) : width / 20;
        context.rotate(2 * Math.PI / nbPointsCircle);
        const newPoint = {
          x: radius + random.range(0, 100),
          y: radius + random.range(0, 100)
        }
        points[i] = newPoint;

      }
      web.push([...points]);
    }

    for (let w = web.length - 1; w >= 0; w --) {
      context.beginPath();
      context.moveTo(web[w][0].x, web[w][0].y);
      for (let j = 1; j < nbPointsCircle; j++) {
        context.rotate(2 * Math.PI / nbPointsCircle);
        context.lineTo(web[w][j].x, web[w][j].y);
      }
      context.closePath();
      context.fillStyle = palette[Math.floor(random.range(0 , 5))];
      context.fill();
    }
    context.restore();
    drawMargin(context, width / 10, width, height);
  };
};

canvasSketch(sketch, settings);
