/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating project-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { Project } from "../shared/project.model";
import { ProjectMapper } from "./project-mapper";

@Injectable()
export class ProjectService {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {}

    /**
     * Fetch project with the specified ID.
     *
     * @param {string} projectId
     * @returns {Observable<Project>}
     */
    public fetchProjectById(projectId: string): Observable<Project> {

        const url = this.configService.buildApiUrl(`/repository/projects/${projectId}`);
        return this.httpClient.get<Project>(url).pipe(map(this.bindProject.bind(this)));
    }

    /**
     * Bind the raw response to Project object.
     *
     * @param {any} response
     * @returns {Project}
     */
    private bindProject(response: any): Project {
        
        const mapper = new ProjectMapper(response);
        return mapper.mapRow() as Project;
    }
}
