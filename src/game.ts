import Board from './board';

export default class Game {
  board: Board;
  cellSize: number = 30;
  zoom: number = 1;

  constructor() {
    this.board = new Board();
  }

  render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const cellSize = this.cellSize * this.zoom;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00';
    this.board.forEach(({ x, y }) => {
      if (this.board.getCell(x, y)) {
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    });
  }

  update() {
    const newBoard = new Board();

    this.board.forEach(({ x, y }) => {
      const shouldSurive = shouldCellSurvive(x, y, this.board);
      if (shouldSurive) {
        newBoard.setCell(x, y, true);
      }

      const neighbors = getNeighbors(x, y);
      for (const neighbor of neighbors) {
        const shouldNeighborSurvive = shouldCellSurvive(
          neighbor.x,
          neighbor.y,
          this.board,
        );
        if (shouldNeighborSurvive) {
          newBoard.setCell(neighbor.x, neighbor.y, true);
        }
      }
    });

    this.board = newBoard;
  }

  reset() {
    this.zoom = 1;
    this.board = new Board();
  }

  changeZoom(amount: number) {
    this.zoom += amount;
  }
}

function getNeighbors(x: number, y: number): { x: number; y: number }[] {
  const neighbors = [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x + 1, y: y },
    { x: x + 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x - 1, y: y + 1 },
    { x: x - 1, y: y },
  ];

  return neighbors;
}

function shouldCellSurvive(x: number, y: number, board: Board): boolean {
  const currentCell = board.getCell(x, y);

  const neighbors = getNeighbors(x, y);

  // const neighbors = [
  //   board.getCell(x - 1, y - 1),
  //   board.getCell(x, y - 1),
  //   board.getCell(x + 1, y - 1),
  //   board.getCell(x + 1, y),
  //   board.getCell(x, y + 1),
  //   board.getCell(x, y + 1),
  //   board.getCell(x - 1, y + 1),
  //   board.getCell(x - 1, y),
  // ];

  let neighborsAlive = 0;
  for (const neighbor of neighbors) {
    if (board.getCell(neighbor.x, neighbor.y)) neighborsAlive++;
  }
  console.log(neighborsAlive);

  if (currentCell) {
    console.log('current cell is alive');
    if (neighborsAlive <= 1 || neighborsAlive >= 4) {
      console.log('cell should die');
      return false;
    } else {
      console.log('cell should live');
      return true;
    }
  } else {
    console.log('cell is dead');
    if (neighborsAlive === 3) {
      console.log('cell should live');
      return true;
    } else {
      console.log('cell should die');
      return false;
    }
  }
}
