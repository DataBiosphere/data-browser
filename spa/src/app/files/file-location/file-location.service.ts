/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for requesting and polling Azul for signed URLs of files.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Observable, of, BehaviorSubject } from "rxjs";
import {
    catchError,
    retry,
    skip,
    switchMap,
    take,
    takeUntil,
} from "rxjs/operators";

// App dependencies
import { FileLocation } from "./file-location.model";
import { FileLocationAPIResponse } from "./file-location-api-response.model";
import { FileLocationStatus } from "./file-location-status.model";
import { APIEndpoints } from "../../config/api-endpoints.model";

@Injectable()
export class FileLocationService {
    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {}

    /**
     * Kick off request and corresponding polling of location (signed URL) of specified file.
     *
     * @param {string} fileUrl
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<FileLocation>}
     */
    public fetchFileLocation(
        fileUrl: string,
        killSwitch$: Observable<boolean>
    ): Observable<FileLocation> {
        // Create subject for letting listeners know the current status of the file location request
        const fileLocation$ = new BehaviorSubject<FileLocation>({
            status: FileLocationStatus.INITIATED,
        });

        // Set up polling while file location generation is in progress
        const polling$ = fileLocation$
            .pipe(
                skip(1) // Skip the first INITIATED value
            )
            .subscribe((fileLocation: FileLocation) => {
                if (fileLocation.status === FileLocationStatus.IN_PROGRESS) {
                    this.pollFileLocation(
                        fileLocation,
                        fileLocation$,
                        killSwitch$
                    );
                    return;
                }
                // Unsubscribe for all other status - downloading, completed, failed etc.
                polling$.unsubscribe();
            });

        // Update file URL to include "/fetch", if necessary.
        const fetchFileUrl = this.buildFetchFileUrl(fileUrl);

        // Kick off initial request for file location
        this.requestFileLocation(fetchFileUrl, fileLocation$, killSwitch$);

        // Give listeners access to current stats
        return fileLocation$.asObservable();
    }

    /**
     * Prepend "/fetch" to the path of the specified file URL, if not already included. See #1596.
     *
     * @param {string} fileUrl
     * @returns {string}
     */
    private buildFetchFileUrl(fileUrl: string): string {
        const url = new URL(fileUrl);
        const path = url.pathname;
        if (path.indexOf(APIEndpoints.FETCH) !== 0) {
            url.pathname = `${APIEndpoints.FETCH}${path}`;
        }

        return url.toString();
    }

    /**
     * Convert API response to FE format.
     *
     * @param {FileLocationAPIResponse} response
     * @returns {FileLocation}
     */
    private bindFileLocationAPIResponse(
        response: FileLocationAPIResponse
    ): Observable<FileLocation> {
        return of({
            fileUrl: response.Location,
            retryAfter: response["Retry-After"],
            status: this.translateAPIResponseStatus(response.Status),
        });
    }

    /**
     * An error occurred during a file location generation: create dummy response object with error values to indicate
     * error state.
     *
     * @returns {FileLocationAPIResponse}
     */
    private handleFileLocationAPIResponseError(): Observable<FileLocationAPIResponse> {
        return of({
            Location: "",
            "Retry-After": 0,
            Status: 500,
        });
    }

    /**
     * Wait for length of time specified in the current file location status and try requesting the file location again.
     *
     * @param {FileLocation} fileLocation
     * @param {BehaviorSubject<FileLocation>} fileLocation$
     * @param {Observable<boolean>} killSwitch$
     */
    private pollFileLocation(
        fileLocation: FileLocation,
        fileLocation$: BehaviorSubject<FileLocation>,
        killSwitch$: Observable<boolean>
    ) {
        interval(fileLocation.retryAfter * 1000)
            .pipe(take(1))
            .subscribe(() => {
                this.requestFileLocation(
                    fileLocation.fileUrl,
                    fileLocation$,
                    killSwitch$
                );
            });
    }

    /**
     *  Request the file location for the file with the specified URL. Returns location of either retry URL if file
     *  location (signed URL) is not yet generated, or the final file location if ready for download.
     *
     * @param {string} url - either initial file URL, or intermediate polling URL to retrieve file location
     * @param {BehaviorSubject<FileLocation>} fileLocation$
     * @param {Observable<boolean>} killSwitch$
     */
    private requestFileLocation(
        url: string,
        fileLocation$: BehaviorSubject<FileLocation>,
        killSwitch$: Observable<boolean>
    ) {
        return this.httpClient
            .get<FileLocationAPIResponse>(url)
            .pipe(
                retry(2),
                catchError(this.handleFileLocationAPIResponseError.bind(this)),
                switchMap(this.bindFileLocationAPIResponse.bind(this)),
                takeUntil(killSwitch$)
            )
            .subscribe((nextStatus) => {
                fileLocation$.next(nextStatus);
            });
    }

    /**
     * Convert the value of the file location response status to FE-specific value.
     *
     * @param {number} code
     * @returns {FileLocationStatus}
     */
    private translateAPIResponseStatus(code: number): FileLocationStatus {
        if (code === 301) {
            return FileLocationStatus.IN_PROGRESS;
        }
        if (code === 302) {
            return FileLocationStatus.COMPLETED;
        }
        return FileLocationStatus.FAILED;
    }
}
