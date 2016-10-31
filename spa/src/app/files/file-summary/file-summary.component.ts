import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { FileSummary } from "./file-summary";

@Component({
    selector: "bw-file-summary",
    templateUrl: "./file-summary.component.html",
    styleUrls: ["./file-summary.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSummaryComponent {

    @Input() summary: FileSummary;
}
