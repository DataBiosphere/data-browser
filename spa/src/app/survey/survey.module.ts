/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Survey module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

// App dependencies
import * as surveyReducer from "./_ngrx/survey.reducer";
import { SharedModule } from "../shared/shared.module";
import { SurveyEffects } from "./survey.effects";
import { SurveyMatrixUIComponent } from "./survey-matrix-ui/survey-matrix-ui.component";

@NgModule({
    imports: [
        EffectsModule.forFeature([SurveyEffects]),
        SharedModule,
        StoreModule.forFeature("survey", surveyReducer.reducer),
    ],
    declarations: [
        SurveyMatrixUIComponent
    ],
    exports: [
        SurveyMatrixUIComponent
    ]
})
export class SurveyModule {
}
