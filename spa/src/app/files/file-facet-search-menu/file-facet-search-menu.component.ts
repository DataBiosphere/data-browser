// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    Output
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

@Component({
    selector: "bw-file-facet-search-menu",
    templateUrl: "./file-facet-search-menu.component.html",
    styleUrls: ["./file-facet-search-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetSearchMenuComponent implements OnInit {

    // Privates
    private store: Store<BoardwalkStore>;
    private fileFacet$: Observable<FileFacet>;
    private files$: Observable<any[]>;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // Inputs
    @Input() fileFacetName: string;


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
    }

    /**
     * Dispatch search event to query for hits.
     *
     * @param searchRequest {searchTerm: string, type: string}
     */
    public onSearch(searchRequest: {searchTerm: string, type: string}) {

        if ( searchRequest.searchTerm.length > 2 ) {

            return this.store.dispatch({
                type: ACTIONS.REQUEST_KEYWORDS_QUERY,
                payload: searchRequest
            });
        }

        return this.store.dispatch({type: ACTIONS.CLEAR_KEYWORDS_QUERY, payload: {
            type: searchRequest.type
        }});
    }

    /**
     * Handle select of file suggestion - update state.
     *
     * @param event {FileFacetSelectedEvent}
     */
    public onTermSelected(event: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(event));
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

        // TODO revisit selector/reducer/function thingo here.
        this.files$ = selectKeywordFiles(this.store);
    }
}
