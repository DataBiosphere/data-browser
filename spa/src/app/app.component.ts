/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Top-level application component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";

// App dependencies
import { SetViewStateAction } from "./files/_ngrx/file-facet-list/file-facet-list.actions";
import { AppState } from "./_ngrx/app.state";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent {

    // Locals
    private actionsSubscription: Subscription;

    /**
     * @param {Router} router
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Location} location
     */
    constructor(private router: Router,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private location: Location) {
    }

    /**
     * Privates
     */

    /**
     * Returns true if a filter state is encoded in the query params.
     *
     * @param {ParamMap} paramMap
     * @returns {boolean}
     */
    private isFilterParamSpecified(paramMap: ParamMap): boolean {

        return paramMap.keys.some((key: string) => {
            return key === "filter";
        });
    }

    /**
     * Set up app state from query string parameters, if any.
     */
    private setAppStateFromURL() {

        this.actionsSubscription =
            this.activatedRoute.queryParamMap
                .filter(this.isFilterParamSpecified)
                .take(1)
                .map((paramMap: ParamMap) => {

                    // We have a filter, let's extract it.
                    const filterParam = paramMap.get("filter");
                    let filter;
                    try {
                        filter = JSON.parse(filterParam);
                    }
                    catch (error) {
                        console.log(error);
                        return; // Intentionally returning undefined here
                    }

                    if ( filter && filter.length && filter[0].facetName ) {
                        return filter;
                    }

                    return; // Intentionally returning undefined here
                })
                .filter(filter => !!filter)
                .subscribe((filter) => {

                    let tab;
                    const path = this.location.path().split("?")[0];
                    if ( path === "/files" ) {
                        tab = "files";
                    }
                    else {
                        tab = "specimens";
                    }

                    this.store.dispatch(new SetViewStateAction(tab, filter));
                });
    }

    /**
     * Life cycle hooks
     */

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.actionsSubscription.unsubscribe();
    }

    /**
     * Set up app state from URL, if specified.
     */
    public ngOnInit() {

        this.setAppStateFromURL();
    }
}

