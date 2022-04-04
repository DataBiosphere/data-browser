/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when hamburger is toggled.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ToggleHamburgerAction implements Action {
    public static ACTION_TYPE = "HAMBURGER.TOGGLED";
    public readonly type = ToggleHamburgerAction.ACTION_TYPE;
}
