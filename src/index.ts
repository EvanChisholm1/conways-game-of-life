import Game from './game';

const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const stepButton = document.querySelector('#step-button');

let zoom = 1;

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
if (!canvas) throw new Error('No Canvas element found');

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error('no ctx');

let isMouseDown = false;

const cellSize = 30;
const numberofColumns = canvas.offsetWidth / cellSize;
const numberOfRows = canvas.offsetHeight / cellSize;

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;

let interval: number | null;

const game = new Game();
game.render(ctx, canvas);
function start() {
  interval = setInterval(() => {
    game.update();
    game.render(ctx as CanvasRenderingContext2D, canvas as HTMLCanvasElement);
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
  game.render(ctx as CanvasRenderingContext2D, canvas as HTMLCanvasElement);
});

function draw(e: MouseEvent) {
  if (isMouseDown) {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    game.board.setCell(x, y, true);
    game.render(ctx!, canvas!);
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
  if (isMouseDown) {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    game.board.setCell(x, y, true);
    game.render(ctx, canvas);
  }
});
canvas.addEventListener('wheel', (e) => {
  console.log(e);
  console.log(++zoom);
});
