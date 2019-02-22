/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component responsible for displaying an individual facet and its terms, as well as functionality around selecting
 * terms and displaying edit facet (term) menu.
 * HCA specific
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy, OnInit
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

// App dependencies
import { CamelToSpacePipe } from "../../cc-pipe/camel-to-space/camel-to-space.pipe";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { Term } from "../shared/term.model";
import { AppState } from "../../_ngrx/app.state";
import EntitySpec from "../shared/entity-spec";
import { SelectFileFacetAction } from "../_ngrx/file-facet-list/file-facet-list.actions";
import { selectSelectedEntity } from "../_ngrx/file.selectors";

@Component({
    selector: "hca-file-facet",
    templateUrl: "./hca-file-facet.component.html",
    styleUrls: ["./hca-file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HCAFileFacetComponent implements OnInit {

    // Privates
    private store: Store<AppState>;
    public selectedEntity$: Observable<EntitySpec>;

    // Inputs
    @Input() fileFacet: FileFacet;

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
     * Returns facet name in correct format.
     * disease is renamed "Known Diseases".
     * libraryConstructionApproach is renamed to "Library Construction Method".
     * @param {string} facetName
     * @returns {string}
     */
    public getFacetName(facetName: string): string {

        if ( facetName === "disease" ) {

            return "Known Diseases";
        }
        if ( facetName === "libraryConstructionApproach" ) {

            return "Library Construction Method";
        }
        else {
            return (new CamelToSpacePipe().transform(facetName));
        }
    }

    /**
     * Returns the name of the activeTab
     * @param {EntitySpec} activeTab
     * @returns {string}
     */
    public getLabelName(activeTab: EntitySpec): string {

        return activeTab.displayName;
    }

    /**
     * Term has been selected from edit mode, cancel click event (to prevent close of menu) and emit select
     * event to parent.
     *
     * @param event {Event}
     * @param fileFacet {FileFacet}
     * @param term {Term}
     */
    public selectFacetTerm(event: Event, fileFacet: FileFacet, term: Term) {

        // Prevent menu from closing (on click)
        event.stopPropagation();
        event.preventDefault();

        this.store.dispatch(new SelectFileFacetAction(new FileFacetSelectedEvent(fileFacet.name, term.name)));
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
     * Life cycle hooks
     */

    /**
     * Set up initial state of component.
     */
    ngOnInit() {

        // Determine the current selected tab
        this.selectedEntity$ = this.store.select(selectSelectedEntity);
    }
}
