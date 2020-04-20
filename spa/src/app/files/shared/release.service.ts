/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating release-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

// App dependencies
import release2020March from "../releases/2020-march/2020-03-release.json";
import { Release } from "../releases/release.model";
import { ReleaseDataset } from "../releases/release-dataset.model";
import { ReleaseProject } from "../releases/release-project.model";
import { ReleaseOrganView } from "../releases/release-organ-view.model";
import { ReleaseDatasetView } from "../releases/release-dataset-view.model";
import { ReleaseFileView } from "../releases/release-file-view.model";
import { ReleaseFileType } from "../releases/release-file-type.model";
import { ReleaseVisualizationView } from "../releases/release-visualization-view.model";
import { ConfigService } from "../../config/config.service";

@Injectable()
export class ReleaseService {

    // Locals
    private PORTAL_DESCRIPTIONS = new Map<string, string>([
        ["SCEA", "Single Cell Expression Atlas"],
        ["SCP", "Single Cell Portal"],
        ["Xena", "UCSC Xena"]
    ]);
    private RELEASE_FILE_DESCRIPTIONS = new Map<string, string>([
        [`${ReleaseFileType.ANNOTATED_CLUSTERS}h5ad`, "Cumulus output expression matrix; contains clustering information, cell annotations, and log-transformed gene expression (Pegasus, Scanpy, and Seurat compatible)."],
        [`${ReleaseFileType.ANNOTATED_CLUSTERS}loom`, "Cumulus output expression matrix; contains clustering information, cell annotations, and log-transformed gene expression (Pegasus, Scanpy, and Seurat compatible)."],
        [`${ReleaseFileType.DIFFERENTIAL_EXPRESSION}xlsx`, "Cumulus output file containing differential expression with correction."],
        [`${ReleaseFileType.FILTER}xlsx`, "File containing Cumulus filtering information."],
        [`${ReleaseFileType.CSV}csv`, "A CSV version of the Cumulus output differential expression with correction; can be visualized in R or Python."],
        [`${ReleaseFileType.PIPELINE_INPUT}loom`, "Gene matrix file generated with DCP standardized pipelines (Optimus and Smart-seq2) and used as Cumulus input."]
    ]);

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {}

    /**
     * Build view model of release. That is, project datasets grouped by organ.
     *
     * @param {Release} release
     * @returns {ReleaseOrganView[]}
     */
    public buildReleaseView(release: Release): ReleaseOrganView[] {

        // For each project in the release, create a view model for its datasets and key by organ.
        const releaseOrganViewsByOrgan = release.projects.reduce((accum, releaseProject: ReleaseProject) => {


            // Create dataset view model and add to map of datasets keyed by organ.
            releaseProject.datasets.forEach((releaseDataset: ReleaseDataset) => {

                const datasetView =
                    this.createReleaseDatasetView(releaseProject.entryId, releaseProject.projectShortname, releaseDataset);

                const organ = releaseDataset.organ;
                if ( accum.has(organ) ) {

                    accum.get(organ).datasets.push(datasetView);
                }
                else {
                    accum.set(organ, {organ, datasets: [datasetView]});
                }
            });

            return accum;
        }, new Map<string, ReleaseOrganView>());

        // Sort organ views alphabetically by organ.
        const releaseOrganViews = Array.from(releaseOrganViewsByOrgan.values());
        releaseOrganViews.sort(this.sortOrganViews);

        // Sort datasets alphabetically by project title.
        releaseOrganViews.forEach(organView => {
            organView.datasets.sort(this.sortDatasets);
        });

        return releaseOrganViews;
    }

    /**
     * Create view model of specified dataset.
     *
     * @param {string} entryId - project ID
     * @param {string} projectShortname
     * @param {ReleaseDataset} releaseDataset
     * @returns {ReleaseDatasetView}
     */
    public createReleaseDatasetView(
        entryId: string, projectShortname: string, releaseDataset: ReleaseDataset): ReleaseDatasetView {

        // Create view model of release files
        const files = this.createReleaseFileViews(releaseDataset);

        // Create view model of release visualizations
        const visualizations = this.createReleaseVisualizationViews(releaseDataset);

        const datasetView = Object.assign({
            entryId,
            projectShortname,
        }, releaseDataset, {
            files, visualizations
        });

        return datasetView as ReleaseDatasetView;
    }

    /**
     * Fetch the data for the March 2020 release.
     *
     * @returns {Observable<Portal[]>}
     */
    public fetch2020MarchRelease(): Observable<Release> {

        return of(release2020March as Release);
    }

    /**
     * Returns true if release functionality is visible for the current environment - currently only visible on local
     * and ux-dev.
     * 
     * @returns {boolean}
     */
    public isReleaseVisible(): boolean {

        return this.configService.isEnvLocal() || this.configService.isEnvUxDev();
    }

    /**
     * Create view models for each release file in the specified dataset.
     *
     * @param {ReleaseDataset} releaseDataset
     * @returns {ReleaseFileView}
     */
    private createReleaseFileViews(releaseDataset: ReleaseDataset): ReleaseFileView[] {

        return releaseDataset.files.reduce((accum, releaseFile) => {

            const type = releaseFile.type;
            const extension = releaseFile.extension;
            const description = this.RELEASE_FILE_DESCRIPTIONS.get(`${type}${extension}`);
            accum.push(Object.assign({}, releaseFile, {
                description
            }));

            return accum;
        }, []);

    }

    /**
     * Create view models for each release visualization in the specified dataset.
     *
     * @param {ReleaseDataset} releaseDataset
     * @returns {ReleaseVisualizationView[]}
     */
    private createReleaseVisualizationViews(releaseDataset: ReleaseDataset): ReleaseVisualizationView[] {

        return releaseDataset.visualizations.reduce((accum, releaseVisualization) => {

            const title = releaseVisualization.title;
            const description = this.PORTAL_DESCRIPTIONS.get(title);
            accum.push(Object.assign({}, releaseVisualization, {description}));

            return accum;
        }, []);
    }

    /**
     * Sort datasets alphabetically by project title.
     */
    private sortDatasets(ds0, ds1): number {

        if ( ds0.projectShortname < ds1.projectShortname ) {
            return -1;
        }

        if ( ds0.projectShortname > ds1.projectShortname ) {
            return 1;
        }

        return 0;
    }

    /**
     * Sort organ views alphabetically by organ.
     */
    private sortOrganViews(ov0, ov1): number {

        if ( ov0.organ < ov1.organ ) {
            return -1;
        }

        if ( ov0.organ > ov1.organ ) {
            return 1;
        }

        return 0;
    }
}
