/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data downloads/export options, and handles corresponding select functionality on an
 * indivicual options.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";

@Component({
    selector: "get-data-options",
    templateUrl: "./get-data-options.component.html",
    styleUrls: ["./get-data-options.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GetDataOptionsComponent {

    // Template variables
    public portalURL: string;

    // Outputs
    @Output() downloadSelected = new EventEmitter<string>();

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {

        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Handle click on start - emit event to parent.
     *
     * @param {string} download
     */
    public onStartGetData(download: string) {

        this.downloadSelected.emit(download);
    }
}
