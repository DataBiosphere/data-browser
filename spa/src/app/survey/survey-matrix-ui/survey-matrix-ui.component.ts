/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying spring 2021 matrix UI survey.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { SurveyState } from "../_ngrx/survey.state";
import { TakeSurveyAction } from "../_ngrx/take-survey.action";
import { SurveyName } from "../survey-name.model";

@Component({
    selector: "survey-matrix-ui",
    templateUrl: "./survey-matrix-ui.component.html",
    styleUrls: ["./survey-matrix-ui.component.scss"],
})
export class SurveyMatrixUIComponent {
    // Template variables
    portalUrl;

    /**
     * @param configService
     */
    constructor(
        private configService: ConfigService,
        private store: Store<SurveyState>
    ) {
        this.portalUrl = configService.getPortalUrl();
    }

    /**
     * Return the Portal matrices description link.
     *
     * @returns {string}
     */
    public getMatrixFileLink() {
        return `${this.portalUrl}/guides/consumer-vignettes/matrices`;
    }

    /**
     * Return the Portal survey description link.
     *
     * @returns {string}
     */
    public getSurveyDescriptionLink() {
        return `${this.portalUrl}/community-updates/ux-studies/dcp-matrix-ux-study-spring-2021`;
    }

    /**
     * Redirect user to survey.
     */
    public onTakeSurvey() {
        this.store.dispatch(
            new TakeSurveyAction(SurveyName["2021_SPRING_MATRIX_UX"])
        );
    }
}
