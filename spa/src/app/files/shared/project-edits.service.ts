/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating project edits-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// App dependencies
import projectEdits from "../project-edits/project-edits.json";
import { Project } from "./project.model";

@Injectable()
export class ProjectEditsService {
    /**
     * Fetch project overrides specified in local project-edits file.
     *
     * @returns {Observable<Portal[]>}
     */
    public fetchProjectEdits(): Observable<Project[]> {
        return of(projectEdits as Project[]);
    }
}
