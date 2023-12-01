import { GamePlugin, GamePluginImpl, LifeCycle } from '@soku-games/core';
import { SnakeGame } from './game';
import { deepClone } from './util';

@GamePluginImpl('snake-validator')
export class SnakeValidator extends GamePlugin {
  bindGame(game: SnakeGame) {
    game.subscribe(LifeCycle.AFTER_STEP, () => {
      const { snakes, grid } = game.data;
      const newGrid = deepClone(grid);
      snakes.forEach((snake) => {
        snake.forEach(([x, y]) => ++newGrid[x][y] > 2);
      });
      if (snakes.some(snake => newGrid[snake[0][0]][snake[0][1]] > 1)) {
        const result = snakes.map((snake) => newGrid[snake[0][0]][snake[0][1]] > 1 ? '-1' : '+1');
        setTimeout(() => {
          game.end(result.join(';'));
        });
      }
    });
  }
}
