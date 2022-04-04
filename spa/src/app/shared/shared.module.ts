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
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";

// App Dependencies
import { GTMService } from "./analytics/gtm.service";
import { AnnouncementComponent } from "./announcement/announcement.component";
import { CopyToClipboardComponent } from "./copy-to-clipboard/copy-to-clipboard.component";
import { DownloadButtonComponent } from "./download-button/download-button.component";
import { DownloadModalButtonComponent } from "./download-modal-button/download-modal-button.component";
import { FileDownloadComponent } from "./file-download/file-download.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab.component";
import { HCATooltipComponent } from "./hca-tooltip/hca-tooltip.component";
import { KeyValuePairComponent } from "./key-value-pair/key-value-pair.component";
import { KeyValuePairLayoutComponent } from "./key-value-pair/key-value-pair-layout.component";
import { LearnMoreComponent } from "./learn-more/learn-more.component";
import { NavComponent } from "./nav/nav.component";
import { NoHitsComponent } from "./no-hits/no-hits.component";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";
import { ResponsiveService } from "./responsive/responsive.service";
import { BrowserCanActivateGuard } from "./routing/browser.can-activate.guard";
import { RoutingService } from "./routing/routing.service";
import { StatusPanelComponent } from "./status-panel/status-panel.component";
import { ToolbarNavComponent } from "./toolbar-nav/toolbar-nav.component";
import { ToolbarNavDropDownComponent } from "./toolbar-nav-drop-down/toolbar-nav-drop-down.component";
import { ToolbarNavItemComponent } from "./toolbar-nav-item/toolbar-nav-item.component";
import { ToolbarNavSubMenuComponent } from "./toolbar-nav-sub-menu/toolbar-nav-sub-menu.component";
import { ToolbarNavSubMenuItemComponent } from "./toolbar-nav-sub-menu-item/toolbar-nav-sub-menu-item.component";
import { ToolbarPortalSearchComponent } from "./toolbar-portal-search/toolbar-portal-search.component";
import { ToolbarSocialComponent } from "./toolbar-social/toolbar-social.component";
import { ToolbarSocialsComponent } from "./toolbar-socials/toolbar-socials.component";
import { ToolbarToolsComponent } from "./toolbar-tools/toolbar-tools.component";
import { UtilService } from "./util/util.service";
import { WarningComponent } from "./warning/warning.component";
import { WarningContentComponent } from "./warning/warning-content.component";
import { WarningTitleComponent } from "./warning/warning-title.component";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ClipboardModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        AnnouncementComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        DownloadModalButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        KeyValuePairLayoutComponent,
        LearnMoreComponent,
        NavComponent,
        NoHitsComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        ToolbarNavComponent,
        ToolbarNavDropDownComponent,
        ToolbarNavItemComponent,
        ToolbarNavSubMenuComponent,
        ToolbarNavSubMenuItemComponent,
        ToolbarPortalSearchComponent,
        ToolbarSocialComponent,
        ToolbarSocialsComponent,
        ToolbarToolsComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent,
    ],
    providers: [
        BrowserCanActivateGuard,
        GTMService,
        ResponsiveService,
        RoutingService,
        UtilService,
    ],
    exports: [
        AnnouncementComponent,
        BrowserAnimationsModule,
        CommonModule,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        DownloadModalButtonComponent,
        FileDownloadComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        KeyValuePairLayoutComponent,
        LearnMoreComponent,
        NavComponent,
        NoHitsComponent,
        PopLayoutComponent,
        StatusPanelComponent,
        ToolbarNavComponent,
        ToolbarNavDropDownComponent,
        ToolbarNavItemComponent,
        ToolbarNavSubMenuComponent,
        ToolbarNavSubMenuItemComponent,
        ToolbarPortalSearchComponent,
        ToolbarSocialComponent,
        ToolbarSocialsComponent,
        ToolbarToolsComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent,
    ],
})
export class SharedModule {}
