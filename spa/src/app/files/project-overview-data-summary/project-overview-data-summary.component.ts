/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project data summary information.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";
import {
    getColumnDescription,
    getColumnDisplayName
} from "../table/table-methods";

@Component({
    selector: "project-overview-data-summary",
    templateUrl: "./project-overview-data-summary.component.html",
    styleUrls: ["./project-overview-data-summary.component.scss"]
})
export class ProjectOverviewDataSummaryComponent {

    // Inputs
    @Input() dataSummaries: KeyValuePair[];

    // Template variables
    public getColumnDescription = getColumnDescription;
    public getColumnDisplayName = getColumnDisplayName;

    public constructor(private configService: ConfigService) {}

    /**
     * Returns the class name for the value.
     *
     * @param {string} key
     * @param {string} value
     * @returns {{[p: string]: boolean}}
     */
    public getValueClassName(key: string, value: string): { [className: string]: boolean } {

        return {
            "break": this.breakShortName(key, value),
            "fontsize-xxs": true,
            "rhs": true
        }
    }

    /**
     * Returns any library construction approach value of interest "Smart-seq2" with a link to a page in the Data Portal.
     *
     * @param {string} values
     * @returns {string}
     */
    public linkifyValues(values: string): string {

        const linkedValue = "Smart-seq2";

        if ( values.includes(linkedValue) ) {

            const portalURL = this.configService.getPortalUrl();
            const hrefOfValue = `${portalURL}/pipelines/smart-seq2-workflow`;
            const innerHTMLOfValue = `<a href=${hrefOfValue} target="_blank" rel="noopener noreferrer">${linkedValue}</a>`;

            return values.replace(linkedValue, innerHTMLOfValue);
        }

        return values;
    }

    /**
     * Returns true if the value for key "projectShortname" is not spaced.
     *
     * @param {string} key
     * @param {string} value
     * @returns {boolean}
     */
    private breakShortName(key: string, value: string): boolean {

        if ( key !== "projectShortname" ) {

            return false;
        }

        if ( !value ) {

            return false;
        }

        return !value.includes(" ");
    }
}
