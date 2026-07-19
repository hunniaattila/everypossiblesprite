import "./style.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "archiveCanvas",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

var currentGlobalIndex = 0n;
const spriteSize = 64;

const syncCanvasResolution = () => {
  const visualWidth = canvas.clientWidth;
  const visualHeight = canvas.clientHeight;

  const scaleFactor = window.devicePixelRatio || 1;

  canvas.width = visualWidth * scaleFactor;
  canvas.height = visualHeight * scaleFactor;

  ctx.scale(scaleFactor, scaleFactor);
  ctx.imageSmoothingEnabled = false;

  renderGrid();
};

const renderGrid = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "8px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  var totalRows = Math.ceil(canvas.clientHeight / spriteSize);
  var totalCols = Math.ceil(canvas.clientWidth / spriteSize);

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const screenX = col * spriteSize;
      const screenY = row * spriteSize;

      const localOffset = BigInt(row * totalCols + col);
      const cellID = currentGlobalIndex + localOffset;

      const textToDisplay = (cellID + 1n).toString();

      ctx.rect(screenX, screenY, spriteSize, spriteSize);
      ctx.fillText(
        textToDisplay,
        screenX + spriteSize / 2,
        screenY + spriteSize / 2,
      );
    }
  }
};

const handleMouseWheel = (e: WheelEvent) => {
  e.preventDefault();

  const colsOnScreen = Math.ceil(canvas.clientWidth / spriteSize);

  if (e.deltaY > 0) {
    currentGlobalIndex += BigInt(colsOnScreen);
  } else if (e.deltaY < 0) {
    currentGlobalIndex -= BigInt(colsOnScreen);
  }

  if (currentGlobalIndex < 0n) {
    currentGlobalIndex = 0n;
  }

  renderGrid();
};

window.addEventListener("resize", syncCanvasResolution);
window.addEventListener("wheel", handleMouseWheel, { passive: false });

syncCanvasResolution();
