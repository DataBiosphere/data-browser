/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component responsible for opening release files modal.
 */

// Core dependencies
import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ReleaseFilesModalComponent } from "../release-files-modal/release-files-modal.component";
import { map } from "rxjs/internal/operators";


@Component({
    selector: "release-files-modal-container",
    template: "",
    styleUrls: ["./release-files-modal-container.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ReleaseFilesModalContainerComponent implements OnDestroy {

    private CSS_BACKDROP = "backdrop-white";
    private CSS_PANEL = "panel-invisible";

    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {MatDialog} dialog
     * @param {ActivatedRoute} route
     */
    constructor(dialog: MatDialog, route: ActivatedRoute) {

        /* TODO Mim - check concept - need datasetId */
        combineLatest(route.queryParams, route.params)
            .pipe(
                map(([queryParams, params]) => {

                    return {
                        queryParams: queryParams,
                        params: params
                    }
                }),
                takeUntil(this.ngDestroy$)
            ).subscribe(({queryParams, params}) => {

            dialog.open(ReleaseFilesModalComponent, {
                autoFocus: false,
                backdropClass: this.CSS_BACKDROP,
                data: {
                    projectId: params.id,
                    datasetId: queryParams.datasetId
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
