import * as fromFiles from "../files/reducer";
import * as fromKeywords from "../keywords/reducer";

console.log("boardwalk store");
// console.log("******")
// console.log(fromFiles, fromFiles.reducers)
// console.log("******")
export interface BoardwalkStore extends fromFiles.State, fromKeywords.State {}
