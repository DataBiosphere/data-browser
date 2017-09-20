import * as fromFiles from "../files/files.reducer";
import * as fromKeywords from "../keywords/reducer";
import { AuthState } from "../auth/_ngrx/auth.state";

export interface BoardwalkStore extends
    fromFiles.FilesState,
    fromKeywords.State,
    AuthState {}
