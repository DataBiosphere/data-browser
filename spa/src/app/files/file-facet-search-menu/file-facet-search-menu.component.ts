// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { FileSearchComponent } from "../file-search/file-search.component";
import { FileSearchConfig } from "../file-search/file-search-config.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { selectFileFacets } from "../_ngrx/file.selectors";
import { ClearKeywordQueryAction, FetchKeywordsRequestAction } from "../../keywords/_ngrx/keyword.actions";
import { selectKeywords } from "../../keywords/_ngrx/keyword.selectors";

@Component({
    selector: "bw-file-facet-search-menu",
    templateUrl: "./file-facet-search-menu.component.html",
    styleUrls: ["./file-facet-search-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetSearchMenuComponent implements OnInit {

    // Privates
    files$: Observable<any[]>; // Search result hits
    fileFacet$: Observable<FileFacet>;
    private store: Store<AppState>;

    // Inputs
    @Input() fileSearchConfig: FileSearchConfig;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // View child/ren
    @ViewChild(FileSearchComponent) fileSearchComponent: FileSearchComponent;

    /**
     * @param store {Store<AppState>}
     */
    constructor(store: Store<AppState>) {

        this.store = store;

    }

    /**
     * Public API
     */

    /**
     * Set focus on search input.
     */
    public focus() {

        this.fileSearchComponent.focus();
    }

    /**
     * Emit close menu event
     */
    public onClickCloseMenu(): void {

        this.closeMenu.emit();
        this.fileSearchComponent.clear();
    }

    /**
     * Dispatch search event to query for hits.
     *
     * @param searchRequest {searchTerm: string, type: string}
     */
    public onSearch(searchRequest: { searchTerm: string, type: string }) {

        // TODO - Keyword Actions
        if (searchRequest.searchTerm.length > 2) {

            return this.store.dispatch(new FetchKeywordsRequestAction(searchRequest.searchTerm, searchRequest.type));
        }

        // Dispatch clear event.
        this.store.dispatch(new ClearKeywordQueryAction());
    }

    /**
     * Handle select of file suggestion in typeahead dropdown - update state.
     *
     * @param event {FileFacetSelectedEvent}
     */
    public onSearchResultSelected(event: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(event));
    }

    /**
     * File has been selected from edit mode (ie file has been selected for removal) - update state.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFileSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up observables, once component has been initialized.
     */
    ngOnInit() {

        // TODO revisit selector/reducer/function thingo here.
        this.fileFacet$ = this.store.select(selectFileFacets)
            .map(state => state.fileFacets)
            .map(facets => _.find(facets, facet => facet.name === this.fileSearchConfig.fileFacetName));

        // Get the list of currently selected files or donors, depending on the type of search being executed
        if ( this.fileSearchConfig.isFileSearch() ) {
            this.files$ = this.store.select(selectKeywords).filter(state => state.type === "file").map(state => state.hits);
        }
        else {
            this.files$ = this.store.select(selectKeywords).filter(state => state.type === "donor").map(state => state.hits);
        }
    }
}
