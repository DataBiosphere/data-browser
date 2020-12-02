/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of matrix files associated with a project, either contributor-generated or DCP-generated, grouped
 * by species.
 */

// App dependencies
import { ProjectMatrixView } from "../project-matrix/project-matrix-view.model";
import { GenusSpecies } from "../shared/genus-species.model";

export interface ProjectMatrixTableView {

    species: GenusSpecies[];
    projectMatrixViews: ProjectMatrixView[];
}
