import { Event } from '../types';
import { GamePlugin } from '../game-plugin';

export const Subscribe = (evt: Event | Event[]) => {
  return <MethodDecorator>((target: GamePlugin, _, descriptor) => {
    const { pool = {} } = target;
    if (!target.pool) target.pool = pool;
    const bind = (evt: Event, fn: any) => {
      let list = pool[evt];
      if (!list) list = pool[evt] = [];
      list.push(fn);
    };

    if (Array.isArray(evt)) evt.forEach(ev => bind(ev, descriptor.value));
    else bind(evt, descriptor.value);
  });
};