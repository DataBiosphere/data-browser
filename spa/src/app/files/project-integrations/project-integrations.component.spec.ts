/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectIntegrations.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";
import { ProjectIntegrationsComponent } from "./project-integrations.component";
import { EntityType } from "../shared/entity-type.model";
import { IntegrationType } from "../_ngrx/integration/integration-type.model";

describe("ProjectIntegrationsComponent", () => {
    let component: ProjectIntegrationsComponent;
    let fixture: ComponentFixture<ProjectIntegrationsComponent>;

    const PROJECT_PORTAL_NULL_VALUES = [
        {
            contactEmail: null,
            integrations: [],
            organizationName: null,
            portalDescription: null,
            portalIcon: null,
            portalId: "f58bdc5e-98cd-4df4-80a4-7372dc035e87",
            portalName: null,
        },
    ];
    const PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT = [
        {
            contactEmail: "Irene Papatheodorou irenep@ebi.ac.uk",
            integrations: [
                {
                    entityIds: ["c4077b3c-5c98-4d26-a614-246d12c2e5d7"],
                    entityType: EntityType.PROJECT,
                    integrationId: "e8b3ca4f-bcf5-42eb-b58c-de6d7e0fe138",
                    integrationType: IntegrationType.GET,
                    portalUrl:
                        "https://www.ebi.ac.uk/gxa/sc/experiments/E-EHCA-1/results/tsne",
                    title: "Single-cell RNA-seq analysis of human tissue ischaemic sensitivity",
                },
            ],
            organizationName: "European Bioinformatics Institute",
            portalDescription:
                "Single Cell Expression Atlas annotates publicly available single cell RNA-Seq experiments with ontology identifiers and re-analyses them using standardised pipelines available through SCXA-Workflows, our collection of RNA-Seq analysis pipelines, which is available at https://github.com/ebi-gene-expression-group/scxa-workflows . The browser enables visualisation of clusters of cells, their annotations and supports searches for gene expression within and across studies.",
            portalIcon:
                "https://www.ebi.ac.uk/gxa/sc/resources/images/logos/sc_atlas_logo.png",
            portalId: "f58bdc5e-98cd-4df4-80a4-7372dc035e87",
            portalName: "Single Cell Expression Atlas",
        },
        {
            contactEmail: "peerstr@ucsc.com",
            integrations: [
                {
                    entityIds: ["4a95101c-9ffc-4f30-a809-f04518a23803"],
                    entityType: EntityType.PROJECT,
                    integrationId: "73aa70fe-e40a-48da-9fa4-bea4c4d2ae74",
                    integrationType: IntegrationType.GET,
                    portalUrl:
                        "https://singlecell.xenabrowser.net/datapages/?cohort=HCA%20Human%20Tissue%20T%20cell%20Activation",
                    title: "HCA Human Tissue T cell Activation",
                },
            ],
            organizationName: "UCSC",
            portalDescription: "Xena Browser",
            portalIcon:
                "https://xenabrowser.net/03340e094d1f3edc51bc3d1a2a589b65.png",
            portalId: "2e05f611-16fb-4bf3-b860-aa500f0256de",
            portalName: "Xena",
        },
    ];
    const PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT = [
        {
            contactEmail: "Irene Papatheodorou irenep@ebi.ac.uk",
            integrations: [
                {
                    entityIds: ["c4077b3c-5c98-4d26-a614-246d12c2e5d7"],
                    entityType: EntityType.PROJECT,
                    integrationId: "e8b3ca4f-bcf5-42eb-b58c-de6d7e0fe138",
                    integrationType: IntegrationType.GET,
                    portalUrl:
                        "https://www.ebi.ac.uk/gxa/sc/experiments/E-EHCA-1/results/tsne",
                    title: "Single-cell RNA-seq analysis of human tissue ischaemic sensitivity",
                },
            ],
            organizationName: "European Bioinformatics Institute",
            portalDescription:
                "Single Cell Expression Atlas annotates publicly available single cell RNA-Seq experiments with ontology identifiers and re-analyses them using standardised pipelines available through SCXA-Workflows, our collection of RNA-Seq analysis pipelines, which is available at https://github.com/ebi-gene-expression-group/scxa-workflows . The browser enables visualisation of clusters of cells, their annotations and supports searches for gene expression within and across studies.",
            portalIcon:
                "https://www.ebi.ac.uk/gxa/sc/resources/images/logos/sc_atlas_logo.png",
            portalId: "f58bdc5e-98cd-4df4-80a4-7372dc035e87",
            portalName: "Single Cell Expression Atlas",
        },
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectIntegrationsComponent],
            imports: [],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectIntegrationsComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {
        expect(component).toBeTruthy();
    });

    /**
     * Confirm single portal is displayed when single portal with single integration value.
     */
    it("should display single portal when single portal with single integration value", () => {
        component.integrations =
            PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT;

        fixture.detectChanges();

        // Confirm correct number of portal values are displayed
        expect(getCountOfPortalEls()).toEqual(
            getCountOfIntegrations(
                PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT
            )
        );
    });

    /**
     * Confirm multiple portals are displayed when multiple portals with single integration value.
     */
    it("should display multiple string portals when multiple portals with single integration value", () => {
        component.integrations =
            PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT;

        fixture.detectChanges();

        // Confirm correct number of portal values are displayed
        expect(getCountOfPortalEls()).toEqual(
            getCountOfIntegrations(
                PROJECT_PORTAL_MULTIPLE_VALUES_SINGLE_INTEGRATION_OBJECT
            )
        );
    });

    /**
     * Confirm no portals are displayed when portal with null values.
     */
    it("should not display any portals when portal with null values", () => {
        component.integrations = PROJECT_PORTAL_NULL_VALUES;

        fixture.detectChanges();

        // Confirm no portal values are displayed
        expect(getCountOfPortalEls()).toEqual(
            getCountOfIntegrations(PROJECT_PORTAL_NULL_VALUES)
        );
    });

    /**
     * Confirm portal url is added to href attribute.
     */
    it("should add portal url to href", () => {
        // Set up initial component state
        component.integrations =
            PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT;

        // Trigger change detection so template updates accordingly
        fixture.detectChanges();

        const portalEl = fixture.debugElement.query(By.css("a"));

        // Confirm portal url is added to href attribute
        expect(portalEl.nativeElement.getAttribute("href")).toEqual(
            getFirstPortalFirstIntegrationUrl(
                PROJECT_PORTAL_SINGLE_VALUE_SINGLE_INTEGRATION_OBJECT
            )
        );
    });

    /**
     * Returns the number of portal integrations.
     *
     * @param {Portal[]} portals
     * @returns {number}
     */
    function getCountOfIntegrations(portals: Portal[]): number {
        if (!portals) {
            return 0;
        }

        return portals.reduce(
            (integrationCount, portal) =>
                integrationCount + portal.integrations.length,
            0
        );
    }

    /**
     * Returns the total number of portals displayed.
     *
     * @returns {number}
     */
    function getCountOfPortalEls(): number {
        return fixture.debugElement.queryAll(By.css(".fontsize-xs")).length;
    }

    /**
     * Returns the first portal's, first integration's portal url.
     *
     * @param {Portal[]} portals
     * @returns {string}
     */
    function getFirstPortalFirstIntegrationUrl(portals: Portal[]): string {
        if (!portals) {
            return "";
        }

        const portal = portals[0];

        if (!portal) {
            return "";
        }

        const integrations = portal.integrations[0];

        if (!integrations) {
            return "";
        }

        return integrations.portalUrl;
    }
});
