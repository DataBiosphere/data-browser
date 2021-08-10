/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating project-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { Catalog } from "../catalog/catalog.model";
import { ConfigService } from "../../config/config.service";
import { HttpService } from "../http/http.service";
import { ProjectMapper } from "./project-mapper";
import { SearchEntity } from "../search/search-entity.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { ICGCQuery } from "../shared/icgc-query";
import { ManifestDownloadFormat } from "../file-manifest/manifest-download-format.model";
import { Project } from "../shared/project.model";
import { SearchTermHttpService } from "../search/http/search-term-http.service";

@Injectable()
export class ProjectService {

    /**
     * @param {ConfigService} configService
     * @param {HttpService} httpService
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, 
                private httpService: HttpService,
                private searchTermHttpService: SearchTermHttpService,
                private httpClient: HttpClient) {
    }

    /**
     * Return the URL to kick off polling for a project manifest.
     * 
     * @param {Catalog} catalog
     * @param {string} projectId
     * @param {string} projectTitle
     * @returns {string}
     */
    public getProjectManifestFileLocationUrl(catalog: Catalog, projectId: string, projectTitle: string): string {

        const searchTerms = [
            new SearchEntity(FileFacetName.PROJECT_ID, projectId, projectTitle)
        ];
        const query = 
            new ICGCQuery(catalog, this.searchTermHttpService.marshallSearchTerms(searchTerms), ManifestDownloadFormat.COMPACT);
        const params = new HttpParams({fromObject: query} as any);
        const manifestUrl = this.configService.getFileManifestUrl();
        return `${manifestUrl}?${params.toString()}`; 
    }

    /**
     * Fetch project with the specified ID. Mix project data return from server with project edits data (as publications
     * and contributor data from the server are overriden by project edits publication and contributor data for certain
     * projects. See DB#1135 and DB#1139).
     *
     * @param {Catalog} catalog
     * @param {string} projectId
     * @param {Project} projectOverrides
     * @returns {Observable<Project>}
     */
    public fetchProjectById(catalog: Catalog, projectId: string, projectOverrides: Project): Observable<Project> {

        const url = this.configService.getProjectUrl(projectId);
        const params = this.httpService.createIndexParams(catalog, {});
        return this.httpClient.get<Project>(url, {params}).pipe(
            map((response) => {
                return this.bindProject(response, projectOverrides);
            })
        );
    }

    /**
     * Bind the raw response to Project object.
     *
     * @param {any} response
     * @param {Project} projectOverrides
     * @returns {Project}
     */
    private bindProject(response: any, projectOverrides: Project): Project {

        const mapper = new ProjectMapper(response, projectOverrides);
        const project = mapper.mapRow() as Project;
        project.analysisPortals = projectOverrides.analysisPortals ?? [];
        return project;
    }
}
