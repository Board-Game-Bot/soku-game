import { GamePlugin } from './game-plugin';
import { Game } from './game';

const CONTAINER = new Map<string, { new(game: Game, extra: any): GamePlugin }>();

export function GamePluginImpl(tag: string): ClassDecorator {
  return (target) => {
    CONTAINER.set(tag, target as any);
    // const originalConstructor = target.constructor;
    target.constructor = function (...args: any[]) {
      console.log('tag', target);
      // originalConstructor.call(this, ...args);
    };
  };
}

export function NewPlugin(tag: string, game: Game, extra?: any): GamePlugin {
  const MAKER = CONTAINER.get(tag);
  if (!MAKER) {
    throw new Error(`The GamePlugin \`${tag}\` has not been implemented.`);
  }
  return new MAKER(game, extra);
}
