/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project nav. 
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ProjectNav } from "./project-nav.model";
import { EntityName } from "../shared/entity-name.model";

@Component({
    selector: "project-nav",
    templateUrl: "./project-nav.component.html",
    styleUrls: ["./project-nav.component.scss"]
})
export class ProjectNavComponent {

    // Locals
    private navItems;
    private ngDestroy$ = new Subject();
    private deviceInfo = null;

    /**
     * @param {ActivatedRoute} route
     * @param {DeviceDetectorService} deviceService
     */
    constructor(route: ActivatedRoute, private deviceService: DeviceDetectorService) {

        route.params.pipe(takeUntil(this.ngDestroy$)).subscribe(params => {

            const projectId = params.id;

            const projectInformation = {
                display: "Project Information",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_INFORMATION)
            };

            const projectMetadata = {
                display: "Project Metadata",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_METADATA)
            };

            const expressionMatrices = {
                display: "Expression Matrices",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXPRESSION_MATRICES)
            };

            const supplementaryLinks = {
                display: "Supplementary Links",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUPPLEMENTARY_LINKS)
            };

            const externalResources = {
                display: "External Resources",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXTERNAL_RESOURCES)
            };

            const summaryStats = {
                display: "Summary Stats",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUMMARY_STATS)
            };

            const dataCitation = {
                display: "Data Citation",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_CITATION)
            };

            const projectReleases = {
                display: "Releases",
                routerLink: "",
                subNavItems: [{
                    display: "2020 March Data Release",
                    routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_RELEASE_2020_MAR)
                }]
            };

            let navItemList;

            // Check if device is handheld and set up nav accordingly
            if ( this.isDeviceHandheld() ) {

                navItemList = [projectInformation, externalResources];
            }
            else {

                navItemList =
                    [projectInformation, projectMetadata, expressionMatrices, supplementaryLinks, externalResources, projectReleases];
            }

            this.navItems = navItemList;
        });
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
