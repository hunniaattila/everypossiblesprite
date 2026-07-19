import './style.css'

const canvas: HTMLCanvasElement = document.getElementById('archiveCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const syncCanvasResolution = () => {
  let visualWidth = canvas.clientWidth
  let visualHeight = canvas.clientHeight

  let scaleFactor = window.devicePixelRatio || 1

  canvas.width = visualWidth * scaleFactor
  canvas.height = visualHeight * scaleFactor

  ctx.scale(scaleFactor, scaleFactor)
  ctx.imageSmoothingEnabled = false


  //TODO: tigger redrawing grid here
}

window.addEventListener('resize', syncCanvasResolution)

syncCanvasResolution()
