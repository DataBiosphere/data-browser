/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core shared module as per https://angular.io/guide/sharing-ngmodules. Contains declarations and export of components
 * used across app modules.
 */

// Core dependencies
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// App Dependencies
import { CCToolbarNavComponent } from "./cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavItemComponent } from "./cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [

        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        PopLayoutComponent
    ],
    exports: [
        CommonModule,
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        PopLayoutComponent
    ]
})
export class SharedModule {
}

