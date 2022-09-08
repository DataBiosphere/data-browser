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
import { CloseIconComponent } from "./custom-icon/close-icon/close-icon.component";
import { GithubIconComponent } from "./custom-icon/github-icon/github-icon.component";
import { MenuIconComponent } from "./custom-icon/menu-icon/menu-icon.component";
import { ProfileIconComponent } from "./custom-icon/profile-icon/profile-icon.component";
import { SearchIconComponent } from "./custom-icon/search-icon/search-icon.component";
import { SlackIconComponent } from "./custom-icon/slack-icon/slack-icon.component";
import { TwitterIconComponent } from "./custom-icon/twitter-icon/twitter-icon.component";
import { DownloadButtonComponent } from "./download-button/download-button.component";
import { DownloadModalButtonComponent } from "./download-modal-button/download-modal-button.component";
import { FileDownloadComponent } from "./file-download/file-download.component";
import { HCASectionTitleComponent } from "./hca-section-title/hca-section-title.component";
import { HCATabComponent } from "./hca-tab/hca-tab.component";
import { HCATooltipComponent } from "./hca-tooltip/hca-tooltip.component";
import { ActionsComponent } from "./header/actions/actions.component";
import { NavComponent } from "./header/nav/nav.component";
import { NavLinkComponent } from "./header/nav-link/nav-link.component";
import { NavLinksComponent } from "./header/nav-links/nav-links.component";
import { PortalSearchComponent } from "./header/portal-search/portal-search.component";
import { ProfileButtonComponent } from "./header/profile-button/profile-button.component";
import { SearchButtonComponent } from "./header/search-button/search-button.component";
import { SocialsComponent } from "./header/socials/socials.component";
import { SocialIconButtonComponent } from "./icon-button/social-icon-button/social-icon-button.component";
import { KeyValuePairComponent } from "./key-value-pair/key-value-pair.component";
import { KeyValuePairLayoutComponent } from "./key-value-pair/key-value-pair-layout.component";
import { LearnMoreComponent } from "./learn-more/learn-more.component";
import { NoHitsComponent } from "./no-hits/no-hits.component";
import { PopLayoutComponent } from "./pop-layout/pop-layout.component";
import { ResponsiveService } from "./responsive/responsive.service";
import { BrowserCanActivateGuard } from "./routing/browser.can-activate.guard";
import { RoutingService } from "./routing/routing.service";
import { StatusPanelComponent } from "./status-panel/status-panel.component";
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
        ActionsComponent,
        AnnouncementComponent,
        CloseIconComponent,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        DownloadModalButtonComponent,
        FileDownloadComponent,
        GithubIconComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        KeyValuePairLayoutComponent,
        LearnMoreComponent,
        MenuIconComponent,
        NavComponent,
        NavLinkComponent,
        NavLinksComponent,
        NoHitsComponent,
        PopLayoutComponent,
        PortalSearchComponent,
        ProfileButtonComponent,
        ProfileIconComponent,
        SearchButtonComponent,
        SearchIconComponent,
        SlackIconComponent,
        SocialIconButtonComponent,
        SocialsComponent,
        StatusPanelComponent,
        TwitterIconComponent,
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
        ActionsComponent,
        AnnouncementComponent,
        BrowserAnimationsModule,
        CloseIconComponent,
        CommonModule,
        CopyToClipboardComponent,
        DownloadButtonComponent,
        DownloadModalButtonComponent,
        FileDownloadComponent,
        GithubIconComponent,
        HCASectionTitleComponent,
        HCATabComponent,
        HCATooltipComponent,
        KeyValuePairComponent,
        KeyValuePairLayoutComponent,
        LearnMoreComponent,
        MenuIconComponent,
        NavComponent,
        NavLinkComponent,
        NavLinksComponent,
        NoHitsComponent,
        PopLayoutComponent,
        PortalSearchComponent,
        ProfileButtonComponent,
        ProfileIconComponent,
        SearchButtonComponent,
        SearchIconComponent,
        SlackIconComponent,
        SocialIconButtonComponent,
        SocialsComponent,
        StatusPanelComponent,
        TwitterIconComponent,
        WarningComponent,
        WarningContentComponent,
        WarningTitleComponent,
    ],
})
export class SharedModule {}
