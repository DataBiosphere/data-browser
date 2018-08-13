/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA project table details.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy, Input
} from "@angular/core";

// App dependencies

@Component({
    selector: "hca-project-table-detail",
    templateUrl: "./hca-project-table-detail.component.html",
    styleUrls: ["./hca-project-table-detail.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAProjectTableDetailComponent {

    // Inputs
    @Input() tabs = [];
}
