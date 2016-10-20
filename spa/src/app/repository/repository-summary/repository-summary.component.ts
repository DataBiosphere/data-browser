import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { RepositorySummary } from "./repository-summary";

@Component({
    selector: "bw-repository-summary",
    templateUrl: "./repository-summary.component.html",
    styleUrls: ["./repository-summary.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositorySummaryComponent {

    @Input() summary: RepositorySummary;

}
