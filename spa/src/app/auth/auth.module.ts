/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Auth module definition.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

// App dependencies
import { AuthService } from "./auth.service";
import * as authReducer from "./_ngrx/auth.reducer";
import { AuthEffects } from "./_ngrx/auth.effects";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature("auth", authReducer.reducer),
        SharedModule,
    ],
    providers: [AuthService],
})
export class AuthModule {}
