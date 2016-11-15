import { ActionReducer } from "@ngrx/store";

import { Dictionary } from "./dictionary";

import * as fromFiles from "../files/reducer";
import * as fromKeywords from "../keywords/reducer";

export const reducers: Dictionary<ActionReducer<any>> = Object.assign({}, fromFiles.reducers, fromKeywords.reducers);
