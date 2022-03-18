import { Action, createReducer, on } from "@ngrx/store";
import { edictItem, executedPerson } from "src/app/lesson1/classStore";
import * as fromActions from "../actions"

export interface EdictState {
    edicts: edictItem[]
}

const initialState: EdictState = {
    edicts: []
}

const edictsReducer = createReducer(
    initialState,
    on(fromActions.loadEdicts, (state) => ({ 
        ...state 
    })),
    on(fromActions.loadEdictsSuccess, (state, { edicts }) => ({
        ...state, 
        edicts: edicts
    })),
    on(fromActions.editEdictSuccess, (state, { editEdict }) => ({
        ...state, 
        edicts: state.edicts?.map(
            edict => {
                if (edict.id === editEdict.id) {
                    let currentEdict = {
                        id: editEdict.id, 
                        header:  editEdict.header, 
                        description:  editEdict.description, 
                        dayOfComplete:  editEdict.dayOfComplete, 
                        isSelectEdictState:  editEdict.isSelectEdictState,
                        executedPerson:  editEdict.executedPerson
                      };
                    return currentEdict;
                }
                else {
                    return edict
                }                
            }
        )
    }))
)

export function reducer(state: EdictState | undefined, action: Action): EdictState {
    return edictsReducer(state, action)
}
