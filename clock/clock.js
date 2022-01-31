window.onload = () => {

    const MAX_HEIGHT = window.innerHeight;
    const MAX_WIDTH = window.innerWidth;
    const WIDTH_ARROW = (MAX_HEIGHT / 2.5);
    const HEIGHT_ARROW = 12;

    const canvas = document.createElement('canvas');
    canvas.height = MAX_HEIGHT;
    canvas.width = MAX_WIDTH;
    const context = canvas.getContext('2d');
    context.font = '48px serif';
    document.body.append(canvas)

    function drawArrow(xStrat, yStart) 
    {
        context.beginPath();
        context.moveTo(xStrat, yStart);
        context.lineTo(xStrat + WIDTH_ARROW, yStart);
        context.lineTo(xStrat + WIDTH_ARROW, yStart + HEIGHT_ARROW);
        context.lineTo(xStrat, yStart + HEIGHT_ARROW);
        context.fill();
        context.arc(xStrat + WIDTH_ARROW, yStart + HEIGHT_ARROW / 2, HEIGHT_ARROW / 2, Math.PI / 2, Math.PI, true); 
        context.fill();
    }

    function drawRound() 
    {
        context.save();
        context.beginPath();
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, MAX_HEIGHT / 2.1, 0, 2 * Math.PI, true); 
        context.fill();
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, MAX_HEIGHT / 2.25, 0, 2 * Math.PI, true);
        context.fill();
        context.restore();
    }

    function drawNumbers() {
        context.fillText('12', MAX_WIDTH / 2 - 24, MAX_HEIGHT / 4);
        context.fillText('9', MAX_WIDTH / 4, MAX_HEIGHT / 2 - 24);
        context.fillText('3', MAX_WIDTH / 2 - 24, MAX_HEIGHT / 4);
        context.fillText('6', MAX_WIDTH / 2 - 24, 3 * MAX_HEIGHT / 4);
    }

    function drawCenter() 
    {
        context.save();
        context.beginPath();
        context.fillStyle = "white";
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, 10, 0, 2 * Math.PI, true); 
        context.fill();
        context.restore();
    }

    function moveArrow(angle, color) 
    {
        context.save();
        context.fillStyle = color;
        context.translate(MAX_WIDTH / 2, MAX_HEIGHT / 2);
        context.rotate(Math.PI * angle / 180);
        drawArrow(0, - HEIGHT_ARROW / 2);
        context.restore();
    }

    function angleArrow() 
    {
        let variation = 0;
        function variationArrow() {
            variation += 0.5;
        }

        function computeOffsetAngleArrow(indiceArrow) {
            return (indiceArrow / 5) + variation;
        }

        return {
            variationArrow,
            computeOffsetAngleArrow
        }
    }
    

    function getRandomColor() 
    {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawClock() 
    {
        drawRound();
        // drawNumbers();
    }

    const colorArrows = Array.from(Array(10), (_e, _i) => getRandomColor());
    const angleArrows = Array(10).fill(0);
    const angleArr = angleArrow();
    function animationClock() 
    {
        context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        drawClock();
        angleArr.variationArrow();
        for (let i = 1; i <= angleArrows.length; i++) {
            moveArrow(angleArrows[i - 1], colorArrows[i - 1]);
            angleArrows[i - 1] += angleArr.computeOffsetAngleArrow(i);
        }
        window.requestAnimationFrame(animationClock);
        drawCenter();
    }

    window.requestAnimationFrame(animationClock);
}