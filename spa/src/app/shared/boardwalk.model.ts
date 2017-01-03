import * as fromFiles from "../files/files.reducer";
import * as fromKeywords from "../keywords/reducer";

export interface BoardwalkStore extends
    fromFiles.FilesState,
    fromKeywords.State {}
