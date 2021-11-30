/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data downloads/export options, and handles corresponding select functionality on an
 * individual options.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { GetDataLayoutComponentState } from "../get-data-layout/get-data-layout.component.state";
import { AppState } from "../../../_ngrx/app.state";
import { selectSelectedEntitySpec } from "../../_ngrx/files.selectors";
import EntitySpec from "../../shared/entity-spec";

@Component({
    selector: "get-data-options",
    templateUrl: "./get-data-options.component.html",
    styleUrls: ["./get-data-options.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GetDataOptionsComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public portalURL: string;
    public state$ = new BehaviorSubject<GetDataLayoutComponentState>({
        loaded: false
    });

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Router} router
     */
    constructor(private configService: ConfigService, private store: Store<AppState>, private router: Router) {

        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Return user to export options.
     */
    public getBackButtonTab(): EntitySpec[] {

        const key = "Back";
        return [{
            key,
            displayName: key
        }];
    }

    /**
     * Navigate to curl download.
     */
    public onAnalyzeInTerraClicked(): void {

        this.router.navigate(["/export", "export-to-terra", "select-species"]);
    }

    /**
     * Navigate to curl download.
     */
    public onRequestCurlCommandClicked(): void {
        
        this.router.navigate(["/export", "get-curl-command", "select-species"]);
    }

    /**
     * Navigate to file manifest download.
     */
    public onRequestFileManifestClicked(): void {

        this.router.navigate(["/export", "download-manifest", "select-species"]);
    }

    /**
     * Handle click on back button.
     */
    public onTabSelected(selectedEntity): void {

        // Otherwise, return to the selected entity
        this.router.navigate(["/" + selectedEntity.key], {
            queryParamsHandling: "preserve"
        });
    }

    /**
     * Kill subscriptions on exit of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the selected entity spec, required for back button functionality.
     */
    public ngOnInit() {

        this.store
            .pipe(
                select(selectSelectedEntitySpec),
                takeUntil(this.ngDestroy$),
                filter((entitySpec) => !!entitySpec)
            )
            .subscribe(() => {

                this.state$.next({
                    loaded: true
                });
            });
    }
}
