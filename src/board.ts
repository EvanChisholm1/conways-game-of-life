export default class Board {
  private value: {
    [key: string]: boolean;
  };

  constructor() {
    this.value = {};
  }

  getCell(x: number, y: number) {
    const ret = this.value[`${x}:${y}`];
    if (typeof ret === 'undefined') return false;
    else return ret;
  }

  setCell(x: number, y: number, cellValue: boolean) {
    this.value[`${x}:${y}`] = cellValue;
  }

  forEach(callback: (pos: { x: number; y: number }) => void) {
    for (const key of Object.keys(this.value)) {
      const [x, y] = key.split(':').map((v) => parseInt(v));
      callback({ x, y });
    }
  }
}
