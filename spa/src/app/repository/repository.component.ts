import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { RepositoryService } from "./shared";
import { RepositorySummary } from "./repository-summary";
import { RepositoryFiles } from "./repository-files";

@Component({
    selector: "bw-repository",
    templateUrl: "./repository.component.html",
    styleUrls: ["./repository.component.css"]
})
export class RepositoryComponent implements OnInit {

    summary$: Observable<RepositorySummary>;
    summaryLoaded$: Observable<boolean>;
    files$: Observable<RepositoryFiles>;
    filesLoaded$: Observable<boolean>;

    constructor(private repositoryService: RepositoryService) { }

    ngOnInit() {

        this.initObservables();
        this.initData();
    }

    private initObservables() {
        this.summary$ = this.repositoryService.getRepositorySummary();
        this.summaryLoaded$ = this.repositoryService.getRepositorySummaryLoaded();
        this.files$ = this.repositoryService.getRepositoryFiles();
        this.filesLoaded$ = this.repositoryService.getRepositoryFilesLoaded();
    }

    private initData() {
        this.repositoryService.fetchRepositorySummary();
        this.repositoryService.fetchRepositoryFiles();
    }
}
