import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { FilesDispatcher } from "./shared/files.dispatcher";
import { FilesService } from "./shared/files.service";
import {
    selectFileSummaryLoading, selectFileSummary, selectFileFacetsLoading,
    selectUserStateFileFacets, State
} from "./reducer/index";
import { FileFacet } from "./file-facets/file-facets";
import { FileSummary } from "./file-summary/file-summary";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.css"]
})
export class FilesComponent implements OnInit {

    summaryLoading$: Observable<boolean>;
    summary$: Observable<FileSummary>;
    facetsLoading$: Observable<boolean>;
    facets$: Observable<FileFacet[]>;

    constructor(private route: ActivatedRoute,
                private store: Store<State>,
                private fileDispatcher: FilesDispatcher) { }

    ngOnInit() {
        this.initSelectors();
        this.getQueryParams();
    }

    onTermSelected(termFacet: {facet: string; term: string}) {
        this.fileDispatcher.addFileFilter(termFacet);
    }

    private initSelectors() {
        this.summaryLoading$ = selectFileSummaryLoading(this.store);
        this.summary$ = selectFileSummary(this.store);
        this.facetsLoading$ = selectFileFacetsLoading(this.store);
        this.facets$ = selectUserStateFileFacets(this.store);

    }

    private getQueryParams() {

        this.route.queryParams
            .map((query) => {

                if (query && query["filters"] && query["filters"].length) {
                    return {
                        filters: JSON.parse(decodeURIComponent(query["filters"]))
                    };
                }
                else {
                    return {};
                }
            })
            .subscribe((query) => {
                this.fileDispatcher.receiveFileFilters(query);
            });
    }
}
