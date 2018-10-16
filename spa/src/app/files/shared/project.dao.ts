/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to project-related end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

// App depenencies
import { ConfigService } from "../../config/config.service";
import { Project } from "./project.model";

// App dependencies

@Injectable()
export class ProjectDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {
    }

    /**
     * Fet FileSummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param {string} projectId
     * @returns {Observable<Project>}
     */
    fetchProjectById(projectId: string): Observable<Project> {

        const url = this.buildApiUrl(`/projects/${projectId}`);
        return this.httpClient.get<Project>(url);
    }

    /**
     * Privates
     */

    /**
     * Build full API URL
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {

        const domain = this.configService.getAPIURL();
        return `${domain}${url}`;
    }
}
