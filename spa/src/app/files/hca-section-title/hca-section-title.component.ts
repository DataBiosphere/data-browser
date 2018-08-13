/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA section title bar.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy, Input
} from "@angular/core";

// App dependencies

@Component({
    selector: "hca-section-title",
    templateUrl: "./hca-section-title.component.html",
    styleUrls: ["./hca-section-title.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCASectionTitleComponent {

    // Inputs
    @Input() showDownload: boolean;
    @Input() title: string;

}
