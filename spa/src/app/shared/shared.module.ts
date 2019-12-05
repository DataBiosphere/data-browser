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
import { MatProgressSpinnerModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";

// App Dependencies
import { CCToolbarNavComponent } from "./cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavItemComponent } from "./cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { DownloadButtonComponent } from "./download-button/download-button.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab.component";
import { KeyValuePairComponent } from "./key-value-pair/key-value-pair.component";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";
import { ResponsiveService } from "./responsive/responsive.service";
import { StatusPanelComponent } from "./status-panel/status-panel.component";
import { WarningComponent } from "./warning/warning.component";
import { WarningContentComponent } from "./warning/warning-content.component";
import { WarningTitleComponent } from "./warning/warning-title.component";
import { FileDownloadComponent } from "./file-download/file-download.component";
import { CopyToClipboardComponent } from "./copy-to-clipboard/copy-to-clipboard.component";
import { NavComponent } from "./nav/nav.component";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ClipboardModule,
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterModule
    ],
    declarations: [
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        KeyValuePairComponent,
        NavComponent,
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
        BrowserAnimationsModule,
        CommonModule,
        CCToolbarNavComponent,
        CCToolbarNavItemComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        KeyValuePairComponent,
        NavComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent
    ]
})
export class SharedModule {
}

