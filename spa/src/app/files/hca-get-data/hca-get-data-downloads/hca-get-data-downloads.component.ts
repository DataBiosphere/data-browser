/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data downloads - select download type.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { DownloadViewState } from "../download-view-state.model";

@Component({
    selector: "hca-get-data-downloads",
    templateUrl: "./hca-get-data-downloads.component.html",
    styleUrls: ["./hca-get-data-downloads.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HCAGetDataDownloadsComponent {

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
