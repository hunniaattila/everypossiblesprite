import "./style.css";

const canvas: HTMLCanvasElement = document.getElementById(
  "archiveCanvas",
) as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

var currentGlobalIndex = 0n;
const spriteSize = 128;
const padding = 32;

const totalSize = spriteSize + 2 * padding;
const colors = ["#F25912", "#5C3E94", "#412B6B", "#211832"];

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

  var totalRows = Math.ceil(canvas.clientHeight / totalSize);
  var totalCols = Math.ceil(canvas.clientWidth / totalSize);

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      const screenX = col * totalSize;
      const screenY = row * totalSize;

      const localOffset = BigInt(row * totalCols + col);
      const cellID = currentGlobalIndex + localOffset;

      const spriteColors = extractColorsFromId(cellID);
      drawSprite(ctx, screenX, screenY, spriteColors);
    }
  }
};

const handleMouseWheel = (e: WheelEvent) => {
  e.preventDefault();

  const colsOnScreen = Math.ceil(canvas.clientWidth / totalSize);

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

const extractColorsFromId = (id: bigint): string[] => {
  const colorArr: string[] = [];
  let shiftingId: bigint = id;

  for (let i = 0; i < 64; i++) {
    const colorIndex = Number(shiftingId & 3n);
    colorArr.unshift(colors[colorIndex]);

    shiftingId = shiftingId >> 2n;
  }

  return colorArr;
};

const compressColorsToId = (colorArray: string[]): bigint => {
  let accumulatedId = 0n;

  for (let i = 0; i < colorArray.length; i++) {
    const paletteIndex = colors.findIndex((elem) => elem === colorArray[i]);

    accumulatedId = accumulatedId << 2n;

    accumulatedId = accumulatedId | BigInt(paletteIndex);
  }

  return accumulatedId;
};

const drawSprite = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  colorsArray: string[],
) => {
  const pixelSize = spriteSize / 8;

  for (let i = 0; i < 64; i++) {
    const spriteCol = i % 8;
    const spriteRow = Math.floor(i / 8);

    const pixelX = startX + spriteCol * pixelSize + padding / 2;
    const pixelY = startY + spriteRow * pixelSize + padding / 2;

    ctx.fillStyle = colorsArray[i];

    ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
  }
};

window.addEventListener("resize", syncCanvasResolution);
window.addEventListener("wheel", handleMouseWheel, { passive: false });

syncCanvasResolution();
