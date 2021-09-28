/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for a plain old page layout.
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { GetDataLayoutComponentState } from "./get-data-layout.component.state";
import { AppState } from "../../../_ngrx/app.state";
import { FetchFilesFacetsRequestAction } from "../../_ngrx/file-manifest/fetch-files-facets-request.action";
import { selectFilesFacets } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { selectFileSummary } from "../../_ngrx/files.selectors";
import EntitySpec from "../../shared/entity-spec";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";

@Component({
    selector: "get-data-layout",
    templateUrl: "get-data-layout.component.html",
    styleUrls: ["get-data-layout.component.scss"],
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({opacity: 0}),
                animate("750ms ease-out", style({opacity: 1}))
            ])
        ])
    ]
})
export class GetDataLayoutComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();
    
    // Template variables
    public state$ = new BehaviorSubject<GetDataLayoutComponentState>({
        loaded: false
    });
    
    // Inputs
    @Input() tabs: EntitySpec[];
    @Output() tabSelected = new EventEmitter<EntitySpec>();

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Handle click on back button.
     * 
     * @param {EntitySpec} entitySpec
     */
    public onTabSelected(entitySpec: EntitySpec): void {
        
        this.tabSelected.emit(entitySpec);
    }

    /**
     * Clear summary and kill subscriptions on exit of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up state.
     */
    public ngOnInit() {

        // Get the list of facets to display. Must pull these from the files endpoint.
        this.store.dispatch(new FetchFilesFacetsRequestAction());

        // Show loading while file facets and file summary are being fetched.
        combineLatest(
            this.store.pipe(select(selectFilesFacets)),
            this.store.pipe(select(selectFileSummary)),
            this.store.pipe(select(selectSelectedSearchTerms))
        )
            .pipe(
                takeUntil(this.ngDestroy$),
                // Only continue if file facets have been fetched and saved to store
                filter(([filesFacets]) => {
                    return !!filesFacets.length;
                })
            )
            .subscribe(([filesFacets, fileSummary, selectedSearchTerms]) => {

                this.state$.next({
                    filesFacets,
                    fileSummary,
                    loaded: true,
                    selectedSearchTerms
                });
            });
    }
}
