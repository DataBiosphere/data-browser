/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component backing file facet menus.
 */

// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    Output
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { selectFileFacets } from "../_ngrx/file.selectors";

@Component({
    selector: "bw-file-facet-menu",
    templateUrl: "./file-facet-menu.component.html",
    styleUrls: ["./file-facet-menu.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetMenuComponent implements OnInit {

    // Privates
    private store: Store<AppState>;

    // Output
    @Output() closeMenu = new EventEmitter<void>();

    // Inputs
    @Input() fileFacetName: string;
    fileFacet$: Observable<FileFacet>;

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

        this.fileFacet$ = this.store.pipe(
            select(selectFileFacets),
            map(state => state.fileFacets),
            map(facets => _.find(facets, facet => facet.name === this.fileFacetName))
        );
    }
}
