/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Complete application state.
 */

import { AuthState } from "../auth/_ngrx/auth.state";
import { ConfigState } from "../config/_ngrx/config.state";
import { FileState } from "../files/_ngrx/file.state";
import { KeywordState } from "../keywords/_ngrx/keyword.state";

export interface AppState extends AuthState, ConfigState, FileState, KeywordState {}
