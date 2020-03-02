/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of a release dataset, used when displaying a row in the release table. This is essentially a combined and
 * flattened version of ReleaseProject and ReleaseDataset
 */

// App dependencies
import { ReleaseFile } from "./2020-march/release-file.model";
import { ReleaseVisualization } from "./2020-march/release-visualization.model";
import { LibraryConstructionApproach } from "../shared/library-construction-approach.model";
import { DevelopmentalStage } from "./2020-march/developmental-stage.model";

export interface ReleaseDatasetView {
    entryId: string; // Project UUID, pulled from ReleaseProject
    datasetId: string; // Short name, pulled from ReleaseDataset
    developmentalStage: DevelopmentalStage;
    // files: ReleaseFile[]; TODO(mim)
    libraryConstructionApproach: LibraryConstructionApproach;
    // visualizations: ReleaseVisualization[]; TODO(mim)
}

