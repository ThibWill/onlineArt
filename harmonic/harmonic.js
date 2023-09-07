const initCanvas = (windowElement, canvasElement, widthScreen, heightScreen) => {
  canvasElement.height = heightScreen;
  canvasElement.width = widthScreen > 1080 ? 1080 : widthScreen;
}


window.onload = () => {
  const MAX_WIDTH = window.innerWidth;
  const MAX_HEIGHT = window.innerHeight;
  
  const canavsHarmonic = document.getElementById('harmonic')
  initCanvas(window, canavsHarmonic, MAX_WIDTH, MAX_HEIGHT)
}