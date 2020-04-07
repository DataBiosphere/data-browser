/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component responsible for opening release visualizations modal.
 */

// Core dependencies
import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ReleaseVisualizationsModalComponent } from "../release-visualizations-modal/release-visualizations-modal.component";


@Component({
    selector: "release-visualization-modal-container",
    template: "",
    styleUrls: ["./release-visualizations-modal-container.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ReleaseVisualizationsModalContainerComponent implements OnDestroy {

    private CSS_BACKDROP = "backdrop-white";
    private CSS_PANEL = "panel-invisible";

    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {MatDialog} dialog
     * @param {ActivatedRoute} route
     */
    constructor(dialog: MatDialog, route: ActivatedRoute) {

        route.params.pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe(params => {

            dialog.open(ReleaseVisualizationsModalComponent, {
                autoFocus: false,
                backdropClass: this.CSS_BACKDROP,
                data: {
                    projectId: params.id,
                    datasetId: params.datasetId
                },
                disableClose: true,
                panelClass: this.CSS_PANEL
            });
        });
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
}
