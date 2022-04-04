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
import { PROJECT_SINGLE_VALUES } from "../project/project-mapper.mock";
import { Project } from "./project.model";

@Injectable()
export class ProjectMockService {
    /**
     * Fetch project with the specified ID.
     *
     * @param {string} projectId
     * @returns {Observable<Project>}
     */
    public fetchProjectById(projectId: string): Observable<Project> {
        return of(PROJECT_SINGLE_VALUES as any);
    }
}
