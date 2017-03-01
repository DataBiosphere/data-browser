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

// App dependencies
import { SelectFileFacetAction } from "../actions/file-actions";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { selectFileFacetByName } from "../files.reducer";
import { selectKeywordFiles } from "../../keywords/reducer/index";
import { ACTIONS } from "../../shared/boardwalk.actions";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { FileFacet } from "../shared/file-facet.model";
import { FileSearchComponent } from "../file-search/file-search.component";

@Component({
    selector: "bw-file-facet-search-menu",
    templateUrl: "./file-facet-search-menu.component.html",
    styleUrls: ["./file-facet-search-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetSearchMenuComponent implements OnInit {

    // Privates
    private files$: Observable<any[]>;
    private fileFacet$: Observable<FileFacet>;
    private store: Store<BoardwalkStore>;

    // Inputs
    @Input() fileFacetName: string;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    @ViewChild(FileSearchComponent) fileSearchComponent: FileSearchComponent;

    /**
     * @param store {Store<BoardwalkStore>}
     */
    constructor(store: Store<BoardwalkStore>) {

        this.store = store;

    }

    /**
     * Public API
     */

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

        if (searchRequest.searchTerm.length > 2) {

            return this.store.dispatch({
                type: ACTIONS.REQUEST_KEYWORDS_QUERY,
                payload: searchRequest
            });
        }

        // Dispatch clear event.
        this.store.dispatch({
            type: ACTIONS.CLEAR_KEYWORDS_QUERY, payload: {
                type: searchRequest.type
            }
        });
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
        this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);

        this.files$ = selectKeywordFiles(this.store);

    }


    focus() {
        this.fileSearchComponent.focus();
    }
}
