/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Complete application state.
 */

// App dependencies
import { AuthState } from "../auth/_ngrx/auth.state";
import { ConfigState } from "../config/_ngrx/config.state";
import { FileState } from "../files/_ngrx/file.state";
import { HttpState } from "../http/_ngrx/http.state";
import { KeywordState } from "../keywords/_ngrx/keyword.state";
import { SystemState } from "../system/_ngrx/system.state";
import { TerraState } from "../files/_ngrx/terra/terra.state";

export interface AppState extends AuthState, ConfigState, FileState, HttpState, KeywordState, SystemState, TerraState {}
