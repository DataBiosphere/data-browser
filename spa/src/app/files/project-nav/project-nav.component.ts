/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project nav. 
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ProjectNav } from "./project-nav.model";
import { EntityName } from "../shared/entity-name.model";
import { NavItem } from "../../shared/nav/nav-item.model";
import { ReleaseService } from "../shared/release.service";

@Component({
    selector: "project-nav",
    templateUrl: "./project-nav.component.html",
    styleUrls: ["./project-nav.component.scss"]
})
export class ProjectNavComponent {

    // Inputs
    @Input() externalResourcesExist: boolean;
    @Input() projectInRelease: boolean;

    // Locals
    private dataCitation: NavItem;
    private deviceInfo = null;
    private expressionMatrices: NavItem;
    private externalResources: NavItem;
    private ngDestroy$ = new Subject();
    private projectInformation: NavItem;
    private projectMetadata: NavItem;
    private projectReleases: NavItem;
    private summaryStats: NavItem;

    /**
     * @param {ActivatedRoute} route
     * @param {DeviceDetectorService} deviceService
     * @param {ReleaseService} releaseService
     */
    constructor(private route: ActivatedRoute,
                private deviceService: DeviceDetectorService,
                private releaseService: ReleaseService) {
    }

    /**
     * Build up list of navigation items for the project detail page.
     *
     * @returns {any}
     */
    public buildNavItems() {

        let navItemList;

        // Check if device is handheld and set up nav accordingly
        if ( this.isDeviceHandheld() ) {

            navItemList = [
                this.projectInformation,
                this.externalResources
            ];
        }
        else {

            navItemList = [
                this.projectInformation,
                this.projectMetadata,
                this.expressionMatrices,
                this.externalResources
            ];

            // Check if project is a part of the release and add "releases" to the nav accordingly
            if ( this.releaseService.isReleaseVisible() && this.projectInRelease ) {

                navItemList.push(this.projectReleases);
            }
        }

        return navItemList;
    }

    /**
     * Build up router link to specified project detail page section.
     *
     * @param {string} projectId
     * @param {string} sectionPath
     * @returns {string[]}
     */
    private buildRouterLinkForSection(projectId: string, sectionPath: string): string[] {

        const routerLink = [`/${EntityName.PROJECTS}`, projectId];

        if ( sectionPath && sectionPath.includes("/") ) {

            sectionPath.split("/").map(path => routerLink.push(path));
        }
        else if ( sectionPath ) {

            routerLink.push(sectionPath);
        }

        return routerLink;
    }

    /**
     * Returns true if device is either mobile or tablet.
     *
     * @returns {boolean}
     */
    private isDeviceHandheld(): boolean {

        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();

        return (isMobile || isTablet);
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        this.route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(params => {

            const projectId = params.id;

            this.projectInformation = {
                disabled: false,
                display: "Project Information",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_INFORMATION)
            };

            this.projectMetadata = {
                disabled: false,
                display: "Project Metadata",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_METADATA)
            };

            this.expressionMatrices = {
                disabled: false,
                display: "Expression Matrices",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXPRESSION_MATRICES)
            };

            this.externalResources = {
                disabled: !this.externalResourcesExist,
                display: "External Resources",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXTERNAL_RESOURCES),
                tooltip: "There are no external resources associated with this project."
            };

            this.summaryStats = {
                disabled: false,
                display: "Summary Stats",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUMMARY_STATS)
            };

            this.dataCitation = {
                disabled: false,
                display: "Data Citation",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_CITATION)
            };

            if ( this.releaseService.isReleaseVisible() ) {
                this.projectReleases = {
                    disabled: false,
                    display: "Releases",
                    subNavItems: [{
                        disabled: false,
                        display: "2020 March Data Release",
                        routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_RELEASE_2020_MAR)
                    }]
                }
            }
        });
    }
}
