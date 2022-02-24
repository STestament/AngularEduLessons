import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, withLatestFrom, tap } from 'rxjs';
import * as fromActions from '../actions'
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import { Store, select  } from '@ngrx/store';
import { EdictsService } from 'src/app/lessonServices/edicts.service';
import { edictItem } from "src/app/lesson1/classStore";

@Injectable()
export class EdictsEffects {

  constructor(private _edictsService: EdictsService,
     private actions$: Actions,
     private store$: Store<fromReducers.State>) {

     }

     getEdicts$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.loadEdicts),
          withLatestFrom(this.store$.pipe(select(fromSelectors.selectorEdicts))),
          switchMap(() => 
                this._edictsService.filterEdicts("", "").pipe(
                    map((_edictItem: edictItem[]) => {
                        return fromActions.loadEdictsSuccess({ edicts: _edictItem});
                    })
                )
            )
        )
     ); 

     editEdict$ = createEffect(() =>
       this.actions$.pipe(
         ofType(fromActions.editEdict),
         switchMap((action) => {
           return this._edictsService.updateEdict(action.editEdict).pipe(
             map(() => 
             fromActions.editEdictSuccess({ editEdict: action.editEdict }))
           );
         })
       )
     );    
}