/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying HCA tabs.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy, Input, Output, EventEmitter
} from "@angular/core";
import EntitySpec from "../_ngrx/table/EntitySpec";

// App dependencies

@Component({
    selector: "hca-tab",
    templateUrl: "./hca-tab.component.html",
    styleUrls: ["./hca-tab.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCATabComponent {

    // Inputs
    @Input() activeTab: EntitySpec;
    @Input() tabs: EntitySpec[];

    // Outputs
    @Output() tabSelected = new EventEmitter<string>();

    /**
     * Public API
     */

    /**
     * Sets Tab Class - active
     *
     * @param {string} selectedTab
     * @param {string} tab
     * @returns {any}
     */
    public getTabClass(selectedTab: string, tab: string) {

        if ( selectedTab === tab ) {

            return "hca-tab active";
        }
        else {

            return "hca-tab";
        }
    }

    /**
     * Handle click on tab - emit event to parent.
     *
     * @param {string} tab
     */
    public onClickTab(tab: string): void {

        this.tabSelected.emit(tab);
    }

}
