/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table loading placeholder component.
 */


// Core dependencies
import { Component, Input } from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";

// App dependencies
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "hca-table-loading-placeholder",
    templateUrl: "./hca-table-loading-placeholder.component.html",
    styleUrls: ["./hca-table-loading-placeholder.component.scss"],
    animations: [
        trigger(
            "loadingAnimation", [
                transition(":leave", [
                    style({opacity: 1}),
                    animate("300ms 0.1s ease-out", style({opacity: 0}))
                ])
            ]
        )
    ]
})

export class HCATableLoadingPlaceholderComponent {

    // Inputs
    @Input() loading: boolean;
}
