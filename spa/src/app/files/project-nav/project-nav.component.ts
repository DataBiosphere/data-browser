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
import { NavItem } from "../../shared/nav/nav-item.model";
import { EntityName } from "../shared/entity-name.model";
import { ProjectNav } from "./project-nav.model";

@Component({
    selector: "project-nav",
    templateUrl: "./project-nav.component.html",
    styleUrls: ["./project-nav.component.scss"]
})
export class ProjectNavComponent {

    // Inputs
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
    private supplementaryLinks: NavItem;

    /**
     * @param {ActivatedRoute} route
     * @param {DeviceDetectorService} deviceService
     */
    constructor(route: ActivatedRoute, private deviceService: DeviceDetectorService) {

        route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(params => {

            const projectId = params.id;

            this.projectInformation = {
                display: "Project Information",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_INFORMATION)
            };

            this.projectMetadata = {
                display: "Project Metadata",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_METADATA)
            };

            this.expressionMatrices = {
                display: "Expression Matrices",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXPRESSION_MATRICES)
            };

            this.supplementaryLinks = {
                display: "Supplementary Links",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUPPLEMENTARY_LINKS)
            };

            this.externalResources = {
                display: "External Resources",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXTERNAL_RESOURCES)
            };

            this.summaryStats = {
                display: "Summary Stats",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUMMARY_STATS)
            };

            this.dataCitation = {
                display: "Data Citation",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_CITATION)
            };

            this.projectReleases = {
                display: "Releases",
                subNavItems: [{
                    display: "2020 March Data Release",
                    routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_RELEASE_2020_MAR)
                }]
            }
        });
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
                this.supplementaryLinks,
                this.externalResources
            ];

            // Check if project is a part of the release and add "releases" to the nav accordingly
            if ( this.projectInRelease ) {

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
}
