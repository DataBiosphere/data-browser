/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data downloads/export options, and handles corresponding select functionality on an
 * indivicual options.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { AppState } from "../../../_ngrx/app.state";
import { BackToEntityAction } from "../../_ngrx/entity/back-to-entity.action";
import EntitySpec from "../../shared/entity-spec";

@Component({
    selector: "get-data-options",
    templateUrl: "./get-data-options.component.html",
    styleUrls: ["./get-data-options.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GetDataOptionsComponent {

    // Template variables
    public portalURL: string;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Router} router
     */
    constructor(private configService: ConfigService, private store: Store<AppState>, private router: Router) {

        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Return user to selected entity.
     * 
     * @param {EntitySpec} selectedEntity
     */
    public onBackClicked(selectedEntity: EntitySpec) {

        this.store.dispatch(new BackToEntityAction(selectedEntity.key));
        this.router.navigate(["/" + selectedEntity.key], {
            queryParamsHandling: "preserve"
        });
    }
}
