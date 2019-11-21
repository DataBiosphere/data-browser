/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component responsible for opening prepared matrix downloads modal.
 */

// Core dependencies
import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";

// App dependencies
import { ProjectDownloadMatrixModalComponent } from "../project-download-matrix-modal/project-download-matrix-modal.component";
import { AppState } from "../../_ngrx/app.state";


@Component({
    selector: "project-download-matrix-modal-container",
    template: "",
    styleUrls: ["./project-download-matrix-modal-container.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ProjectDownloadMatrixModalContainerComponent implements OnDestroy {

    private CSS_BACKDROP = "backdrop-white";
    private CSS_PANEL = "panel-invisible";

    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {MatDialog} dialog
     * @param {ActivatedRoute} route
     * @param {Store<AppState>} store
     */
    constructor(dialog: MatDialog, route: ActivatedRoute, private store: Store<AppState>) {

        route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(params => {

            dialog.open(ProjectDownloadMatrixModalComponent, {
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
