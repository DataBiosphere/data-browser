/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from project end point, to a model appropriate for display on project
 * detail page.
 */

// App dependencies
import { Accession } from "../accession/accession.model";
import { ACCESSION_CONFIGS_BY_RESPONSE_KEY } from "../accession/accession-configs";
import { AccessionResponse } from "./accession-response.model";
import { AccessionUrlPipe } from "../accession/accession-url/accession-url.pipe";
import { EntityRow } from "../entities/entity-row.model";
import { FileTypeSummaryResponse } from "../file-summary/file-type-summary-response.model";
import { ProjectRowMapper } from "../projects/project-row-mapper";
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { Project } from "../shared/project.model";
import { Contributor } from "../shared/contributor.model";
import { Publication } from "../shared/publication.model";
import { getUnspecifiedIfNullValue } from "../table/table-methods";

export class ProjectMapper extends ProjectRowMapper {

    private accessionUrlPipe = new AccessionUrlPipe();

    /**
     * @param {any} row - data modelling row in current selected table.
     * @param {Project} projectOverrides
     */
    constructor(row: any, private projectOverrides: Project) {

        super(row);
    }

    /**
     * Return the version of the row, optimized for display in the data table. Check project edits data for updated
     * versions of publications and contributors, and override server data if specified.
     */
    public mapRow(): EntityRow {

        // If there publications listed in the updated project (loaded from the projects edits JSON), use the updated
        // project's publications. That is, replace the entire publications array returned from the server with the 
        // publications array specified in the project edits JSON. 
        // Otherwise, use the publication data returned from the server. 
        const publications = this.mapPublications(this.row.projects, this.projectOverrides);
        
        // If there are contributors listed in the updated project (loaded from the project edits JSON), use it to
        // update the project's contributors. Otherwise, use the publication data return from server.
        const contributors = this.mapContributors(this.row.projects, this.projectOverrides);
        
        // Convert accessions to view format
        const accessionsByLabel = this.mapAccessions(this.row.projects[0].accessions);

        const entity = Object.assign(
            {},
            super.mapRow(),
            {
                accessionsByLabel,
                arrayExpressAccessions: getUnspecifiedIfNullValue(this.projects.arrayExpressAccessions),
                deprecated: this.projectOverrides && this.projectOverrides.deprecated, // Check project edits to see if project has been deprecated
                contributors: contributors,
                fileType: (this.row.fileTypeSummaries || []).map((fileType: FileTypeSummaryResponse) => fileType.format),
                geoSeriesAccessions: getUnspecifiedIfNullValue(this.projects.geoSeriesAccessions),
                insdcProjectAccessions: getUnspecifiedIfNullValue(this.projects.insdcProjectAccessions),
                insdcStudyAccessions: getUnspecifiedIfNullValue(this.projects.insdcStudyAccessions),
                projectDescription: getUnspecifiedIfNullValue(this.projects.projectDescription),
                publications: publications,
                redirectUrl: this.projectOverrides ? this.projectOverrides.redirectUrl : null,
                supersededBy: this.projectOverrides ? this.projectOverrides.supersededBy : null,
                supplementaryLinks: this.rollupArray(this.row.projects, "supplementaryLinks"),
                withdrawn: this.projectOverrides && this.projectOverrides.withdrawn // Check project edits to see if project has been withdrawn
            }
        );

        if ( this.projectOverrides && this.projectOverrides.contributorMatrices?.length ) {
            const mappedContributorMatrices = (entity as any).contributorMatrices;
            const overrideContributedMatrices = this.projectOverrides.contributorMatrices;
            this.addContributorMatricesVisualizations(mappedContributorMatrices, overrideContributedMatrices);
        }

        // If the built entity has no project short name, and the project edits does have a short name, apply it to
        // the newly build entity.
        if ( !(entity as any).projectShortname && this.projectOverrides.projectShortname ) {
            (entity as any).projectShortname = this.projectOverrides.projectShortname;
        }
        return entity;
    }

    /**
     * Match the contributor matrices visualization tools specified in the project overrides with their
     * corresponding matrices.
     *
     * @param {ProjectMatrixView[]} contributorMatrices
     * @param {any} matrixOverrides
     */
    private addContributorMatricesVisualizations(
        contributorMatrices: ProjectMatrixView[], matrixOverrides: ProjectMatrixView[]) {

        const matricesById = contributorMatrices.reduce((accum, matrix) => {
            accum.set(matrix.id, matrix);
            return accum;
        }, new Map());
        matrixOverrides.forEach(override => {

            const matrix = matricesById.get(override.id);
            if ( matrix ) {
                matrix.analysisPortals = override.analysisPortals;
            }
        });
    }

    /**
     * Convert array of accessions into map keyed by accession namespace.
     * @param {AccessionResponse[]} accessionsResponse
     * @returns {Map<string, Accession[]>}
     */
    private mapAccessions(accessionsResponse: AccessionResponse[]): Map<string, Accession[]> {
        
        if ( !accessionsResponse ) {
            return new Map();
        }

        // Key accessions returned in response by accession label (e.g. Array Express Accessions)
        return accessionsResponse.reduce((accum, accessionResponse) => {
            
            if ( !accessionResponse ) {
                return accum;
            }

            const config = ACCESSION_CONFIGS_BY_RESPONSE_KEY.get(accessionResponse.namespace);
            if ( !config ) {
                return accum;
            }
            const { label } = config;
            if ( !accum.has(label) ) {
                accum.set(label, []);
            }
            
            // Accession is a semi colon-separated (possibly followed by whitespace) string of accession values
            accessionResponse.accession.split(";").forEach(id => {
                // Add FE-specific model of accession
                const trimmedId =  id.trim();
                accum.get(label).push({
                    id: trimmedId,
                    label,
                    url: this.accessionUrlPipe.transform(trimmedId, config.identifierOrgPrefix)
                });
            });
            return accum;
        }, new Map<string, Accession[]>());
    }

    /**
     * Determine the set of contributors for the project being mapped. If there are project edits for this project, we
     * must overwrite contributor data as specified in the project edits. For contributor edits, we only overwrite the
     * values of the contributors that are specified in the project edits JSON (and not the entire contributor list).
     * 
     * @param {any[]} projects
     * @param {Project} updatedProject
     * @returns {Contributor[]}
     */
    private mapContributors(projects: any[], updatedProject: Project): Contributor[] {
        
        const projectContributors = this.rollupArray(this.row.projects, "contributors");
        if ( !updatedProject.contributors || updatedProject.contributors.length === 0 ) {
            return projectContributors;
        }
        
        // Updates have been specified for this project's contributors list; update according to the project edits.
        const updatedContributorsByName = updatedProject.contributors.reduce((accum, contributor) => {

            accum.set(contributor.contactName, contributor);
            return accum;
        }, new Map<string, Contributor>());

        return projectContributors.reduce((accum, contributor) => {
            const updatedContributor = updatedContributorsByName.get(contributor.contactName) || {};
            accum.push(Object.assign({}, contributor, updatedContributor));
            return accum;
        }, []);
    }

    /**
     * Determine the set of publications for the project being mapped. If there are project edits for this project, we
     * must overwrite publication data as specified in the project edits. For publication edits, we overwrite the entire
     * set of publications, using only the publications set in the JSON.
     *
     * @param {any[]} projects
     * @param {Project} updatedProject
     * @returns {Contributor[]}
     */
    private mapPublications(projects: any[], updatedProject: Project): Publication[] {

        if ( updatedProject.publications && updatedProject.publications.length > 0 ) {
            return updatedProject.publications;
        }

        return this.rollupArray(this.row.projects, "publications");
    }

    /**
     * Custom roll up functionality for project meta - combine all values of the specified key into a single array, but
     * do not map to single string value. For example, we want to be able to pull out specific contributor or
     * publication details when displaying the project, and not just a rolled up string value.
     *
     * @param {any[]} projects
     * @param {string} key
     */
    private rollupArray(projects: any[], key: string): any[] {

        return (projects || []).reduce((accum, project) => {

            const valueToAdd = project[key];
            if ( Array.isArray(valueToAdd) ) {
                accum = [
                    ...accum,
                    ...project[key]
                ];
            }

            return accum;
        }, []);
    }
}
