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
import { EntityName } from "../../files/shared/entity-name.model";
import EntitySpec from "../../files/shared/entity-spec";


@Component({
    selector: "pop-layout",
    templateUrl: "pop-layout.component.html",
    styleUrls: ["pop-layout.component.scss"]
})
export class PopLayoutComponent {

    // Inputs
    @Input() activeTab: EntitySpec;
    @Input() tabs: EntitySpec[];

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
     * Returns the active tab, if one exists.
     *
     * @returns {EntitySpec}
     */
    public getActiveTab(): EntitySpec {

        if ( this.activeTab ) {
            return this.activeTab;
        }
        else {
            return {key: "", displayName: ""};
        }
    }

    /**
     * Returns all tab key and display names.
     *
     * @returns {EntitySpec[]}
     */
    public getTabs(): EntitySpec[] {

        if ( this.tabs && this.tabs.length ) {
            return this.tabs;
        }
        else {
            return [{key: "", displayName: ""}];
        }
    }

    /**
     * Handle click on tab - update selected entity in state and return user back to tab key.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        // Only update state if we have a tab key that corresponds to an entity. There are cases, for example the "back
        // to releases" tab key that does not correspond to an entity. In this case, we use projects as the default.
        const tabKey = tab.key;
        const selectedEntity = !!EntityName[tabKey] ? tabKey : EntityName.PROJECTS;
        this.store.dispatch(new EntitySelectAction(selectedEntity));
        
        // Navigate to specified tab key
        this.router.navigate(["/" + tab.key]);
    }
}
