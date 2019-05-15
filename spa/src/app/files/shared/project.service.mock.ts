/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * * Mock project service used by specs.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// App dependencies
import { Project } from "./project.model";
import { DEFAULT_PROJECT } from "./project.mock";

@Injectable()
export class ProjectMockService {

    /**
     * Fetch project with the specified ID.
     *
     * @param {string} projectId
     * @returns {Observable<Project>}
     */
    public fetchProjectById(projectId: string): Observable<Project> {

        return of(DEFAULT_PROJECT);
    }
}
