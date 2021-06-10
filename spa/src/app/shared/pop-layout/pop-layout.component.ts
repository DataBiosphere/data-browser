/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for a plain old page layout.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import EntitySpec from "../../files/shared/entity-spec";

@Component({
    selector: "pop-layout",
    templateUrl: "pop-layout.component.html",
    styleUrls: ["pop-layout.component.scss"]
})
export class PopLayoutComponent {

    // Inputs/outputs
    @Input() activeTab: EntitySpec;
    @Input() tabs: EntitySpec[];
    @Output() tabSelected = new EventEmitter<EntitySpec>();

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
    public isTabsVisible(): boolean {

        return !!(this.tabs && this.tabs.length); 
    }

    /**
     * Handle click on tab - update selected entity in state and return user back to tab key.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {
        
        this.tabSelected.emit(tab);
    }
}
