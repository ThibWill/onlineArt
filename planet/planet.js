window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const context = mainFrame.getContext("2d");
  /* move the origin of the canvas to the center */
  context.translate(350, 350);

  /* informations solar system */
  const system = {
    Soleil: {
      radius: 30,
      orbit: 0,
      timeRotation: 3600,
      color: "yellow",
    },
    Mercure: {
      radius: 1,
      orbit: 50,
      timeRotation: 1800,
      color: "grey",
    },
    Venus: {
      radius: 2,
      orbit: 55,
      timeRotation: 1246,
      color: "cornsilk",
    },
    Terre: {
      radius: 3,
      orbit: 60,
      timeRotation: 869,
      color: "blue",
    },
    Mars: {
      radius: 2,
      orbit: 66,
      timeRotation: 450,
      color: "red",
    },
    Jupiter: {
      radius: 18,
      orbit: 100,
      timeRotation: 73,
      color: "navajowhite",
    },
    Saturne: {
      radius: 15,
      orbit: 150,
      timeRotation: 30,
      color: "burlywood",
    },
    Uranus: {
      radius: 7,
      orbit: 225,
      timeRotation: 10.3,
      color: "lightblue",
    },
    Neptune: {
      radius: 6,
      orbit: 300,
      timeRotation: 5.27,
      color: "cornflowerblue",
    }
  }

  /* Draw a planet / star on the canvas */
  function drawPlanet(radius, orbit, timerotation, time, name, color) {
    console.log(color);
    context.fillStyle = color;
    const x = Math.cos(2 * timerotation * Math.PI * time) * orbit;
    const y = Math.sin(2 * timerotation * Math.PI * time) * orbit;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
    context.font = '15px Arial';
    context.fillText(name, x + radius + 2, y);
    context.fill();
  }
  
  /* draw the solar system */
  function drawSystem() {
    const time = new Date();
    const minutes = time.getMinutes()/60 + time.getSeconds()/3600 + time.getMilliseconds()/(1000 * 3600);
    context.clearRect(-350, -350, 700, 700);

    for(let planet in system) {
      drawPlanet(system[planet].radius, system[planet].orbit, system[planet].timeRotation, minutes, planet, system[planet].color);
    }

    window.requestAnimationFrame(drawSystem);
  };
  // begin animation
  window.requestAnimationFrame(drawSystem);
}