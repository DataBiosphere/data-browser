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
import { MatProgressSpinnerModule, MatTooltipModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";

// App Dependencies
import { AnnouncementComponent } from "./announcement/announcement.component";
import { CCToolbarNavComponent } from "./cc-toolbar-nav/cc-toolbar-nav.component";
import { CCToolbarNavDropDownComponent } from "./cc-toolbar-nav-drop-down/cc-toolbar-nav-drop-down.component";
import { CCToolbarNavItemComponent } from "./cc-toolbar-nav-item/cc-toolbar-nav-item.component";
import { CCToolbarNavSubMenuComponent} from "./cc-toolbar-nav-sub-menu/cc-toolbar-nav-sub-menu.component";
import { CCToolbarNavSubMenuItemComponent } from "./cc-toolbar-nav-sub-menu-item/cc-toolbar-nav-sub-menu-item.component";
import { DownloadButtonComponent } from "./download-button/download-button.component";
import { GTMService } from "./gtm/gtm.service";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab.component";
import { HCATooltipComponent } from "./hca-tooltip/hca-tooltip.component";
import { KeyValuePairComponent } from "./key-value-pair/key-value-pair.component";
import { LearnMoreComponent } from "./learn-more/learn-more.component";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";
import { ResponsiveService } from "./responsive/responsive.service";
import { StatusPanelComponent } from "./status-panel/status-panel.component";
import { WarningComponent } from "./warning/warning.component";
import { WarningContentComponent } from "./warning/warning-content.component";
import { WarningTitleComponent } from "./warning/warning-title.component";
import { FileDownloadComponent } from "./file-download/file-download.component";
import { CopyToClipboardComponent } from "./copy-to-clipboard/copy-to-clipboard.component";
import { NavComponent } from "./nav/nav.component";
import { NoHitsComponent } from "./no-hits/no-hits.component";
import { BrowserCanActivateGuard } from "./routing/browser.can-activate.guard";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ClipboardModule,
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        RouterModule
    ],
    declarations: [
        AnnouncementComponent,
        CCToolbarNavComponent,
        CCToolbarNavDropDownComponent,
        CCToolbarNavItemComponent,
        CCToolbarNavSubMenuComponent,
        CCToolbarNavSubMenuItemComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        LearnMoreComponent,
        NavComponent,
        NoHitsComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent
    ],
    providers: [
        BrowserCanActivateGuard,
        GTMService,
        ResponsiveService
    ],
    exports: [
        AnnouncementComponent,
        BrowserAnimationsModule,
        CommonModule,
        CCToolbarNavComponent,
        CCToolbarNavDropDownComponent,
        CCToolbarNavItemComponent,
        CCToolbarNavSubMenuComponent,
        CCToolbarNavSubMenuItemComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        LearnMoreComponent,
        NavComponent,
        NoHitsComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent
    ]
})
export class SharedModule {
}

