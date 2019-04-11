/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when all selected file facet terms are to be removed and default state is restored.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearSelectedTermsAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.CLEAR_SELECTED_TERMS";
    public readonly type = ClearSelectedTermsAction.ACTION_TYPE;
    constructor() {}
}
