/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Noop action.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class NoOpAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.NOOP";
    public readonly type = NoOpAction.ACTION_TYPE;
}
