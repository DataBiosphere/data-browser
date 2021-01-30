/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component responsible for opening matrix downloads modal.
 */

// Core dependencies
import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ProjectMatrixDownloadModalComponent } from "../project-matrix-download-modal/project-matrix-download-modal.component";


@Component({
    selector: "project-matrix-download-modal-container",
    template: "",
    styleUrls: ["./project-matrix-download-modal-container.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ProjectMatrixDownloadModalContainerComponent implements OnDestroy {

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

            dialog.open(ProjectMatrixDownloadModalComponent, {
                autoFocus: false,
                backdropClass: this.CSS_BACKDROP,
                data: {
                    projectId: params.id
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
