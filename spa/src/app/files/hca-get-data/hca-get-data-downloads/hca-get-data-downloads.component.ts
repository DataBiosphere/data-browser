/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data downloads - select download type.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";

@Component({
    selector: "hca-get-data-downloads",
    templateUrl: "./hca-get-data-downloads.component.html",
    styleUrls: ["./hca-get-data-downloads.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HCAGetDataDownloadsComponent {

    // Template variables
    public portalURL: string;

    // Inputs
    @Input() matrixEnabled: boolean;

    // Outputs
    @Output() downloadSelected = new EventEmitter<string>();

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {
        this.portalURL = this.configService.getPortalURL();
    }

    /**
     * Returns true if whether matrix is supported or not, is not yet determined.
     *
     * @param {boolean} supported
     * @returns {boolean}
     */
    public isMatrixSupportedLoading(supported: boolean): boolean {

        return !(supported === true || supported === false);
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
