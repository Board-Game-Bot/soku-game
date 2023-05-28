// @ts-nocheck

import { Validator, ValidatorImplement } from 'soku-games';

@ValidatorImplement('__example__')
export class __Example__Validator extends Validator {
  checkImpl(s: string): boolean {
    return true;
  }

  afterImpl(s: string): void {}
}
