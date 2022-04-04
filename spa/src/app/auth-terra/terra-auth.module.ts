/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Terra auth module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

// App dependencies
import { TerraAuthService } from "./terra-auth.service";
import * as terraAuthReducer from "./_ngrx/terra-auth.reducer";
import { TerraAuthEffects } from "./_ngrx/terra-auth.effects";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        EffectsModule.forFeature([TerraAuthEffects]),
        StoreModule.forFeature("terraAuth", terraAuthReducer.reducer),
        SharedModule,
    ],
    providers: [TerraAuthService],
})
export class TerraAuthModule {}
