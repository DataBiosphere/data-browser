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

    // Inputs
    @Input() bulkDownloadFeatureDisabled: boolean;
    @Input() matrixFeatureDisabled: boolean;
    @Input() matrixEnabled: boolean;
    @Input() matrixSpeciesSelectionRequired: boolean;
    @Input() v2: boolean;

    // Outputs
    @Output() downloadSelected = new EventEmitter<string>();

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {
        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Returns the download action for matrix - either MATRIX_SPECIES_SELECTION if species selection is required for
     * the current data, or MATRIX if species selection is not required.
     * 
     * Note, this functionality will no longer be required once deep-linking to download related modes (matrix,
     * manifest, terra) is added.
     * 
     * @returns {string}
     */
    public getMatrixDownloadAction(): string {

        if ( this.matrixSpeciesSelectionRequired ) {
            return DownloadViewState.MATRIX_SPECIES_SELECTION;
        }

        return DownloadViewState.MATRIX;
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
