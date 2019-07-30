/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying error page.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectErrorMessage, selectRequestUrl } from "../../http/_ngrx/http.selectors";
import { ClearErrorStateAction } from "../../http/_ngrx/http-clear-state-error.actions";
import { selectSelectedEntity } from "../../files/_ngrx/file.selectors";
import EntitySpec from "../../files/shared/entity-spec";


@Component({
    selector: "error",
    templateUrl: "error.component.html",
    styleUrls: ["error.component.scss"]
})
export class ErrorComponent implements OnDestroy, OnInit {

    // Public variables
    public errorMessage$: Observable<string>;
    public requestUrl$: Observable<string>;
    public selectedEntity$: Observable<EntitySpec>;

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Public API
     */

    /**
     * Returns routerLink with previously stored tab key.
     *
     * @param {EntitySpec} selectedEntity
     * @returns {string[]}
     */
    public getRouterLink(selectedEntity: EntitySpec): string[] {

        if ( selectedEntity ) {
            return ["/" + selectedEntity.key];
        }
        else {
            return ["/projects"];
        }
    }

    /**
     * Returns current selected tab key from the store and display name.
     *
     * @returns {EntitySpec[]}
     */
    public getTab(selectedEntity: EntitySpec): EntitySpec[] {
        return [{key: selectedEntity.key, displayName: "Back"}];
    }

    /**
     * Life cycle hooks
     */

    /**
     * Clear error message on exit of error page.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearErrorStateAction());
    }

    /**
     * Set up component - grab error message from state, if any.
     */
    public ngOnInit() {

        // Grab reference to error message and request URL
        this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
        this.requestUrl$ = this.store.pipe(select(selectRequestUrl));

        // Determine the current selected tab (from table)
        this.selectedEntity$ = this.store.pipe(select(selectSelectedEntity));
    }
}
