/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Class responsible for mapping response returned from project end point, to a model appropriate for display on project
 * detail page.
 */

// App dependencies
import { EntityRow } from "../table/entity-row.model";
import { ProjectRowMapper } from "../hca-table-projects/project-row-mapper";
import { Project } from "../shared/project.model";
import { getUnspecifiedIfNullValue } from "../table/table-methods";

export class ProjectMapper extends ProjectRowMapper {

    /**
     * @param {any} row - data modelling row in current selected table.
     * @param {Project} updatedProject
     */
    constructor(row: any, private updatedProject: Project) {
        super(row);
    }

    /**
     * Return the version of the row, optimized for display in the data table. Check project edits data for updated
     * versions of publications and contributors, and override server data if specified.
     */
    public mapRow(): EntityRow {

        // If there publications listed in the updated project (from projects edits JSON), use the updated project's
        // publications. Otherwise, use the publication data returned from the server.
        const publications = this.updatedProject.publications && this.updatedProject.publications.length > 0 ?
            this.updatedProject.publications :
            this.rollupArray(this.row.projects, "publications");

        return Object.assign({}, super.mapRow(), {
            arrayExpressAccessions: getUnspecifiedIfNullValue(this.projects.arrayExpressAccessions),
            contributors: this.rollupArray(this.row.projects, "contributors"),
            fileType: (this.row.fileTypeSummaries || []).map(fileType => fileType.fileType),
            geoSeriesAccessions: getUnspecifiedIfNullValue(this.projects.geoSeriesAccessions),
            insdcProjectAccessions: getUnspecifiedIfNullValue(this.projects.insdcProjectAccessions),
            insdcStudyAccessions: getUnspecifiedIfNullValue(this.projects.insdcStudyAccessions),
            projectDescription: getUnspecifiedIfNullValue(this.projects.projectDescription),
            publications: publications,
            supplementaryLinks: this.rollupArray(this.row.projects, "supplementaryLinks")
        });
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
