// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild
} from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ClearSelectedFacetAction, SelectFileFacetAction } from "../actions/file-actions";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";
import { CGLMenuTrigger } from "../file-facet/cgl-menu-trigger.directive";


/**
 * Component responsible for displaying an individual facet with a search interface, as well as functionality around
 * the search itself.
 */
@Component({
    selector: "bw-file-facet-search",
    templateUrl: "./file-facet-search.component.html",
    styleUrls: ["./file-facet-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetSearchComponent implements OnInit {

    // Privates
    private store: Store<BoardwalkStore>;

    // Inputs
    @Input() fileFacet: FileFacet;
    @ViewChild(CGLMenuTrigger) trigger: CGLMenuTrigger;

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
     * Close the menu for this facet. This event is emitted from the child menu component.
     */
    public onCloseMenu() {

        this.trigger.closeMenu();
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent) {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up initial state of component.
     */
    ngOnInit() {

        // Clear the selected facet in the store, on close of any open menu.
        this.trigger.onMenuClose.subscribe(() => {
            this.store.dispatch(new ClearSelectedFacetAction());
        });
    }
}
