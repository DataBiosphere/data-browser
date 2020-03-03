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
import { Release } from "../releases/2020-march/release.model";
import { ReleaseDataset } from "../releases/2020-march/release-dataset.model";
import { ReleaseProject } from "../releases/2020-march/release-project.model";
import { ReleaseOrganView } from "../releases/release-organ-view.model";

@Injectable()
export class ReleaseService {

    /**
     * Build view model of release. That is, project datasets grouped by organ.
     *
     * @param {Release} release
     * @returns {ReleaseOrganView[]}
     */
    public buildReleaseView(release: Release): ReleaseOrganView[] {

        const releaseOrganViewsByOrgan = release.projects.reduce((accum, releaseProject: ReleaseProject) => {

            const entryId = releaseProject.entryId;
            const projectShortname = releaseProject.projectShortname;

            releaseProject.datasets.forEach((releaseDataset: ReleaseDataset) => {

                const organ = releaseDataset.organ;
                const datasetView = Object.assign({
                    entryId,
                    projectShortname,
                }, releaseDataset);

                if ( accum.has(organ) ) {

                    accum.get(organ).datasets.push(datasetView);
                }
                else {
                    accum.set(organ, {organ, datasets: [datasetView]});
                }
            });

            return accum;
        }, new Map<string, ReleaseOrganView>());

        return Array.from(releaseOrganViewsByOrgan.values());
    }

    /**
     * Fetch the data for the March 2020 release.
     *
     * @returns {Observable<Portal[]>}
     */
    public fetch2020MarchRelease(): Observable<Release> {
        
        return of(release2020March as Release);
    }
}
