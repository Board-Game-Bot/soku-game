import { Game, GameImpl } from '@soku-games/core';
import { initialGrid } from './util';
import { dir } from './constants';

type P = [number, number];

@GameImpl('snake')
export class SnakeGame extends Game {
  data: {
    grid: number[][];
    r: number;
    c: number;
    snakes: P[][];
  } = {
    grid: [],
    r: 0,
    c: 0,
    snakes: [],
  };

  _end(reason: string): void {}

  _prepare(strData: string): void {
    /**
     * 数据格式：r c mask
     * r: 行数
     * c: 列数
     * mask: 砖块扁平化后的一维字符串
     */
    const { r, c, grid } = initialGrid(strData);

    const snakes: P[][] = (() => {
      // snake 0
      const snake0: P[] = [[r - 2, 1]];
      const snake1: P[] = [[1, c - 2]];
      return [snake0, snake1];
    })();

    const data = { r, c, grid, snakes };

    Object.assign(this, { data });
  }

  _start(): void {
    console.log('Snake Game Start!');
  }

  _step(stepStr: string): void {
    /**
     * 数据格式：{d0}{d1}{incr}
     * d0: 0蛇方向
     * d1: 1蛇方向
     * incr: 是否增长
     * 方向：0 1 2 3 从上开始顺时针
     * snake[0..n] 0 是蛇头，顺延到蛇尾
     */
    const [d0, d1, incr] = stepStr.split('').map((c) => +c);
    const { data } = this;

    [d0, d1].forEach((d, i) => {
      const snake = data.snakes[i];
      const h = [...snake[0]];
      const nh = h.map((x, j) => x + dir[j][d]);

      snake.unshift(nh as P);
      if (!incr) {
        snake.pop();
      }
    });
  }

  isValidFormat(stepStr: string): boolean {
    return /^[0-3]{2}[0-1]$/.test(stepStr);
  }
}
