import { createAction, props } from "@ngrx/store";
import { edictItem } from "src/app/lesson1/classStore";

// List
export const loadEdicts = createAction(
    '[Edict List] Load Edicts'
);
export const loadEdictsSuccess = createAction(
    '[Edict List] Load Edicts Success',
    props<{ edicts: edictItem[] }>()
);
  
// Edit
export const editEdict = createAction(
    '[Edict List] Edit Edict',
    props<{ editEdict: edictItem }>()
);  
export const editEdictSuccess = createAction(
    '[Edict List] Edit Edict Success',
    props<{ editEdict: edictItem }>()
);