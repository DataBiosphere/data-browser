/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data summary.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnInit, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { selectFileSummary } from "../../_ngrx/file.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { FileSummary } from "../../file-summary/file-summary";
import { SearchTerm } from "../../search/search-term.model";
import { Term } from "../../shared/term.model";
import { DownloadViewState } from "../download-view-state.model";

@Component({
    selector: "hca-get-data-summary",
    templateUrl: "./hca-get-data-summary.component.html",
    styleUrls: ["./hca-get-data-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCAGetDataSummaryComponent implements OnInit {

    // Inputs
    @Input() selectedGenusSpecies: Term[];
    @Input() selectedLibraryConstructionApproaches: Term[];
    @Input() selectedPairedEnds: Term[];
    @Input() viewState: DownloadViewState;

    // Template variables
    public selectFileSummary$: Observable<FileSummary>;
    public selectedSearchTerms$: Observable<SearchTerm[]>;

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {
    }

    /**
     * Public API
     */

    /**
     * Update state.
     */
    public ngOnInit() {

        // Grab the counts etc
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        // Grab the current set of selected search terms
        this.selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));
    }
}
