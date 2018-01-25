// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    OnInit,
    ViewChild
} from "@angular/core";
import { Store } from "@ngrx/store";
import { MatMenuTrigger } from "@angular/material";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { ClearSelectedFileFacetsAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { AppState } from "../../_ngrx/app.state";

/**
 * Simple wrapper component containing logic for determining if term menu should be displayed. Facets with less than
 * 10 terms have no menu, facets with more than 10 menu display a term menu.
 * 
 * This wrapper component is required as Angular does not currently allow dynamic addition of directives (for example,
 * the MD menu trigger directive). Once Angular adds this functionality, this wrapper is no longer required and the MD
 * menu trigger can be applied directly (and dynamically) to the MD card inside the file facet component. 
 */
@Component({
    selector: "bw-file-facet-wrapper",
    templateUrl: "./file-facet-wrapper.component.html",
    styleUrls: ["./file-facet-wrapper.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetWrapperComponent implements OnInit {

    // Privates
    private store: Store<AppState>;

    // Inputs
    @Input() fileFacet: FileFacet;
    
    // View child/ren
    @ViewChild(MatMenuTrigger) termMenuTrigger: MatMenuTrigger;

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
     * Returns true if there are more than 10 terms for this facet. Otherwise, false.
     * 
     * @returns {boolean}
     */
    public isDisplayTermMenu(): boolean {
        
        return this.fileFacet.termCount >= 10;
    }

    /**
     * Close the menu for this facet. This event is emitted from the child menu component.
     */
    public onCloseMenu() {

        this.termMenuTrigger.closeMenu();
    }

    /**
     * Lifecycle hooks
     */

    /**
     * Set up initial state of component.
     */
    ngOnInit() {
        
        // No setup required if menu does not exist for this facet (ie, if facet has 10 or less terms)
        if ( !this.termMenuTrigger ) {
            return;
        }

        // Clear the selected facet in the store, on close of any open menu.
        this.termMenuTrigger.onMenuClose.subscribe(() => {
            this.store.dispatch(new ClearSelectedFileFacetsAction());
        });
    }
}
