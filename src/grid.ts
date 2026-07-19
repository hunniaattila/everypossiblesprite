// 10px per cell, 10px padding in each direction
const SPRITE_SIZE = 64;

export const renderGrid = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "14px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";

  let totalRows = Math.ceil(canvas.width / SPRITE_SIZE);
  let totalCols = Math.ceil(canvas.height / SPRITE_SIZE);

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      let screenX = col * SPRITE_SIZE;
      let screenY = col * SPRITE_SIZE;

      let localOffset = BigInt(row * totalCols + col);
    }
  }
};
