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
import * as _ from "lodash";

// App dependencies
import { SelectFileFacetAction } from "../actions/select-file-facet.action";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { selectFileFacets } from "../files.reducer";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { FileFacet } from "../shared/file-facet.model";

@Component({
    selector: "bw-file-facet-menu",
    templateUrl: "./file-facet-menu.component.html",
    styleUrls: ["./file-facet-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetMenuComponent implements OnInit {

    // Privates
    private store: Store<BoardwalkStore>;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // Inputs
    @Input() fileFacetName: string;
    fileFacet$: Observable<FileFacet>;

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
     * Term has been selected from edit mode, emit select event to parent.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Emit close menu event
     */
    onClickCloseMenu(): void {

        this.closeMenu.emit();
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up subscriptions.
     */
    ngOnInit() {

        // this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
        this.fileFacet$ = this.store.select(selectFileFacets)
            .map(state => state.fileFacets)
            .map(facets => _.find(facets, facet => facet.name === this.fileFacetName));
    }
}
