import { createSelector } from '@ngrx/store';
import { executedPerson, edictItem } from 'src/app/lesson1/classStore';
import * as fromReducers from '../reducers';

export const selectEdicts = (state: fromReducers.State) => state.edictObjects;

export const selectorEdicts = createSelector(selectEdicts, (state: {edicts: edictItem[]}) => state.edicts);
export const selectorCountEdicts = createSelector(selectorEdicts, (edicts: edictItem[]) => edicts.length);
export const selectorEdictsTypesCount = createSelector(selectorEdicts,
    (edicts: edictItem[]) => { 
        let result = [];
        for (const item in executedPerson) {
          let countType = edicts?.filter(edict => edict.executedPerson === item).length || 0;
          result.push({ executorType: item, count: countType });
      }
      return result;
    }
);