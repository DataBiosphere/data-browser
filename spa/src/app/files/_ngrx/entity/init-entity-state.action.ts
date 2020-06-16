/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Action dispatched when entity state is not yet cached and needs to be initialized.
 */

// App dependencies
import { Action } from "@ngrx/store";

export class InitEntityStateAction implements Action {
    
    public static ACTION_TYPE = "FILE.FACET.INIT_ENTITY_STATE";
    public readonly type = InitEntityStateAction.ACTION_TYPE;
}
