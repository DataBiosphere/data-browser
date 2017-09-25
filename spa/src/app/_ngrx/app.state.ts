import { FileState } from "../files/_ngrx/file.state";
import { AuthState } from "../auth/_ngrx/auth.state";
import { KeywordState } from "../keywords/_ngrx/keyword.state";

export interface AppState extends FileState, AuthState, KeywordState {}
