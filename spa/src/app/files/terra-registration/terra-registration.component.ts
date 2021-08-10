/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying Terra registration information page. Displayed when user is authenticated
 * but not registered with Terra.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";

@Component({
    selector: "terra-registration",
    templateUrl: "terra-registration.component.html",
    styleUrls: ["terra-registration.component.scss"]
})
export class TerraRegistrationComponent {

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState} store
     */
    constructor(private configService: ConfigService, private store: Store<AppState>) {}

    /**
     * Returns the Terra registration URL. 
     */
    public getRegistrationUrl() {

        return this.configService.getTerraExportUrl();
    }
}
