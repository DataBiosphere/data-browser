/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for a plain old page layout.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { EntitySelectAction } from "../../files/_ngrx/table/table.actions";
import EntitySpec from "../../files/shared/entity-spec";

@Component({
    selector: "pop-layout",
    templateUrl: "pop-layout.component.html",
    styleUrls: ["pop-layout.component.scss"]
})
export class PopLayoutComponent {

    // Inputs
    @Input() tab: EntitySpec[];

    /**
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    public constructor(private router: Router,
                       private store: Store<AppState>) {
    }

    /**
     * Public API
     */

    /**
     * Returns null value for EntitySpec, no need for an active tab.
     *
     * @returns {EntitySpec}
     */
    public getActiveTab(): EntitySpec {

        return {key: "", displayName: ""};
    }

    /**
     * Returns tab key and display name.
     *
     * @returns {EntitySpec[]}
     */
    public getTab(): EntitySpec[] {
        return this.tab;
    }

    /**
     * Handle click on tab - update selected entity in state and return user back to tab key.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        this.store.dispatch(new EntitySelectAction(tab.key));
        this.router.navigate(["/" + tab.key]);
    }
}
