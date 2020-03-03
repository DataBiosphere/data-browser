/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA tabs.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy, Input, Output, EventEmitter
} from "@angular/core";

// App dependencies
import EntitySpec from "../../files/shared/entity-spec";

// App dependencies

@Component({
    selector: "hca-tab",
    templateUrl: "./hca-tab.component.html",
    styleUrls: ["./hca-tab.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCATabComponent {

    // Inputs
    @Input() activeTab: EntitySpec;
    @Input() tabs: EntitySpec[];

    // Outputs
    @Output() tabSelected = new EventEmitter<EntitySpec[]>();

    /**
     * Public API
     */

    /**
     * Return the set of CSS class names that are applicable to the tab.
     *
     * @param {string} selectedTab
     * @param {string} tabKey
     * @returns {{[p: string]: boolean}}
     */
    public getTabClass(selectedTab: string, tabKey: string): { [className: string]: boolean } {

        return {
            "active": selectedTab === tabKey,
            "hca-tab": true
        };
    }

    /**
     * Handle click on tab - emit event to parent.
     *
     * @param {string} tab
     */
    public onClickTab(tab: EntitySpec[]): void {

        this.tabSelected.emit(tab);
    }

}
