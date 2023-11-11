import React from 'react';
import { LifeCycle } from '@soku-games/core';

import { useGameContext } from '../context';
import styles from './index.module.scss';

export const Grid = React.memo(() => {
  const { game } = useGameContext();
  const [grid, setGrid] = React.useState<number[][]>([]);

  React.useEffect(
    () => {
      game?.subscribe(LifeCycle.AFTER_START, () => {
        setGrid(game?.data.grid);
      });
      game?.subscribe(LifeCycle.AFTER_STEP, () => {
        setGrid([...game!.data.grid]);
      });
    },
    [game],
  );

  const { emit } = useGameContext();
  function handleClick(i: number, r: number, c: number) {
    if (i !== 2)
      return;
    emit?.(`${r}${c}`);
  }

  return (
    <>
      {grid.map((row, rowI) =>
        row.map((value, colI) => 
          <div
            key={`${rowI}${colI}`}
            className={[
              value === 2
                ? styles.cell
                : value
                  ? styles['white-cell']
                  : styles['black-cell'],
            ].join(' ')}
            style={{
              top: rowI * 50,
              left: colI * 50,
              backgroundColor: value === 2
                ? '#090'
                : value
                  ? '#ddd'
                  : '#111',
            }}
            onClick={() => handleClick(value, rowI, colI)}
          />,
        ),
      )}
    </>
  );
});
