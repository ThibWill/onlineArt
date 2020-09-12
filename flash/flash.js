var numberLines = 32;
window.onload = () => {
  var main = document.getElementById("main");
  var numberCircle = 0;
  var diameterCircle = Math.floor(main.offsetWidth / numberLines);

  function generateCircle() {
    var circle = document.createElement('div');
    circle.id = 'circle' + numberCircle;
    circle.style.width = diameterCircle + 'px';
    circle.style.height = diameterCircle + 'px';
    circle.style.display = 'inline-block';
    circle.style.borderRadius = Math.round(diameterCircle / 2) + 'px';
    numberCircle += 1;
    return circle;
  }
  
  function generateLine() {
    var line = document.createElement('div');
    line.style.width = main.offsetWidth + 'px';
    line.style.height = diameterCircle + 'px';
    line.style.display = 'inline-block';
    for(var i = 0; i < numberLines; i++) {
    	var newCircle = generateCircle();
    	line.appendChild(newCircle);
    }
    return line;
  }
  
  for(var j = 0; j < numberLines; j++) {
  		var newLine = generateLine();
    	main.appendChild(newLine);
    }
}

function randomColor() {
	var letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  var color = '#';
  for(var i = 0; i < 6; i++) {
  	var randomnumber = Math.floor(Math.random() * 16);
  	color += letters[randomnumber];
  }
  return color;
}

function flash() {
	for(var k = 0; k < numberLines * numberLines; k++) {
  	var nameCircle = 'circle' + k;
  	var flashCircle = document.getElementById(nameCircle);
    if(flashCircle) {
    	flashCircle.style.background = randomColor();
    }
  }
}

setInterval(() => {
	flash();
}, 500);