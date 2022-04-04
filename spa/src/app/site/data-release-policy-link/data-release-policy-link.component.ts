/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Data release policy link, dynamically switches out link component depending on site config.
 */

// Core dependencies
import {
    Component,
    ComponentFactoryResolver,
    Inject,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";

// App dependencies
import { SiteConfigService } from "../site-config/site-config.service";
import { SITE_CONFIG_SERVICE } from "../site-config/site-config.token";

@Component({
    selector: "data-release-policy-link",
    templateUrl: "data-release-policy-link.component.html",
    styleUrls: ["data-release-policy-link.component.scss"],
})
export class DataReleasePolicyLinkComponent implements OnInit {
    // View child
    @ViewChild("link", { static: true, read: ViewContainerRef })
    anchorRef: ViewContainerRef;

    /**
     * @param {SiteConfigService} siteConfigService
     * @param {ComponentFactoryResolver} componentFactoryResolver
     */
    constructor(
        @Inject(SITE_CONFIG_SERVICE)
        private siteConfigService: SiteConfigService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    /**
     * Set up header and footer components depending on the site config.
     */
    private initViewContainers() {
        const linkComponent =
            this.siteConfigService.getDataReleasePolicyLinkComponent();
        this.insertComponent(linkComponent, this.anchorRef);
    }

    /**
     * Insert the specified component into the specified view container.
     *
     * @param {Type<any>} component
     * @param {ViewContainerRef} viewContainerRef
     */
    private insertComponent(
        component: Type<any>,
        viewContainerRef: ViewContainerRef
    ) {
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(component);

        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    }

    /**
     * Dynamically switch out link component depending on site config.
     */
    public ngOnInit() {
        this.initViewContainers();
    }
}
