import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { RepositoryFiles } from "./repository-files";

@Component({
    selector: "bw-repository-files",
    templateUrl: "./repository-files.component.html",
    styleUrls: ["./repository-files.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryFilesComponent {

    @Input() files: RepositoryFiles;
}
