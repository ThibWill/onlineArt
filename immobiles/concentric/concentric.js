/**
 * @author Thibault Willer
 * Date: 20/02/2022
 */
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes/500.json');

const settings = {
  dimensions: [ 2048, 2048 ],
  pixelsPerInch: "300"
};

const drawPlanch = (ctx, [point1, point2, point3, point4], color) => {
  ctx.beginPath()
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.lineTo(point3.x, point3.y);
  ctx.lineTo(point4.x, point4.y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

const calculateCoordsPlanch = (
    xStartPlanch, 
    yStartPlanch, 
    baseHeightPlanch, 
    baseLengthPlanch,
    baseRadius
  ) => {

  const radius = Math.sqrt((0 + xStartPlanch) ** 2 + (0 + yStartPlanch) ** 2);
  const perspectiveHeightPlanch = baseHeightPlanch * (radius / baseRadius);
  const anglePlanch = (Math.PI / 2) * (perspectiveHeightPlanch / (radius * Math.sqrt(2)));

  const angleXAxis = (function() {
    const arccos = Math.acos(xStartPlanch / baseRadius);
    const arcsin = Math.asin(yStartPlanch / baseRadius);
    if (arccos <= Math.PI / 2 && arcsin >= 0) {
      return arccos;
    } else if (arccos <= Math.PI / 2 && arcsin <= 0) {
      return arcsin;
    } else if (arccos >= Math.PI / 2 && arcsin >= 0) {
      return arccos;
    } else {
      return Math.abs(2 * Math.PI - arccos);
    }
  })();
  
  const point1 = { 
    x: xStartPlanch, 
    y: yStartPlanch 
  };

  const point2 = {
    x: radius * Math.cos(angleXAxis - anglePlanch),
    y: radius * Math.sin(angleXAxis - anglePlanch)
  };

  const lenghPlanch = baseLengthPlanch * (radius / baseRadius);

  const point3 = {
    x: point2.x + (0 - point2.x) * (lenghPlanch / radius),
    y: point2.y + (0 - point2.y) * (lenghPlanch / radius)
  };

  const point4 = {
    x: xStartPlanch + (0 - xStartPlanch) * (lenghPlanch / radius),
    y: yStartPlanch + (0 - yStartPlanch) * (lenghPlanch / radius)
  }

  return [
    point1,
    point2, 
    point3, 
    point4
  ]
}

const drawMargin = (ctx, marginHeight, width, height) => {
  ctx.strokeStyle = "white";
  ctx.lineWidth = marginHeight;
  ctx.strokeRect(0, 0, width, height);
}

const sketch = () => {
  return ({ context, width, height }) => {
    const nbPlanches = 5000;
    const palette = palettes[Math.floor(random.range(0, 499))];
    const vanishingPoint = {
      x: width / 2,
      y: height / 2
    }

    const planch = {
      width: width / 20.48,
      height : height / 4.096
    }

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.save();
    context.translate(vanishingPoint.x, vanishingPoint.y);

    for (let i = 0; i < nbPlanches; i++) {
      const coords = calculateCoordsPlanch(
        random.range(-15 * width / 31, 15 * height / 31), 
        random.range(-15 * width / 31, 15 * height / 31), 
        planch.width, planch.height, 
        2048 / 2
      );
      drawPlanch(context, coords, palette[Math.floor(random.range(0, 5))]);
    }

    context.restore();
    drawMargin(context, width / 10, width, height);
  };
};

canvasSketch(sketch, settings);
