/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core shared module as per https://angular.io/guide/sharing-ngmodules. Contains declarations and export of components
 * used across app modules.
 */

// Core dependencies
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ClipboardModule } from "ngx-clipboard";

// App Dependencies
import { CCToolbarNavComponent } from "./cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavItemComponent } from "./cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab";
import { ModalLayoutComponent } from "./modal-layout/modal-layout.component";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";
import { ResponsiveService } from "./responsive/responsive.service";
import { StatusPanelComponent } from "./status-panel/status-panel.component";
import { WarningComponent } from "./warning/warning.component";
import { WarningContentComponent } from "./warning/warning-content.component";
import { WarningTitleComponent } from "./warning/warning-title.component";
import { FileDownloadComponent } from "./file-download/file-download.component";
import { CopyToClipboardComponent } from "./copy-to-clipboard/copy-to-clipboard.component";

@NgModule({
    imports: [
        ClipboardModule,
        CommonModule,
        MatIconModule
    ],
    declarations: [
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CopyToClipboardComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        ModalLayoutComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent
    ],
    providers: [
        ResponsiveService
    ],
    exports: [
        CommonModule,
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CopyToClipboardComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        ModalLayoutComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent
    ]
})
export class SharedModule {
}

