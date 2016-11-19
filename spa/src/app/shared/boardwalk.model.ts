import * as fromFiles from "../files/reducer";
import * as fromKeywords from "../keywords/reducer";

export interface State extends fromFiles.State, fromKeywords.State {}
