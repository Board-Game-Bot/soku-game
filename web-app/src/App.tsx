import { buildGame, Game, NewGenerator } from '@soku-games/core';

import 'soku-game-snake';
import 'soku-game-reversi';
import { createEffect, createSignal, For } from 'solid-js';

export function App() {
  const [gameName, setGameName] = createSignal('snake');

  const games = ['snake', 'reversi'];

  return (
    <>
      <For each={games}>
        {(gameName) => 
          <button onClick={() => setGameName(gameName)}>
            {gameName}
          </button>
        }
      </For>
      <TheGame gameName={gameName()} />
    </>
  );
}

interface Props {
  gameName: string;
}

const TheGame = (props: Props) => {
  let game: Game;
  let ref: HTMLDivElement;

  function handlePrepare() {
    game = buildGame({
      name: props.gameName,
      plugins: [
        {
          name: `${props.gameName}-screen`,
          extra: {
            el: ref,
            couldControl: [true, true],
            emit: (stepStr: string) => {
              game?.step(stepStr);
            },
          },
        },
      ],
    })!;
    const data = NewGenerator(props.gameName).generate();
    game.prepare(data);
  }

  function handleStart() {
    game?.start();
  }

  createEffect(() => {
    handlePrepare();
  });

  return (
    <>
      <button>prepare</button>
      <button onClick={handleStart}>start {props.gameName}</button>
      <div ref={el => ref = el} />
    </>
  );
};