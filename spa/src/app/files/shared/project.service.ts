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
import { Contributor } from "./contributor.model";
import { Project } from "./project.model";

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

        // Grab the project from the response
        const responseProject = response.projects[0];
        if ( !responseProject ) {
            return {} as Project;
        }

        // Grab the specimens from the response
        const responseSpecimens = response.specimens[0];

        // Grab the summary from the response
        const responseProjectSummary = response.projectSummary;

        // Build up FE-friendly version of the project
        const mappedProject = {
            arrayExpressAccessions: responseProject.arrayExpressAccessions,
            contributors: responseProject.contributors as Contributor[],
            entryId: response.entryId,
            cellCount: responseProjectSummary.totalCellCount,
            disease: response.samples[0].disease,
            donorCount: responseProjectSummary.donorCount,
            fileType: response.fileTypeSummaries.map(fileType => fileType.fileType),
            geoSeriesAccessions: responseProject.geoSeriesAccessions,
            insdcProjectAccessions: responseProject.insdcProjectAccessions,
            insdcStudyAccessions: responseProject.insdcStudyAccessions,
            libraryConstructionApproach: responseProjectSummary.libraryConstructionApproach,
            organ: response.samples[0].organ,
            organPart: response.samples[0].organPart,
            pairedEnd: response.protocols[0].pairedEnd,
            projectDescription: responseProject.projectDescription,
            projectShortname: responseProject.projectShortname,
            projectTitle: responseProject.projectTitle,
            publications: responseProject.publications,
            species: responseProjectSummary.genusSpecies
        } as any;

        return mappedProject;
    }
}
