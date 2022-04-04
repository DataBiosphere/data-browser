/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Module specific to modal functionality and modal state.
 */

// Core dependencies
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import * as modalReducer from "./_ngrx/modal.reducer";

// App Dependencies
import { ModalLayoutComponent } from "../modal/modal-layout/modal-layout.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forFeature("modal", modalReducer.reducer),
    ],
    declarations: [ModalLayoutComponent],
    providers: [],
    exports: [ModalLayoutComponent],
})
export class ModalModule {}
