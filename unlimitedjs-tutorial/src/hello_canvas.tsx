import { T } from "../../node_modules/timeline-monad/dist/esm/timeline-monad.js";

const _canvas = document.getElementById('canvas1');
const canvas = (_canvas == null)
  ? {} as HTMLCanvasElement
  : _canvas as HTMLCanvasElement;

const pointerTL = T(self => {
  canvas.onmousemove = e =>
    self.now = { x: e.clientX, y: e.clientY };
});

const drawTL = T(self => {
  const _ctx = canvas.getContext('2d');
  const ctx = (_ctx == null)
    ? {} as CanvasRenderingContext2D
    : _ctx;
  const timeline = self.sync(pointer => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pointer.x - 10, pointer.y - 10, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();
  });
});

const timeline = pointerTL.sync(pointer =>
  drawTL.now = pointer
);