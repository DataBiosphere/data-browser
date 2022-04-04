/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when hamburger is closed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class CloseHamburgerAction implements Action {
    public static ACTION_TYPE = "HAMBURGER.CLOSED";
    public readonly type = CloseHamburgerAction.ACTION_TYPE;
}
