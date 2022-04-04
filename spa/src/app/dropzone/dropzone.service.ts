/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Dropzone-specific utility functions.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { DropErrorCode } from "./drop-error-code.model";

@Injectable()
export class DropzoneService {
    // Dropzone errors
    public TOO_MANY_FILES_REJECTION = {
        code: DropErrorCode.TOO_MANY_FILES,
        message: "Too many files",
    };
    public FILE_TOO_LARGE = (maxSize) => ({
        code: DropErrorCode.FILE_TOO_LARGE,
        message: `File is larger than ${maxSize} bytes`,
    });

    /**
     * Returns the files associated with the specified event.
     *
     * @param {any} evt
     * @returns {boolean}
     */
    public fromEvent(evt): File[] {
        if (this.isDragEvent(evt)) {
            return this.getDraggedFiles(evt);
        }

        return [];
    }

    /**
     * Return the files associated with the specified drag event.
     *
     * @param {DragEvent} evt
     * @returns {File[]}
     */
    public getDraggedFiles(evt) {
        return Array.from(evt.dataTransfer.files) as File[];
    }

    /**
     * Return the set of files selected via a file input.
     *
     * @param {any} evt - Triggered from change event on file input.
     * @returns {File[]}
     */
    public getInputFiles(evt: any) {
        if (evt.target && evt.target.files) {
            return Array.from(evt.target.files);
        }

        return [];
    }

    /**
     * Returns true if event is of type DragEvent.
     *
     * @param {any} value
     * @returns {boolean}
     */
    public isDragEvent(value: any) {
        return !!value.dataTransfer;
    }

    /**
     * Returns true if the drag event has valid files associated with it.
     *
     * @param {any} evt - DragEvent or Event (from file input change event)
     * @returns {boolean}
     */
    public isEventWithFiles(evt): boolean {
        // Handle change event from file input
        if (!evt.dataTransfer) {
            return !!evt.target && !!evt.target.files;
        }

        // Handle dropped files
        return evt.dataTransfer.types.some(
            (type) => type === "Files" || type === "application/x-moz-file"
        );
    }

    /**
     * Returns true if the number of files that were dropped is valid.
     *
     * @param {number} fileCount
     * @param {boolean} multiple
     * @returns {boolean}
     */
    public isFileCountValid(fileCount: number, multiple: boolean): boolean {
        if (fileCount > 1 && !multiple) {
            return false;
        }

        return true;
    }
    /**
     * Returns true if the file size of all files dropped is less than the max.
     *
     * @param {Files[]} files
     * @param {number} maxSize
     * @returns {boolean}
     */
    public isFileSizeValid(files: File[], maxSize: number): boolean {
        if (!maxSize) {
            return true;
        }

        return files.every((file) => file.size < maxSize);
    }
}
