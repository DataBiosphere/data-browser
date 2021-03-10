/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Module specific to hamburger functionality and hamburger state.
 */

// Core dependencies
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// App Dependencies
import { HamburgerComponent } from "./hamburger/hamburger.component";
import { HamburgerEffects } from "./_ngrx/hamburger.effects";
import * as hamburgerReducer from "./_ngrx/hamburger.reducer";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature("hamburger", hamburgerReducer.reducer),
        EffectsModule.forFeature([HamburgerEffects])
    ],
    declarations: [
        HamburgerComponent
    ],
    providers: [
    ],
    exports: [
        HamburgerComponent
    ]
})
export class HamburgerModule {
}

