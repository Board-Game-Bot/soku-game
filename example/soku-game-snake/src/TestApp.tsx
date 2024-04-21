import './core';
import './screen';
import { useEffect, useRef } from 'react';
import { buildGame, Game, LifeCycle, NewGenerator } from '@soku-games/core';

export const TestApp = () => {
  const divRef = useRef<HTMLDivElement | null>();
  const gameRef = useRef<Game>();
  
  useEffect(() => {
    const game = buildGame({
      name: 'snake',
      plugins: [
        'snake-validator',
        {
          name: 'snake-screen',
          extra: {
            el: divRef.current,
            couldControl: [true, true],
            emit: (stepStr: string) => game?.step(stepStr),
          },
        },
      ],
    });
    const data = NewGenerator('snake').generate();
    game?.prepare(data);
    gameRef.current = game;
    game?.subscribe([LifeCycle.AFTER_END], () => console.log('end'));
    return () => {
      game?.end('');
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <button onClick={() => gameRef.current?.start()}>开始</button>
      <div ref={el => { divRef.current = el; }} style={{ aspectRatio: '16 / 9', width: 1600, backgroundColor: 'black' }} />
    </div>
  );
};