// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild
} from "@angular/core";
import { MatMenuTrigger } from "@angular/material";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileFacetSearchMenuComponent } from "../file-facet-search-menu/file-facet-search-menu.component";
import { FileSearchConfig } from "../file-search/file-search-config.model";
import { FileFacet } from "../shared/file-facet.model";
import { AppState } from "../../_ngrx/app.state";
import { ClearSelectedFileFacetsAction, SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";

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
    fileSearchConfig: FileSearchConfig;
    private store: Store<AppState>;

    // Inputs
    @Input() fileFacet: FileFacet;

    // View child/ren
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @ViewChild(FileFacetSearchMenuComponent) fileSearchMenuComponent: FileFacetSearchMenuComponent;

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
        this.trigger.menuClosed.subscribe(() => {
            this.store.dispatch(new ClearSelectedFileFacetsAction());
        });

        // Focus search box on open of menu
        this.trigger.menuOpened.subscribe(() => {
            setTimeout(() => {
                this.fileSearchMenuComponent.focus();
            }, 300); // Focus input after MD menu animation has completed TODO remove this once menu/search UX is updated
        });

        // Set up search config - currently either file or donor
        this.fileSearchConfig = new FileSearchConfig(this.fileFacet.name);
    }

}
