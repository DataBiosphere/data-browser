/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper added around ng-content inside of hca-content-ellipsis, used as a marker so ng-content width can be determined
 * by hca-content-ellipsis (see HCAContentEllipsis.textElementRef).
 */

// Core dependencies
import { Component } from "@angular/core";

@Component({
    selector: "hca-ellipsis-text",
    templateUrl: "./hca-ellipsis-text.component.html",
    styleUrls: ["./hca-ellipsis-text.component.scss"],
})
export class HCAEllipsisTextComponent {}
