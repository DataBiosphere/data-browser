/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of a release dataset, used when displaying a row in the release table. This is essentially a combined and
 * flattened version of ReleaseProject and ReleaseDataset
 */

// App dependencies
import { ReleaseVisualization } from "./release-visualization.model";
import { LibraryConstructionApproach } from "../shared/library-construction-approach.model";
import { DevelopmentalStage } from "./developmental-stage.model";
import { ReleaseFilesView } from "./release-files-view.model";

export interface ReleaseDatasetView {
    entryId: string; // Project UUID, pulled from ReleaseProject
    datasetId: string; // Short name, pulled from ReleaseDataset
    developmentalStage: DevelopmentalStage;
    files: ReleaseFilesView[];
    libraryConstructionApproach: LibraryConstructionApproach;
    projectShortname: string; // Project short name, pulled from ReleaseProject
    visualizations: ReleaseVisualization[];
}

