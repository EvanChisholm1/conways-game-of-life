import Game from './game';

const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const stepButton = document.querySelector('#step-button');
const resetButton = document.querySelector('#reset-button');
const zoomInButton = document.querySelector('#zoomin-button');
const zoomOutButton = document.querySelector('#zoomout-button');

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('No Canvas element found');

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('no ctx');

let isMouseDown = false;

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;

let interval: number | null;

const game = new Game(ctx, canvas);
game.render();
function start() {
  interval = setInterval(() => {
    game.update();
    game.render();
  }, 1000 / 5);
}

function stop() {
  console.log('stopping ');
  interval && clearInterval(interval);
}

stopButton?.addEventListener('click', () => stop());
startButton?.addEventListener('click', () => start());
stepButton?.addEventListener('click', () => {
  game.update();
  game.render();
});
resetButton?.addEventListener('click', () => {
  game.reset();
  stop();
});
zoomInButton?.addEventListener('click', () => {
  game.zoom = game.zoom * 2;
  game.render();
});
zoomOutButton?.addEventListener('click', () => {
  game.zoom = game.zoom / 2;
  game.render();
});

function draw(e: MouseEvent) {
  if (isMouseDown) {
    const cellSize = game.cellSize * game.zoom;
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    game.board.setCell(x, y, true);
    game.render();
  }
}

window.addEventListener('mousedown', (e) => {
  isMouseDown = true;
});
window.addEventListener('mouseup', (e) => {
  isMouseDown = false;
});

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  draw(e);
});
canvas.addEventListener('mouseup', (e) => {
  isMouseDown = false;
  draw(e);
});
canvas.addEventListener('mousemove', (e) => {
  draw(e);
});
