/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared expression matrices downloads. Contains description of download, and the
 * set of matrix downloads for each species, for the given project. This component is v1-specific. For v2, see
 * ProjectFDownloadMatrix.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { MatrixService } from "../shared/matrix.service";
import { MatrixFormat } from "../shared/matrix-format.model";
import { FileDownloadLink } from "../../shared/file-download/file-download.model";

@Component({
    selector: "project-download-expression-matrix",
    templateUrl: "./project-download-expression-matrix.component.html",
    styleUrls: ["./project-download-expression-matrix.component.scss"]
})
export class ProjectDownloadExpressionMatrixComponent {

    // Template variables
    private FILE_FORMAT_TO_URL = {
        "mtx": "https://math.nist.gov/MatrixMarket/formats.html",
        "csv": "https://en.wikipedia.org/wiki/Comma-separated_values",
        "loom": "http://loompy.org/"
    };

    // Inputs
    @Input() projectTitle: string;
    @Input('classFontName') classFontName: string;
    @Input() projectMatrixUrls: ProjectMatrixUrls;

    /**
     * @param {MatrixService} matrixService
     */
    constructor(private matrixService: MatrixService) {}
    
    /**
     * Returns the count of available file formats.
     *
     * @param {string[]} fileFormats
     * @returns {number}
     */
    public countOfFileFormats(fileFormats: string[]): number {

        return fileFormats.length;
    }

    /**
     * Returns associated file format link specified by file format.
     *
     * @param {string} fileFormat
     * @returns {string}
     */
    public getFileFormatLink(fileFormat: string): string {

        return this.FILE_FORMAT_TO_URL[fileFormat];
    }

    /**
     * Returns true when the *ngFor loop is the last (but also not the first) iteration.
     *
     * @param {boolean} first
     * @param {boolean} last
     * @returns {boolean}
     */
    public isAndDelimited(first: boolean, last:boolean): boolean {

        return !first && last;
    }

    /**
     * Returns true when the *ngFor loop is not the first or the last iteration.
     *
     * @param {boolean} first
     * @param {boolean} last
     * @returns {boolean}
     */
    public isCommaDelimited(first: boolean, last:boolean): boolean {

        return !first && !last
    }

    /**
     * Track click on download matrix URL.
     *
     * @param {string} projectTitle 
     * @param {FileDownloadLink} link
     */
    public onMatrixDownloadUrlClicked(projectTitle: string, link: FileDownloadLink) {

        this.matrixService.trackDownloadProjectMatrix(projectTitle, link.url, MatrixFormat[link.name]);
    }

    /**
     * Track matrix URL copied to clipboard.
     *
     * @param {string} projectTitle
     * @param {FileDownloadLink} link
     */
    public onMatrixDownloadUrlCopiedToClipboard(projectTitle: string, link: FileDownloadLink) {

        this.matrixService.trackCopyToClipboardProjectMatrixLink(projectTitle, link.url, MatrixFormat[link.name]);
    }
}
