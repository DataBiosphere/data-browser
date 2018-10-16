/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service coordinating project-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// App dependencies
import { ProjectDAO } from "./project.dao";
import { Project } from "./project.model";

@Injectable()
export class ProjectService {

    constructor(private projectDAO: ProjectDAO) {}

    /**
     * Fetch project with the specified ID.
     *
     * @param {string} projectId
     * @returns {Observable<Project>}
     */
    public fetchProjectById(projectId: string): Observable<Project> {

        return this.projectDAO.fetchProjectById(projectId);
    }
}
