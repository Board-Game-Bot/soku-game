import { GamePlugin, GamePluginImpl } from '@soku-games/core';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { ReversiGame } from './game';
import { Extra } from './types';
import { App } from './jsx';

@GamePluginImpl('reversi-screen')
export class ReversiScreen extends GamePlugin {
  bindGame(
    game: ReversiGame,
    extra: Extra,
  ): void | Record<string, any> {
    const { el } = extra;
    const ratio = {
      width: el.clientWidth,
      height: el.clientHeight,
    };
    function display() {
      const root = createRoot(el);
      root.render(<App ratio={ratio} game={game} {...extra} />);
    }
    display();
    return ;
  }
}
