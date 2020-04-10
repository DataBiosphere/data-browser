/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating project-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, interval, Observable, of, Subject } from "rxjs";
import { catchError, map, retry, switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ProjectMapper } from "./project-mapper";
import { ProjectTSVUrlHttpResponse } from "./project-tsv-url-http-response.model";
import { ProjectTSVUrlResponse } from "./project-tsv-url-response.model";
import { ProjectTSVUrlRequestStatus } from "./project-tsv-url-request-status.model";
import { ReleaseProject } from "../releases/release-project.model";
import { SearchEntity } from "../search/search-entity.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { ICGCQuery } from "../shared/icgc-query";
import { ManifestDownloadFormat } from "../shared/manifest-download-format.model";
import { Project } from "../shared/project.model";
import { SearchTermService } from "../shared/search-term.service";

@Injectable()
export class ProjectService {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermService} searchTermService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private searchTermService: SearchTermService, private httpClient: HttpClient) {
    }

    /**
     * Fetch project with the specified ID. Mix project data return from server with project edits data (as publications
     * and contributor data from the server are overriden by project edits publication and contributor data for certain
     * projects. See DB#1135 and DB#1139).
     *
     * @param {string} projectId
     * @param {Project} updatedProject
     * @returns {Observable<Project>}
     */
    public fetchProjectById(projectId: string, updatedProject: Project): Observable<Project> {

        const url = this.configService.buildApiUrl(`/repository/projects/${projectId}`);
        return this.httpClient.get<Project>(url).pipe(
            map((response) => {
                return this.bindProject(response, updatedProject);
            })
        );
    }

    /**
     * Poll for the project TSV URL.
     * 
     * @param {string} projectId
     * @param {string} projectName
     * @param {Observable<boolean>} killSwitch$
     */
    public fetchProjectTSVUrl(
        projectId: string, projectName: string, killSwitch$: Observable<boolean>): Observable<ProjectTSVUrlResponse> {

        const response$ = new BehaviorSubject<ProjectTSVUrlResponse>({
            projectId,
            status: ProjectTSVUrlRequestStatus.INITIATED
        });

        // Create search terms containing specified project
        const searchTerms = [
            new SearchEntity(FileFacetName.PROJECT_ID, projectId, projectName)
        ];
        const query = new ICGCQuery(this.searchTermService.marshallSearchTerms(searchTerms), ManifestDownloadFormat.FULL);
        let params = new HttpParams({fromObject: query} as any);
        const url = this.configService.buildApiUrl(`/fetch/manifest/files`);
        this.pollRequestProjectTSVUrl(projectId, url, params, 0, response$, killSwitch$);

        return response$.asObservable();
    }

    /**
     * Bind the raw response to Project object.
     *
     * @param {any} response
     * @param {ReleaseProject} updatedProject
     * @returns {Project}
     */
    private bindProject(response: any, updatedProject: Project): Project {

        const mapper = new ProjectMapper(response, updatedProject);
        return mapper.mapRow() as Project;
    }

    /**
     * Normalize download HTTP response to FE-friendly format.
     *
     * @param {string} projectId
     * @param {ProjectTSVUrlHttpResponse} response
     * @returns {ProjectTSVUrlResponse}
     */
    private bindProjectTSVResponse(projectId: string, response: ProjectTSVUrlHttpResponse): Observable<ProjectTSVUrlResponse> {

        return of({
            fileUrl: response.Location,
            projectId: projectId,
            retryAfter: response["Retry-After"],
            status: this.translatePollStatus(response.Status)
        });
    }

    /**
     * An error occurred during request for project TSV URL - return error state.
     *
     * @returns {ProjectTSVUrlResponse}
     */
    private handleProjectTSVUrlError(): Observable<ProjectTSVUrlResponse> {

        return of({
            status: ProjectTSVUrlRequestStatus.FAILED,
            fileUrl: "",
            projectId: "",
            retryAfter: 0
        });
    }

    /**
     * Poll for the project TSV URL until no longer in progress, updating the response on each poll. Kill polling if
     * indicated by kill switch.
     *
     * @param {string} projectId
     * @param {string} url
     * @param {HttpParams} params
     * @param {number} delay
     * @param {Subject<ProjectTSVUrlResponse>} response$
     * @param {Observable<boolean>} killSwitch$
     */
    private pollRequestProjectTSVUrl(
        projectId: string, url: string, params: HttpParams, delay: number,
        response$: Subject<ProjectTSVUrlResponse>, killSwitch$: Observable<boolean>) {

        const subscription = interval(delay * 1000)
            .pipe(
                take(1),
                switchMap(() => {

                    return this.httpClient.get<ProjectTSVUrlHttpResponse>(url, params ? {params} : {})
                        .pipe(
                            retry(2),
                            catchError(this.handleProjectTSVUrlError.bind(this)),
                            switchMap(response => this.bindProjectTSVResponse(projectId, response))
                        );
                }),
                takeUntil(killSwitch$)
            )
            .subscribe((response: ProjectTSVUrlResponse) => {

                // Let listeners know the latest status
                response$.next(response);

                // If the request is still in progress, poll again for status
                if ( response.status === ProjectTSVUrlRequestStatus.IN_PROGRESS ) {
                    this.pollRequestProjectTSVUrl(
                        projectId, response.fileUrl, null, response.retryAfter, response$, killSwitch$)
                }

                // Clean up each loop through the poll
                subscription.unsubscribe();
            })
    }

    /**
     * Convert the value of the project TSV URL request status to FE-friendly value.
     *
     * @param {number} code
     * @returns {ProjectTSVUrlRequestStatus}
     */
    private translatePollStatus(code: number): ProjectTSVUrlRequestStatus {

        if ( code === 301 ) {
            return ProjectTSVUrlRequestStatus.IN_PROGRESS;
        }
        if ( code === 302 ) {
            return ProjectTSVUrlRequestStatus.COMPLETED;
        }
        return ProjectTSVUrlRequestStatus.FAILED;
    }
}
