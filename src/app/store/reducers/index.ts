import { ActionReducerMap } from '@ngrx/store';
import * as fromEdicts from './edicts.reducers';

export interface State {
  edictObjects: fromEdicts.EdictState,
}

export const reducers: ActionReducerMap<State> = {
  edictObjects: fromEdicts.reducer
}