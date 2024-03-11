import { GamePlugin, GamePluginImpl, LifeCycle, Subscribe } from '@soku-games/core';
import { SnakeGame } from './game';
import { deepClone } from './util';
import { Extra } from './types';

@GamePluginImpl('snake-validator')
export class SnakeValidator extends GamePlugin {
  game: SnakeGame;
  constructor(game: SnakeGame, extra: Extra) {
    super(game, extra);
    this.game = game;
  }

  bindGame() {}

  @Subscribe(LifeCycle.AFTER_STEP)
  checkGameOver() {
    const { game } = this;
    const { data: { snakes, grid } } = game;
    const newGrid = deepClone(grid);
    snakes.forEach((snake) => {
      snake.forEach(([x, y]) => ++newGrid[x][y] > 2);
    });
    if (snakes.some(snake => newGrid[snake[0][0]][snake[0][1]] > 1)) {
      game.allowed = false;
      const result = snakes.map((snake) => newGrid[snake[0][0]][snake[0][1]] > 1 ? '-1' : '+1');
      setTimeout(() => {
        game.end(result.join(';'));
      });
    }
  }
}
