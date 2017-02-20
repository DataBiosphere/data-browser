// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
} from "@angular/core";

// App dependencies
import { FileSummary } from "./file-summary";

/**
 * Component displaying three summary counts: files, donors, and file size.
 */
@Component({
    selector: "bw-file-summary",
    templateUrl: "./file-summary.component.html",
    styleUrls: ["./file-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FileSummaryComponent {

    // Inputs
    @Input() summary: FileSummary;
}
