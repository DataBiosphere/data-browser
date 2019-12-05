/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared expression matrices downloads. Contains description of download, and the
 * set of matrix downloads for each species, for the given project.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

@Component({
    selector: "project-download-matrix",
    templateUrl: "./project-download-matrix.component.html",
    styleUrls: ["./project-download-matrix.component.scss"]
})
export class ProjectDownloadMatrixComponent {

    // Template variables
    private FILE_FORMAT_TO_URL = {
        "mtx": "https://math.nist.gov/MatrixMarket/formats.html",
        "csv": "https://en.wikipedia.org/wiki/Comma-separated_values",
        "loom": "http://loompy.org/"
    };

    // Inputs
    @Input('classFontName') classFontName: string;
    @Input() projectMatrixUrls: ProjectMatrixUrls;

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
}
