import { Game } from './game';

export abstract class GamePlugin {
  pool: Record<string, any[]> = {};
  game: Game;
  extra?: any;
  constructor(game: Game, extra?: any) {
    this.game = game;
    this.extra = extra;

    Object.entries(this.pool).forEach(([event, fns]) => {
      fns.forEach(fn => this.game.subscribe(event as any, fn));
    });
  }
  abstract bindGame(game: Game, extra?: any): void | Record<string, any>;
}
