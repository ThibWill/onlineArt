/**
 * @author Thibault Willer
 * Date: 02/02/2022
 */
window.onload = () => {

    const MAX_HEIGHT = window.innerHeight;
    const MAX_WIDTH = window.innerWidth;
    const CLOCK_RADIUS = MAX_HEIGHT / 2.1;
    const INNER_CLOCK_RADIUS = MAX_HEIGHT / 2.25;
    const WIDTH_ARROW = (MAX_HEIGHT / 2.5);
    const HEIGHT_ARROW = 12;
    const ARROW_COLORS = ["#ef545b", "#c0df98", "#6777be", "#9b7fb4", "#093727", "#b9eb7c"];

    const ARROWS = Array(8).fill(0).map(e => {
        return {
            angle: (3 / 4) * 360,
            color: ARROW_COLORS[Math.floor(Math.random() * ARROW_COLORS.length)]
        }
    });

    const canvas = document.createElement('canvas');
    canvas.height = MAX_HEIGHT;
    canvas.width = MAX_WIDTH;
    const context = canvas.getContext('2d');
    document.body.append(canvas)

    /**
     * Draw an arrow on the canvas, starting at xStart, yStart
     * @date 2022-02-02
     * @param {number} xStrat
     * @param {number} yStart
     * @returns {void}
     */
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

    /**
     * Draw the drame of the clock
     * @date 2022-02-02
     * @returns {void}
     */
    function drawRound() 
    {
        context.save();
        context.beginPath();
        context.fillStyle = "#BA8C63";
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, CLOCK_RADIUS, 0, 2 * Math.PI, true); 
        context.fill();
        context.globalCompositeOperation = 'destination-out';
        context.beginPath();
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, INNER_CLOCK_RADIUS, 0, 2 * Math.PI, true);
        context.fill();
        context.restore();
    }

    /**
     * Draw the grey lines in the frame of the clock to indicates main hours
     * @date 2022-02-02
     * @returns {void}
     */
    function drawLines() {
        context.save();
        context.strokeStyle = "grey";
        context.beginPath();
        context.moveTo(MAX_WIDTH / 2, (MAX_HEIGHT - 2 * INNER_CLOCK_RADIUS) / 2 + 50);
        context.lineTo(MAX_WIDTH / 2, (MAX_HEIGHT - 2 * INNER_CLOCK_RADIUS) / 2 + 100);
        context.stroke();
        context.beginPath();
        context.moveTo(MAX_WIDTH / 2, (MAX_HEIGHT - (MAX_HEIGHT - 2 * INNER_CLOCK_RADIUS) / 2) - 50);
        context.lineTo(MAX_WIDTH / 2, (MAX_HEIGHT - (MAX_HEIGHT - 2 * INNER_CLOCK_RADIUS) / 2) - 100);
        context.stroke();
        context.beginPath();
        context.moveTo(MAX_WIDTH - (MAX_WIDTH - 2 * INNER_CLOCK_RADIUS) / 2 - 100, MAX_HEIGHT / 2);
        context.lineTo(MAX_WIDTH - (MAX_WIDTH - 2 * INNER_CLOCK_RADIUS) / 2 - 50, MAX_HEIGHT / 2);
        context.stroke();
        context.beginPath();
        context.moveTo((MAX_WIDTH - 2 * INNER_CLOCK_RADIUS) / 2 + 50, MAX_HEIGHT / 2);
        context.lineTo((MAX_WIDTH - 2 * INNER_CLOCK_RADIUS) / 2 + 100, MAX_HEIGHT / 2);
        context.stroke();
        context.restore();
    }

    /**
     * Draw an arrow with an angle at the center of the clock
     * @date 2022-02-02
     * @param {number} angle
     * @param {string} color
     * @returns {void}
     */
    function moveArrow(angle, color) 
    {
        context.save();
        context.fillStyle = color;
        context.translate(MAX_WIDTH / 2, MAX_HEIGHT / 2);
        context.rotate(Math.PI * angle / 180);
        drawArrow(0, - HEIGHT_ARROW / 2);
        context.restore();
    }

    /**
     * Handle the calculation of the angle of an arrow
     * @date 2022-02-02
     * @returns {any}
     */
    function angleArrow() 
    {
        const VARIATION_VARIABLE_OFFSET = 0.002;
        const RANGE_OFFSET = {
            min: -0.2,
            max: 2
        };

        let variation = 0;
        let way = true;
        function variableOffset() {
            if (variation < RANGE_OFFSET.min || variation > RANGE_OFFSET.max ) {
                way = !way;
            }
            way ? variation += VARIATION_VARIABLE_OFFSET : variation -= VARIATION_VARIABLE_OFFSET;
        }

        function baseOffset(indiceArrow) {
            return (indiceArrow / 5);
        }

        function computeOffsetAngleArrow(indiceArrow) {
            return baseOffset(indiceArrow) + variation;
        }

        return {
            variableOffset,
            computeOffsetAngleArrow
        }
    }

    const angleArr = angleArrow();
    /**
     * Draw all the arrows on the clock
     * @date 2022-02-02
     * @returns {any}
     */
    function drawArrows() {
        angleArr.variableOffset();
        for (let i = 1; i <= ARROWS.length; i++) {
            moveArrow(ARROWS[i - 1].angle, ARROWS[i - 1].color);
            ARROWS[i - 1].angle += angleArr.computeOffsetAngleArrow(i);
        }
    }
    
    /**
     * Draw the center of the clock
     * @date 2022-02-02
     * @returns {void}
     */
    function drawCenter() 
    {
        context.save();
        context.beginPath();
        context.fillStyle = "#BA8C63";
        context.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2, 10, 0, 2 * Math.PI, true); 
        context.fill();
        context.restore();
    }


    /**
     * Draw the clock
     * @date 2022-02-02
     * @returns {void}
     */
    function drawClock() 
    {
        drawRound();
        drawLines();
        drawArrows();
        drawCenter();
    }

    /**
     * Lanch the animation of the clock
     * @date 2022-02-02
     * @returns {any}
     */
    function animationClock() 
    {
        context.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
        drawClock();
        window.requestAnimationFrame(animationClock);
    }

    // Start
    window.requestAnimationFrame(animationClock);
}