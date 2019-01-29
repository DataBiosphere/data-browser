/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Table indexing placeholder component.
 */


// Core dependencies
import { Component, Input } from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";

// App dependencies
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "hca-table-indexing-placeholder",
    templateUrl: "./hca-table-indexing-placeholder.component.html",
    styleUrls: ["./hca-table-indexing-placeholder.component.scss"],
    animations: [
        trigger(
            "indexingAnimation", [
                transition(":leave", [
                    style({opacity: 1}),
                    animate("1s 0.1s ease-out", style({opacity: 0}))
                ])
            ]
        )
    ]
})

export class HCATableIndexingPlaceholderComponent {

    // Inputs
    @Input() indexing: boolean;
}
