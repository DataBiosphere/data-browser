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
import { EntityName } from "../../files/shared/entity-name.model";
import { SearchTermUrlService } from "../../files/search/url/search-term-url.service";
import EntitySpec from "../../files/shared/entity-spec";
import { BackToEntityAction } from "../../files/_ngrx/entity/back-to-entity.action";

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
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    public constructor(private searchTermUrlService: SearchTermUrlService,
                       private router: Router,
                       private store: Store<AppState>) {}

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

        // Only update state if we have a tab key that corresponds to an entity. In the case that the tab key that does
        // not correspond to an entity, use projects as the default.
        const tabKey = tab.key;
        const selectedEntity = !!EntityName[tabKey] ? tabKey : EntityName.PROJECTS;
        this.store.dispatch(new BackToEntityAction(selectedEntity));
        
        // Navigate to specified tab key
        this.router.navigate(["/" + tab.key], {
            queryParamsHandling: "preserve"
        });
    }
}
