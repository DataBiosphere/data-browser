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
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";

// App dependencies
import { FileFacetTermSelectedEvent } from "../shared/file-facet-term-selected.event";
import { AppState } from "../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { selectSelectedEntity } from "../_ngrx/file.selectors";
import EntitySpec from "../shared/entity-spec";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";
import { Term } from "../shared/term.model";
import { TermSortService } from "../sort/term-sort.service";

@Component({
    selector: "hca-file-facet",
    templateUrl: "./hca-file-facet.component.html",
    styleUrls: ["./hca-file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HCAFileFacetComponent implements OnInit {

    // Privates
    public selectedEntity$: Observable<EntitySpec>;

    // Inputs
    @Input() fileFacet: FileFacet;

    /**
     * @param {FileFacetDisplayService} fileFacetDisplayService
     * @param {TermSortService} termSortService
     * @param {Store<AppState>} store
     */
    constructor(private fileFacetDisplayService: FileFacetDisplayService,
                private termSortService: TermSortService,
                private store: Store<AppState>) {
    }

    /**
     * Returns facet name in correct format.
     * disease is renamed "Known Diseases".
     * libraryConstructionApproach is renamed to "Library Construction Method".
     * @param {string} facetName
     * @returns {string}
     */
    public getFacetName(facetName: string): string {
        
        return this.fileFacetDisplayService.getFileFacetDisplayName(facetName);
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
     * Sort and return the list of terms for this facet.
     * 
     * @param {string} facetName
     * @param {Term[]} terms
     * @returns {Term[]}
     */
    public getSortedTerms(facetName: string, terms: Term[]): Term[] {

        const sortedTerms = [...terms];
        this.termSortService.sortTerms(facetName, sortedTerms);
        return sortedTerms;
    }

    /**
     * Term or entity has been selected from edit mode, cancel click event (to prevent close of menu) and emit select
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

        this.store.dispatch(new SelectFileFacetTermAction(fileFacet.name, term.name));
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param fileFacetSelectedEvent {FileFacetTermSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FileFacetTermSelectedEvent) {

        const facetName = fileFacetSelectedEvent.facetName;
        const termName = fileFacetSelectedEvent.termName;
        const selected = fileFacetSelectedEvent.selected;
        this.store.dispatch(new SelectFileFacetTermAction(facetName, termName, selected));
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up initial state of component.
     */
    ngOnInit() {

        // Determine the current selected tab
        this.selectedEntity$ = this.store.pipe(select(selectSelectedEntity));
    }
}
