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

@Component({
    selector: "project-nav",
    templateUrl: "./project-nav.component.html",
    styleUrls: ["./project-nav.component.scss"]
})
export class ProjectNavComponent {

    // Inputs
    @Input() externalResourcesExist: boolean;
    @Input() v2: boolean;

    // Locals
    private dataCitation: NavItem;
    private deviceInfo = null;
    private projectMatrices: NavItem;
    private externalResources: NavItem;
    private ngDestroy$ = new Subject();
    private projectInformation: NavItem;
    private projectMetadata: NavItem;
    private summaryStats: NavItem;

    /**
     * @param {ActivatedRoute} route
     * @param {DeviceDetectorService} deviceService
     */
    constructor(private route: ActivatedRoute, private deviceService: DeviceDetectorService) {}

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
                this.projectMatrices,
                this.externalResources
            ];
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
            
            // Determine whether catalog param should be added to project detail links
            const navigationExtras = {
                    queryParamsHandling: "preserve"
            };

            this.projectInformation = {
                disabled: false,
                display: "Project Information",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_INFORMATION),
                ...navigationExtras
            };

            this.projectMetadata = {
                disabled: false,
                display: "Project Metadata",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.PROJECT_METADATA),
                ...navigationExtras
            };

            this.projectMatrices = {
                disabled: false,
                display: this.v2 ? "Project Matrices" : "Expression Matrices",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXPRESSION_MATRICES),
                ...navigationExtras
            };

            this.externalResources = {
                disabled: !this.externalResourcesExist,
                display: "External Resources",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.EXTERNAL_RESOURCES),
                tooltip: "There are no external resources associated with this project.",
                ...navigationExtras
            };

            this.summaryStats = {
                disabled: false,
                display: "Summary Stats",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.SUMMARY_STATS),
                ...navigationExtras
            };

            this.dataCitation = {
                disabled: false,
                display: "Data Citation",
                routerLink: this.buildRouterLinkForSection(projectId, ProjectNav.DATA_CITATION),
                ...navigationExtras
            };
        });
    }
}
