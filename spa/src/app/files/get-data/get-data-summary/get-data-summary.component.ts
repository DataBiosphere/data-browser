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
import { GetDataViewState } from "../get-data-view-state.model";
import { AppState } from "../../../_ngrx/app.state";
import { selectFileSummary } from "../../_ngrx/file.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { FileSummary } from "../../file-summary/file-summary";
import { SearchTerm } from "../../search/search-term.model";
import { Term } from "../../shared/term.model";

@Component({
    selector: "get-data-summary",
    templateUrl: "./get-data-summary.component.html",
    styleUrls: ["./get-data-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GetDataSummaryComponent implements OnInit {

    // Inputs
    @Input() selectedDiseases: Term[];
    @Input() selectedDonorDiseases: Term[];
    @Input() selectedGenusSpecies: Term[];
    @Input() selectedLibraryConstructionApproaches: Term[];
    @Input() selectedOrgans: Term[];
    @Input() selectedOrganParts: Term[];
    @Input() selectedPairedEnds: Term[];
    @Input() viewState: GetDataViewState;

    // Template variables
    public selectFileSummary$: Observable<FileSummary>;
    public selectedSearchTerms$: Observable<SearchTerm[]>;

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Set up state.
     */
    public ngOnInit() {

        // Grab the counts etc
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        // Grab the current set of selected search terms
        this.selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));
    }
}
