/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Anchor point directive to which components can be added dynamically.
 */

// Core dependencies
import { Directive } from "@angular/core";

@Directive({
    selector: "[viewContainer]",
})
export class ViewContainerDirective {}
