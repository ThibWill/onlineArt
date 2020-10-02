window.onload = () => {
  const mainFrame = document.getElementById("mainFrame");
  const context = mainFrame.getContext("2d");
  context.translate(350, 350);

  const system = {
    Soleil: {
      radius: 30,
      orbit: 0,
      timeRotation: 3600,
    },
    Mercure: {
      radius: 1,
      orbit: 50,
      timeRotation: 1800,
    },
    Venus: {
      radius: 2,
      orbit: 55,
      timeRotation: 1246,
    },
    Terre: {
      radius: 3,
      orbit: 60,
      timeRotation: 869,
    },
    Mars: {
      radius: 2,
      orbit: 66,
      timeRotation: 450,
    },
    Jupiter: {
      radius: 18,
      orbit: 100,
      timeRotation: 73,
    },
    Saturne: {
      radius: 15,
      orbit: 150,
      timeRotation: 30,
    },
    Uranus: {
      radius: 7,
      orbit: 225,
      timeRotation: 10.3,
    },
    Neptune: {
      radius: 6,
      orbit: 300,
      timeRotation: 5.27,
    }
  }

  function drawPlanet(radius, orbit, timerotation, time, name) {
    const x = Math.cos(2 * timerotation * Math.PI * time) * orbit;
    const y = Math.sin(2 * timerotation * Math.PI * time) * orbit;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.font = '15px serif';
    context.fillText(name, x + radius + 2, y);
    context.fill();
  }
  
  function drawSystem() {
    const time = new Date();
    const minutes = time.getMinutes()/60 + time.getSeconds()/3600 + time.getMilliseconds()/(1000 * 3600);
    context.clearRect(-350, -350, 700, 700);

    for(let planet in system) {
      drawPlanet(system[planet].radius, system[planet].orbit, system[planet].timeRotation, minutes, planet);
    }
    
    window.requestAnimationFrame(drawSystem);
  };

  window.requestAnimationFrame(drawSystem);
}