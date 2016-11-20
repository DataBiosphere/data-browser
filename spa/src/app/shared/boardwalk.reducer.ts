import { ActionReducer } from "@ngrx/store";

import { Dictionary } from "./dictionary";

import * as fromFiles from "../files/reducer";
import * as fromKeywords from "../keywords/reducer";

console.log("boardwalk reducers");
// console.log("from files", fromFiles, fromFiles.reducers);
export const boardWalkReducers: Dictionary<ActionReducer<any>> = Object.assign({}, fromFiles.reducers, fromKeywords.reducers);
