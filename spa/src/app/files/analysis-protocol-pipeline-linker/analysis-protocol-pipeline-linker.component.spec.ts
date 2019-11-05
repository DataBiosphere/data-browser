/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for AnalysisProtocolPipelineLinker.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AnalysisProtocolPipelineLinkerComponent } from "./analysis-protocol-pipeline-linker.component";

describe("AnalysisProtocolPipelineLinkerComponent", () => {

    let component: AnalysisProtocolPipelineLinkerComponent;
    let fixture: ComponentFixture<AnalysisProtocolPipelineLinkerComponent>;

    const testConfig = jasmine.createSpyObj("ConfigService", ["getPortalURL"]);

    // Create response for testConfig.getPortalUrl()
    testConfig.getPortalURL.and.returnValue("https://test.com");

    // Template values
    const TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2 = "/pipelines/smart-seq2-workflow";
    const TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS = "/pipelines/optimus-workflow";

    // Test values
    const TEST_VALUE_CELL_RANGER = "cellranger_v1.0.1";
    const TEST_VALUE_OPTIMUS = "optimus_v1.3.2";
    const TEST_VALUE_SMARTSEQ2 = "smartseq2_v2.4.0";
    const TEST_VALUE_ANALYSIS_PROTOCOLS_MULTIPLE_MIXED_VALUES = [TEST_VALUE_CELL_RANGER, TEST_VALUE_OPTIMUS, TEST_VALUE_SMARTSEQ2];

    // Input values
    const INPUT_VALUE_WORKFLOW_MULTIPLE_LINKED_VALUES = "optimus_v2.0.2, optimus_v1.3.2, smartseq2_v2.4.0";
    const INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES = "cellranger_v1.0.1, optimus_v1.3.2, smartseq2_v2.4.0";
    const INPUT_VALUE_WORKFLOW_MULTIPLE_UNLINKED_VALUES = "cellranger_v1.0.1, cellranger_v1.0.4, se-rm-pipeline-version-output";
    const INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE = TEST_VALUE_OPTIMUS;
    const INPUT_VALUE_WORKFLOW_SINGLE_SMARTSEQ2_VALUE = TEST_VALUE_SMARTSEQ2;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AnalysisProtocolPipelineLinkerComponent
            ],
            imports: [],
            providers: [{
                provide: ConfigService,
                useValue: testConfig
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(AnalysisProtocolPipelineLinkerComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm get analysis protocols returns a concatenated string array when multiple workflow values.
     */
    it("should get analysis protocols returns a concatenated string array when multiple workflow values", () => {

        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;
        fixture.detectChanges();

        // Confirm get analysis protocols returns a concatenated string array
        const getAnalysisProtocols = component.getAnalysisProtocols();
        expect(getAnalysisProtocols).toEqual(TEST_VALUE_ANALYSIS_PROTOCOLS_MULTIPLE_MIXED_VALUES);
    });

    /**
     * Confirm get analysis protocols returns a string array when single workflow values.
     */
    it("should get analysis protocols returns a string array when single workflow values", () => {

        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE;
        fixture.detectChanges();

        // Confirm get analysis protocols returns a string array
        const getAnalysisProtocols = component.getAnalysisProtocols();
        expect(getAnalysisProtocols).toEqual([TEST_VALUE_OPTIMUS]);
    });

    /**
     * Confirm get analysis protocols returns an empty array when empty workflow values.
     */
    it("should get analysis protocols returns an empty array when empty workflow values", () => {

        component.workflow = "";
        fixture.detectChanges();

        // Confirm get analysis protocols returns a concatenated string array
        const getAnalysisProtocols = component.getAnalysisProtocols();
        expect(getAnalysisProtocols).toEqual([]);
    });
    /**
     * Confirm get analysis protocols returns a string array when single workflow values.
     */
    it("should get analysis protocols returns a string array when single workflow values", () => {

        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE;
        fixture.detectChanges();

        // Confirm get analysis protocols returns a string array
        const getAnalysisProtocols = component.getAnalysisProtocols();
        expect(getAnalysisProtocols).toEqual([TEST_VALUE_OPTIMUS]);
    });

    /**
     * Confirm get pipeline link returns corresponding data portal optimus link when analysis protocol includes "optimus".
     */
    it(`should get pipeline link returns corresponding data portal optimus link when analysis protocol includes "optimus"`, () => {

        // Confirm link is for data portal optimus
        const getPipelineLink = component.getPipelineLink(TEST_VALUE_OPTIMUS);
        expect(getPipelineLink).toEqual(testConfig.getPortalURL() + TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS);
    });

    /**
     * Confirm get pipeline link returns corresponding data portal smartseq2 link when analysis protocol includes "smartseq2".
     */
    it(`should get pipeline link returns corresponding data portal smartseq2 link when analysis protocol includes "smartseq2"`, () => {

        // Confirm link is for data portal smartseq2
        const getPipelineLink = component.getPipelineLink(TEST_VALUE_SMARTSEQ2);
        expect(getPipelineLink).toEqual(testConfig.getPortalURL() + TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2);
    });

    /**
     * Confirm get pipeline link returns the root base path when there is no corresponding pipeline.
     */
    it("should get pipeline link returns the root base path when there is no corresponding pipeline", () => {

        // Confirm no link is returned
        const getPipelineLink = component.getPipelineLink(TEST_VALUE_CELL_RANGER);
        expect(getPipelineLink).toEqual("/");
    });

    /**
     * Confirm is analysis protocol linked returns true when analysis protocol includes "optimus".
     */
    it(`should is analysis protocol linked returns true when analysis protocol includes "optimus"`, () => {

        // Confirm true is returned
        const isAnalysisProtocolLinked = component.isAnalysisProtocolLinked(TEST_VALUE_OPTIMUS);
        expect(isAnalysisProtocolLinked).toEqual(true);
    });

    /**
     * Confirm is analysis protocol linked returns true when analysis protocol includes "smartseq2".
     */
    it(`should is analysis protocol linked returns true when analysis protocol includes "smartseq2"`, () => {

        // Confirm true is returned
        const isAnalysisProtocolLinked = component.isAnalysisProtocolLinked(TEST_VALUE_SMARTSEQ2);
        expect(isAnalysisProtocolLinked).toEqual(true);
    });

    /**
     * Confirm is analysis protocol linked returns false when analysis protocol neither includes "smartseq2" nor "optimus".
     */
    it(`should is analysis protocol linked returns true when analysis protocol neither includes "smartseq2" nor "optimus"`, () => {

        // Confirm true is returned
        const isAnalysisProtocolLinked = component.isAnalysisProtocolLinked(TEST_VALUE_CELL_RANGER);
        expect(isAnalysisProtocolLinked).toEqual(false);
    });

    /**
     * Confirm all unlinked analysis protocols are displayed, when multiple unlinked workflow.
     */
    it("should display all unlinked analysis protocols when multiple unlinked workflow", () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_UNLINKED_VALUES;

        fixture.detectChanges();

        // Confirm all protocols are displayed
        expect(getAnalysisProtocolsDisplayed("span").length).toEqual(3);
    });

    /**
     * Confirm all linked analysis protocols are displayed, when multiple linked workflow.
     */
    it("should display all linked analysis protocols when multiple linked workflow", () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_LINKED_VALUES;

        fixture.detectChanges();

        // Confirm all protocols are displayed
        expect(getAnalysisProtocolsDisplayed("a").length).toEqual(3);
    });

    /**
     * Confirm all linked analysis protocols are displayed, when multiple mixed workflow.
     */
    it("should display all linked analysis protocols when multiple mixed workflow", () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;

        fixture.detectChanges();

        // Confirm linked protocols are displayed
        expect(getAnalysisProtocolsDisplayed("a").length).toEqual(2);
    });

    /**
     * Confirm all unlinked analysis protocols are displayed, when multiple mixed workflow.
     */
    it("should display all unlinked analysis protocols when multiple mixed workflow", () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;

        fixture.detectChanges();

        // Confirm unlinked protocols are displayed
        expect(getAnalysisProtocolsDisplayed("span").length).toEqual(1);
    });

    /**
     * Confirm no analysis protocols are displayed, when workflow is empty.
     */
    it("should display no analysis protocols when workflow is empty", () => {

        // Set up initial component state
        component.workflow = "";

        fixture.detectChanges();

        // Confirm no protocols are displayed
        expect(getAnalysisProtocolsDisplayed("span").length).toEqual(0);
        expect(getAnalysisProtocolsDisplayed("a").length).toEqual(0);
    });

    /**
     * Confirm data portal optimus pipeline link is added to href attribute when workflow includes "optimus".
     */
    it(`should data portal optimus pipeline link is added to href attribute when workflow includes "optimus"`, () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE;

        fixture.detectChanges();

        const analysisPortalDEs = getAnalysisProtocolsDisplayed("a");

        // Confirm href link
        expect(getHrefValue(analysisPortalDEs[0])).toEqual(testConfig.getPortalURL() + TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS);
    });

    /**
     * Confirm data portal smartseq2 pipeline link is added to href attribute when workflow includes "smartseq2".
     */
    it(`should data portal smartseq2 pipeline link is added to href attribute when workflow includes "smartseq2"`, () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_SMARTSEQ2_VALUE;

        fixture.detectChanges();

        const analysisPortalDEs = getAnalysisProtocolsDisplayed("a");

        // Confirm href link
        expect(getHrefValue(analysisPortalDEs[0])).toEqual(testConfig.getPortalURL() + TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2);
    });

    /**
     * Confirm comma is not displayed last when multiple workflow.
     */
    it("should not display comma last when multiple workflow", () => {

        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;

        fixture.detectChanges();

        const componentChildren = fixture.debugElement.children;
        const componentChildLast = componentChildren[componentChildren.length - 1];

        // Confirm comma is not displayed last
        expect(componentChildLast.children.length).toEqual(0);
    });

    /**
     * Returns all analysis protocols displayed, specified by class name.
     *
     * @param {string} className
     * @returns {DebugElement[]}
     */
    function getAnalysisProtocolsDisplayed(className: string): DebugElement[] {

        const debugElements = getDebugElements(className);

        if ( !debugElements ) {

            return;
        }

        return debugElements.filter(spanDE => spanDE.nativeElement.innerHTML !== ", ");
    }

    /**
     * Returns the href attribute value for the specified debug element.
     *
     * @param {DebugElement} de
     * @returns {string}
     */
    function getHrefValue(de: DebugElement): string {

        if ( !de ) {

            return;
        }

        return de.properties.href;
    }

    /**
     * Returns all debug elements specified by class name.
     *
     * @param {string} className
     * @returns {DebugElement[]}
     */
    function getDebugElements(className: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(className));
    }
});
