/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, interval, Observable, of, merge , Subject } from "rxjs";
import { catchError, map, retry, switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { GenusSpecies } from "./genus-species.model";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixUrlRequest } from "./matrix-url-request.model";
import { MatrixUrlRequestStatus } from "./matrix-url-request-status.model";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { FileManifestService } from "./file-manifest.service";
import { HttpService } from "../http/http.service";
import { ManifestResponse } from "./manifest-response.model";
import { ManifestStatus } from "./manifest-status.model";
import { MatrixUrlRequestHttpResponse } from "./matrix-url-request-http-response.model";
import { MatrixUrlRequestSpecies } from "./matrix-url-request-species.model";
import { ProjectMatrixUrls } from "./project-matrix-urls.model";
import { SearchFacetTerm } from "../search/search-facet-term.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";
import { GTMService } from "../../shared/analytics/gtm.service";
import { GAEntityType } from "../../shared/analytics/ga-entity-type.model";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GADimension } from "../../shared/analytics/ga-dimension.model";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { SpeciesMatrixUrls } from "./species-matrix-urls.model";

@Injectable()
export class MatrixService {

    /**
     * @param {ConfigService} configService
     * @param {GTMService} gtmService
     * @param {HttpService} httpService
     * @param {FileManifestService} manifestService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService,
                private gtmService: GTMService,
                private httpService: HttpService,
                private manifestService: FileManifestService,
                private searchTermHttpService: SearchTermHttpService,
                private httpClient: HttpClient) {
    }

    /**
     * Determine the overall status of the set of specified matrix URL request/s. The number of requests depends on the
     * number of species included in the current data). The matrix URL request starts with an initial request for the
     * current data, but can spawn subsequent requests for species other than homo sapiens, as specified in the response
     * from the initial POST.
     * 
     * - 0 matrix URL requests - NOT_STARTED
     * - 1 matrix URL request with status MANIFEST_IN_PROGRESS - MANIFEST_IN_PROGRESS
     * - if any matrix URL requests have failed - FAILED
     * - if any matrix URL requests are in progress - IN_PROGRESS
     * - else, COMPLETED
     * 
     * @param {MatrixUrlRequest[]} matrixUrlRequests
     * @returns {MatrixUrlRequestStatus}
     */
    public calculateOverallMatrixUrlRequestStatus(matrixUrlRequests: MatrixUrlRequest[]): MatrixUrlRequestStatus {

        // Matrix URL request has not yet started
        if ( matrixUrlRequests.length === 0 ) {
            return MatrixUrlRequestStatus.NOT_STARTED;
        }

        // Matrix URL request has started, manifest is currently being generated
        if ( matrixUrlRequests.length === 1 &&
            this.isMatrixUrlRequestInitiated(matrixUrlRequests[0]) ) {
            return MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS;
        }

        // Overall status is in progress if any individual request is in progress
        const inProgress = matrixUrlRequests.find(request => this.isMatrixUrlRequestInProgress(request));
        if ( inProgress ) {
            return MatrixUrlRequestStatus.IN_PROGRESS;
        }

        // Indicate failed status if any individual request has failed
        const failed = matrixUrlRequests.find(request => this.isMatrixUrlRequestFailed(request));
        if ( failed ) {
            return MatrixUrlRequestStatus.FAILED;
        }

        // Otherwise we can consider the request/s complete
        return MatrixUrlRequestStatus.COMPLETED
    }


    /**
     * Remove all file types other than matrix. Add matrix file type if not already selected. Required for when we are
     * querying the manifest end point before request the matrix URL.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    public createMatrixableSearchTerms(
        searchTerms: SearchTerm[]): SearchTerm[] {

        let matrixAdded = false;
        const matrixSearchTerms = searchTerms.reduce((accum, searchTerm) => {

            // Check if this search term is for a file format
            if ( searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT ) {

                // Only allow MATRIX to be added as a file format
                if ( searchTerm.getSearchValue() === FileFormat.MATRIX ) {
                    accum.push(searchTerm);
                    matrixAdded = true;
                }
            }
            // Add search terms for all other facets, as is
            else {
                accum.push(searchTerm);
            }
            return accum;
        }, []);

        // If matrix wasn't in the set of selected terms, add it now
        if ( !matrixAdded ) {
            matrixSearchTerms.push(new SearchFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX));
        }

        return matrixSearchTerms;
    }

    /**
     * Request the set of possible matrix file formats.
     *
     * @param {Catalog} catalog
     * @returns {Observable<string[]>}
     */
    public fetchFileFormats(catalog: Catalog): Observable<string[]> {

        const url = this.configService.getMatrixFormatsUrl();
        const params = this.httpService.createIndexParams(catalog, {});
        return this.httpClient.get<any>(url, {params});
    }

    /**
     * Fetch the set of matrix URLs, if any, that are available for the specified project.
     *
     * @param {Catalog} catalog
     * @param {Map<string, ProjectMatrixUrls>} projectMatrixUrls
     * @param {string} entityId
     */
    public fetchProjectMatrixURLs(
        catalog: Catalog, projectMatrixUrls: Map<string, ProjectMatrixUrls>, entityId: string): Observable<ProjectMatrixUrls> {

        // If we already have the matrix URLs for this project, return the cached version
        if ( projectMatrixUrls.has(entityId) ) {
            return of(projectMatrixUrls.get(entityId));
        }

        // Otherwise we don't have the matrix URLs for this project cached, request them from the server
        return forkJoin(
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.HOMO_SAPIENS, "csv.zip"),
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.HOMO_SAPIENS, "loom"),
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.HOMO_SAPIENS, "mtx.zip"),
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.MUS_MUSCULUS, "csv.zip"),
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.MUS_MUSCULUS, "loom"),
            this.getProjectMatrixUrl(catalog, entityId, GenusSpecies.MUS_MUSCULUS, "mtx.zip")
        ).pipe(
            map(([humanCSVUrl, humanLoomUrl, humanmMtxUrl, mouseCSVUrl, mouseLoomUrl, mouseMtxUrl]) => {

                const humanSpeciesMatrixUrls =
                    new SpeciesMatrixUrls(GenusSpecies.HOMO_SAPIENS, humanCSVUrl, humanLoomUrl, humanmMtxUrl);
                
                const mouseSpeciesMatrixUrls =
                    new SpeciesMatrixUrls(GenusSpecies.MUS_MUSCULUS, mouseCSVUrl, mouseLoomUrl, mouseMtxUrl);
                
                const urlsBySpecies = new Map<GenusSpecies, SpeciesMatrixUrls>([
                    [GenusSpecies.HOMO_SAPIENS, humanSpeciesMatrixUrls],
                    [GenusSpecies.MUS_MUSCULUS, mouseSpeciesMatrixUrls]
                ]);
                return new ProjectMatrixUrls(entityId, urlsBySpecies);
            })
        );
    }

    /**
     * Request manifest URL then kick off matrix URL request.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @param {Observable<boolean>} killSwitch$
     * @returns {Observable<MatrixUrlRequest | MatrixUrlRequestSpecies>}
     */
    public requestMatrixUrl(
        catalog: Catalog,
        searchTerms: SearchTerm[],
        matrixFormat: MatrixFormat,
        killSwitch$: Observable<boolean>): Observable<MatrixUrlRequest | MatrixUrlRequestSpecies> {

        // Create subjects for letting listeners know the current status of the Matrix URL request, as well as the set
        // of species that the Matrix URL request includes.
        const matrixUrlRequest$ = new Subject<MatrixUrlRequest>();
        const matrixUrlRequestSpecies$ = new Subject<MatrixUrlRequestSpecies>();

        const manifestRequest$ =
            this.requestFileManifestUrl(catalog, searchTerms, killSwitch$)
                .subscribe((manifestResponse: ManifestResponse) => {
                    
                    // Manifest URL request is complete - kick off matrix URL request
                    if ( manifestResponse.status === ManifestStatus.COMPLETE ) {
                        manifestRequest$.unsubscribe();
                        return this.sendRequestMatrixUrl(
                            manifestResponse, matrixFormat, matrixUrlRequestSpecies$, matrixUrlRequest$, killSwitch$);
                    }

                    // Manifest URL request failed - update matrix response to indicate failure
                    if ( manifestResponse.status === ManifestStatus.FAILED ) {
                        manifestRequest$.unsubscribe();
                        matrixUrlRequest$.next({
                            status: MatrixUrlRequestStatus.FAILED
                        } as MatrixUrlRequest);
                        return;
                    }

                    // Manifest URL request is in progress - update matrix status
                    matrixUrlRequest$.next({
                        status: MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS
                    } as MatrixUrlRequest);
                });

        return merge(matrixUrlRequest$.asObservable(), matrixUrlRequestSpecies$.asObservable());
    }

    /**
     * Returns true if matrix request is completed.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestCompleted(request: MatrixUrlRequest): boolean {

        return request.status === MatrixUrlRequestStatus.COMPLETED;
    }

    /**
     * Returns true if matrix request has failed.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestFailed(request: MatrixUrlRequest): boolean {

        return request.status === MatrixUrlRequestStatus.FAILED;
    }

    /**
     * Returns true if matrix request has been initiated.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestInitiated(request: MatrixUrlRequest): boolean {

        return request.status === MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS;
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestInProgress(request: MatrixUrlRequest): boolean {

        return request.status === MatrixUrlRequestStatus.IN_PROGRESS;
    }

    /**
     * Returns true if matrix request has not yet started.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestNotStarted(request: MatrixUrlRequest): boolean {

        return request.status === MatrixUrlRequestStatus.NOT_STARTED;
    }

    /**
     * Build up and send GTM event to track a matrix request from "get data" flow.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {MatrixFormat} fileFormat
     */
    public trackRequestCohortMatrix(selectedSearchTerms: SearchTerm[], fileFormat: MatrixFormat) {

        const query = this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
        const event = {
            category: GACategory.MATRIX,
            action: GAAction.REQUEST,
            label: query,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MATRIX,
                [GADimension.FILE_FORMAT]: fileFormat
            }
        };
        
        this.gtmService.trackEvent(event);
    }

    /**
     * Track click on matrix download link from "get data" flow.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} matrixUrl
     */
    public trackDownloadCohortMatrix(selectedSearchTerms: SearchTerm[], matrixUrl: string) {

        const query = this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
        const event = {
            category: GACategory.MATRIX,
            action: GAAction.DOWNLOAD,
            label: query,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MATRIX_LINK,
                [GADimension.ENTITY_URL]: matrixUrl
            }
        };
        
        this.gtmService.trackEvent(event);
    }

    /**
     * Track click on copy to clipboard of the generated matrix download link from "get data" flow.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} matrixUrl
     */
    public trackCopyToClipboardCohortMatrixLink(selectedSearchTerms: SearchTerm[], matrixUrl: string) {

        const query = this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
        const event = {
            category: GACategory.MATRIX,
            action: GAAction.COPY_TO_CLIPBOARD,
            label: query,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MATRIX_LINK,
                [GADimension.ENTITY_URL]: matrixUrl
            }
        };
        
        this.gtmService.trackEvent(event);
    }
    
    /**
     * Track click on the pre-generated, project-specific matrix download link.
     *
     * @param {string} projectTitle
     * @param {string} matrixUrl
     * @param {MatrixFileFormat} fileFormat
     */
    public trackDownloadProjectMatrix(projectTitle: string, matrixUrl: string, fileFormat: MatrixFormat) {

        const event = {
            category: GACategory.MATRIX,
            action: GAAction.DOWNLOAD,
            label: projectTitle,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.PROJECT_MATRIX_LINK,
                [GADimension.ENTITY_URL]: matrixUrl,
                [GADimension.FILE_FORMAT]: fileFormat
            }
        };
        
        this.gtmService.trackEvent(event);
    }

    /**
     * Track click on copy to clipboard of the pre-generated, project-specific matrix download link.
     *
     * @param {string} projectTitle
     * @param {string} matrixUrl
     * @param {MatrixFileFormat} fileFormat
     */
    public trackCopyToClipboardProjectMatrixLink(projectTitle: string, matrixUrl: string, fileFormat: MatrixFormat) {

        const event = {
            category: GACategory.MATRIX,
            action: GAAction.COPY_TO_CLIPBOARD,
            label: projectTitle,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.PROJECT_MATRIX_LINK,
                [GADimension.ENTITY_URL]: matrixUrl,
                [GADimension.FILE_FORMAT]: fileFormat
            }
        };
        
        this.gtmService.trackEvent(event);
    }

    /**
     * Normalize matrix URL response to FE-friendly format.
     *
     * @param {MatrixUrlRequestHttpResponse} httpResponse
     * @param {string} species
     * @returns {MatrixUrlRequest}
     */
    private bindMatrixUrlRequest(httpResponse: MatrixUrlRequestHttpResponse, species: string): MatrixUrlRequest {

        return {
            matrixUrl: httpResponse.matrix_location,
            message: httpResponse.message,
            requestId: httpResponse.request_id,
            species,
            status: this.translateMatrixStatus(httpResponse.status)
        } as MatrixUrlRequest;
    }

    /**
     * Convert the specified species into a file name-appropriate slug.
     * 
     * @param {GenusSpecies} species
     * @returns {string}
     */
    private buildSpeciesSlug(species: GenusSpecies): string {

        return species.toLowerCase().replace(" ", "_");
    }

    /**
     * A client-side error occurred during request that we couldn't recover from - build up dummy FAILED matrix
     * response.
     *
     * @param {string} requestId
     * @returns {MatrixUrlRequest}
     */
    private handleMatrixUrlRequestStatusError(requestId: string): Observable<MatrixUrlRequest> {

        return of({
            eta: "",
            matrixUrl: "",
            message: "",
            requestId: requestId,
            species: "",
            status: MatrixUrlRequestStatus.FAILED
        });
    }

    /**
     * Returns the project matrix CSV URL, if it's available for download. Otherwise returns null.
     *
     * @param {Catalog} catalog
     * @param {string} projectId
     * @param {GenusSpecies} species
     * @param {string} matrixFormat
     * @returns {Observable<string>}
     */
    private getProjectMatrixUrl(
        catalog: Catalog, projectId: string, species: GenusSpecies, matrixFormat: string): Observable<string> {

        const speciesSlug = this.buildSpeciesSlug(species);
        const url =
            this.configService.getProjectPreparedMatrixDownloadUrl(`${projectId}.${speciesSlug}.${matrixFormat}`);
        const params = this.httpService.createIndexParams(catalog, {});
        return this.httpClient.head<any>(url, {params}).pipe(
            catchError(() => of("")), // Convert error response to ""
            switchMap((valueIfError) => valueIfError === "" ? of(null) : of(url)) // Return URL if 200, otherwise null
        );
    }

    /**
     * Get the manifest URL for the matrix request.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} searchTerms
     * @param {Observable<boolean>} killSwitch$
     * @returns {ManifestResponse}
     */
    private requestFileManifestUrl(
        catalog: Catalog, searchTerms: SearchTerm[], killSwitch$: Observable<boolean>): Observable<ManifestResponse> {

        // Add matrix file format, if not yet specified
        const matrixSearchTerms = this.createMatrixableSearchTerms(searchTerms);
        return this.manifestService.requestMatrixFileManifestUrl(catalog, matrixSearchTerms, killSwitch$);
    }

    /**
     * Convert the value of the matrix status to FE-friendly value.
     *
     * @param {string} status
     * @returns {MatrixUrlRequestStatus}
     */
    private translateMatrixStatus(status: string): MatrixUrlRequestStatus {

        const statusKey = status.toUpperCase().replace(" ", "_");
        if ( statusKey === "COMPLETE" ) {
            return MatrixUrlRequestStatus.COMPLETED;
        }
        return MatrixUrlRequestStatus[statusKey];
    }

    /**
     * Send initial HTTP POST request for matrix URL, and set up polling to monitor status. If response contains a
     * reference to non human-related matrices, spawn separate requests for each.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {MatrixFormat} matrixFormat
     * @param {Subject<MatrixUrlRequestSpecies>} matrixUrlRequestSpecies$
     * @param {Subject<MatrixUrlRequest>} matrixUrlRequest$
     * @param {Observable<boolean>} killSwitch$
     */
    private sendRequestMatrixUrl(
        manifestResponse: ManifestResponse,
        matrixFormat: MatrixFormat,
        matrixUrlRequestSpecies$: Subject<MatrixUrlRequestSpecies>,
        matrixUrlRequest$: Subject<MatrixUrlRequest>,
        killSwitch$: Observable<boolean>) {

        // Build up the matrix POST body
        const body = {
            bundle_fqids_url: manifestResponse.fileUrl,
            format: MatrixFormat[matrixFormat] || matrixFormat // Allow for file formats that have not yet been added to enum
        };

        this.httpClient.post<MatrixUrlRequestHttpResponse>(this.configService.getMatrixUrl(), body).pipe(
            retry(2),
            catchError(this.handleMatrixUrlRequestStatusError.bind(this)),
            map((response: MatrixUrlRequestHttpResponse) => {

                // Key requests for each species by species name
                const matrixUrlRequestsBySpecies = new Map<string, MatrixUrlRequest>();
                
                // The core request is assumed to be human
                const humanMatrixUrl = this.bindMatrixUrlRequest(response, GenusSpecies.HOMO_SAPIENS);
                matrixUrlRequestsBySpecies.set(humanMatrixUrl.species, humanMatrixUrl);

                // Determine the set of requests to poll for, and poll!
                const nonHumanRequestIds = response.non_human_request_ids;
                Object.keys(nonHumanRequestIds).forEach((species) => {
                    matrixUrlRequestsBySpecies.set(species, {
                        matrixUrl: "",
                        requestId:nonHumanRequestIds[species],
                        species,
                        status: MatrixUrlRequestStatus.IN_PROGRESS
                    }  as MatrixUrlRequest);
                });

                return {
                    matrixUrlRequestsBySpecies
                };
            }),
            takeUntil(killSwitch$)
        ).subscribe((request: MatrixUrlRequestSpecies) => {

            // Let subscribers know the initial Matrix latest status
            matrixUrlRequestSpecies$.next(request);
            
            // Kick off polling for each species returned from the initial POST
            const matrixUrlRequestsBySpecies = request.matrixUrlRequestsBySpecies;
            Array.from(matrixUrlRequestsBySpecies.keys()).forEach((species) => {
                const matrixUrlRequest = matrixUrlRequestsBySpecies.get(species);
                this.pollRequestMatrixUrl(
                    matrixUrlRequest.requestId, matrixUrlRequest.species, matrixUrlRequest$, killSwitch$);
            });
        });
    }

    /**
     * Send the matrix URL-related HTTP request to get an update on the status of the matrix URL request. If response
     * indicates request is still in progress, set up to poll again for request status.
     * 
     * @param {string} requestId
     * @param {string} species
     * @param {Subject<MatrixUrlRequest>} matrixRequest$
     * @param {Observable<boolean>} killSwitch$
     */
    private pollRequestMatrixUrl(
        requestId: string,
        species: string,
        matrixRequest$: Subject<MatrixUrlRequest>,
        killSwitch$: Observable<boolean>) {

        const subscription = interval(5000)
            .pipe(
                take(1),
                switchMap(() => {

                    const url = this.configService.getMatrixRequestUrl(requestId);
                    return this.httpClient.get<MatrixUrlRequestHttpResponse>(url)
                        .pipe(
                            retry(2),
                            catchError(this.handleMatrixUrlRequestStatusError.bind(this, requestId)),
                            map(response => this.bindMatrixUrlRequest(response, species))
                        );
                }),
                takeUntil(killSwitch$)
            )
            .subscribe((response: MatrixUrlRequest) => {

                // Let subscribers know the latest status
                matrixRequest$.next(response);

                // If the request is still in progress, poll again for status.
                if ( response.status === MatrixUrlRequestStatus.IN_PROGRESS ) {

                    const requestId = response.requestId;
                    this.pollRequestMatrixUrl(requestId, species, matrixRequest$, killSwitch$);
                }

                // Clean up each loop through the poll
                subscription.unsubscribe();
            });
    }
}
