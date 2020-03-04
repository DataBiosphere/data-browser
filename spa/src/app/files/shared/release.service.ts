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
import { ReleaseFilesView } from "../releases/release-files-view.model";

@Injectable()
export class ReleaseService {

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
        const files = this.createReleaseFilesView(releaseDataset);

        const datasetView = Object.assign({
            entryId,
            projectShortname,
        }, releaseDataset, {
            files
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
     * Create view model of release files for specified dataset.
     *
     * @param {ReleaseDataset} releaseDataset
     * @returns {ReleaseFileView}
     */
    private createReleaseFilesView(releaseDataset: ReleaseDataset): ReleaseFilesView[] {
        
        const releaseFileViewsByType = releaseDataset.files.reduce((accum, releaseFile) => {

            const type = releaseFile.type;
            if ( accum.has(type) ) {

                accum.get(type).files.push(releaseFile);
            }
            else {
                accum.set(type, {type, files: [releaseFile]});
            }

            return accum;
        }, new Map<string, ReleaseFilesView>());

        return Array.from(releaseFileViewsByType.values());
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
