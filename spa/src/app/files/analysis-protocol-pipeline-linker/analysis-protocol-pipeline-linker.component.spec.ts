/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for AnalysisProtocolPipelineLinker.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AnalysisProtocolPipelineLinkerComponent } from "./analysis-protocol-pipeline-linker.component";

describe("AnalysisProtocolPipelineLinkerComponent", () => {
    let component: AnalysisProtocolPipelineLinkerComponent;
    let fixture: ComponentFixture<AnalysisProtocolPipelineLinkerComponent>;

    const testConfig = jasmine.createSpyObj("ConfigService", ["getPortalUrl"]);

    // Create response for testConfig.getPortalUrl()
    testConfig.getPortalUrl.and.returnValue("https://test.com");

    // Local values
    const LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY = {
        smartseq2: "/pipelines/smart-seq2-workflow",
        optimus: "/pipelines/optimus-workflow",
    };

    // Index values
    const INDEX_OF_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY_OPTIMUS = 1;
    const INDEX_OF_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY_SMARTSEQ2 = 0;

    // Template values
    const TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2 =
        "/pipelines/smart-seq2-workflow";
    const TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS =
        "/pipelines/optimus-workflow";

    // Test values
    const TEST_VALUE_CELL_RANGER = "cellranger_v1.0.1";
    const TEST_VALUE_OPTIMUS = "optimus_v1.3.2";
    const TEST_VALUE_SMARTSEQ2 = "smartseq2_v2.4.0";
    const TEST_VALUE_ANALYSIS_PROTOCOLS_MULTIPLE_MIXED_VALUES = [
        TEST_VALUE_CELL_RANGER,
        TEST_VALUE_OPTIMUS,
        TEST_VALUE_SMARTSEQ2,
    ];

    // Input values
    const INPUT_VALUE_WORKFLOW_MULTIPLE_LINKED_VALUES =
        "optimus_v2.0.2, optimus_v1.3.2, smartseq2_v2.4.0";
    const INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES =
        "cellranger_v1.0.1, optimus_v1.3.2, smartseq2_v2.4.0";
    const INPUT_VALUE_WORKFLOW_MULTIPLE_UNLINKED_VALUES =
        "cellranger_v1.0.1, cellranger_v1.0.4, se-rm-pipeline-version-output";
    const INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE = TEST_VALUE_OPTIMUS;
    const INPUT_VALUE_WORKFLOW_SINGLE_SMARTSEQ2_VALUE = TEST_VALUE_SMARTSEQ2;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AnalysisProtocolPipelineLinkerComponent],
            imports: [],
            providers: [
                {
                    provide: ConfigService,
                    useValue: testConfig,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(
            AnalysisProtocolPipelineLinkerComponent
        );
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {
        expect(component).toBeTruthy();
    });

    /**
     * Confirm get pipeline link returns corresponding data portal optimus link when analysis protocol includes "optimus".
     */
    it(`returns data portal optimus link when analysis protocol includes "optimus"`, () => {
        // Confirm link is for data portal optimus
        const pipelineLink = component.getPipelineLink(TEST_VALUE_OPTIMUS);
        expect(pipelineLink).toEqual(
            `${testConfig.getPortalUrl()}${TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS}`
        );
    });

    /**
     * Confirm get pipeline link returns corresponding data portal smartseq2 link when analysis protocol includes "smartseq2".
     */
    it(`returns data portal smartseq2 link when analysis protocol includes "smartseq2"`, () => {
        // Confirm link is for data portal smartseq2
        const pipelineLink = component.getPipelineLink(TEST_VALUE_SMARTSEQ2);
        expect(pipelineLink).toEqual(
            `${testConfig.getPortalUrl()}${TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2}`
        );
    });

    /**
     * Confirm get pipeline link returns the root base path when there is no corresponding pipeline.
     */
    it("returns root base path when there is no corresponding pipeline (error flow)", () => {
        // Confirm no link is returned
        const pipelineLink = component.getPipelineLink(TEST_VALUE_CELL_RANGER);
        expect(pipelineLink).toEqual("/");
    });

    /**
     * Confirm is analysis protocol linked returns true when analysis protocol includes "optimus".
     */
    it(`recognizes "optimus" as a workflow with a corresponding data portal pipeline link`, () => {
        // Confirm true is returned
        const analysisProtocolLinked =
            component.isAnalysisProtocolLinked(TEST_VALUE_OPTIMUS);
        expect(analysisProtocolLinked).toEqual(true);
    });

    /**
     * Confirm is analysis protocol linked returns true when analysis protocol includes "smartseq2".
     */
    it(`recognizes "smartseq2" as a workflow with a corresponding data portal pipeline link`, () => {
        // Confirm true is returned
        const analysisProtocolLinked =
            component.isAnalysisProtocolLinked(TEST_VALUE_SMARTSEQ2);
        expect(analysisProtocolLinked).toEqual(true);
    });

    /**
     * Confirm is analysis protocol linked returns false when analysis protocol neither includes "smartseq2" nor "optimus".
     */
    it(`recognizes that a worflow with neither "smartseq2" nor "optimus" has no data portal pipeline link`, () => {
        // Confirm true is returned
        const analysisProtocolLinked = component.isAnalysisProtocolLinked(
            TEST_VALUE_CELL_RANGER
        );
        expect(analysisProtocolLinked).toEqual(false);
    });

    /**
     * Confirm list analysis protocols returns a concatenated string array when multiple workflow values.
     */
    it("splits multiple workflow values into a string array with multiple values", () => {
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;
        fixture.detectChanges();

        // Confirm get analysis protocols returns a concatenated string array
        const analysisProtocols = component.listAnalysisProtocols();
        expect(analysisProtocols).toEqual(
            TEST_VALUE_ANALYSIS_PROTOCOLS_MULTIPLE_MIXED_VALUES
        );
    });

    /**
     * Confirm list analysis protocols returns a string array when single workflow values.
     */
    it("converts a single workflow value into a string array with one value", () => {
        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE;
        fixture.detectChanges();

        // Confirm get analysis protocols returns a string array
        const analysisProtocols = component.listAnalysisProtocols();
        expect(analysisProtocols).toEqual([TEST_VALUE_OPTIMUS]);
    });

    /**
     * Confirm list analysis protocols returns an empty array when empty workflow values.
     */
    it("returns an empty array when there is no workflow", () => {
        component.workflow = "";
        fixture.detectChanges();

        // Confirm get analysis protocols returns a concatenated string array
        const analysisProtocols = component.listAnalysisProtocols();
        expect(analysisProtocols).toEqual([]);
    });

    /**
     * Confirm find analysis protocol key returns "optimus" when analysis protocol includes "optimus".
     */
    it(`returns protocol key "optimus" when analysis protocol includes "optimus"`, () => {
        // Confirm key returned is "optimus"
        const analysisProtocolKey = component["findAnalysisProtocolKey"](
            LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY,
            TEST_VALUE_OPTIMUS
        );
        const key = Object.keys(
            LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY
        )[INDEX_OF_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY_OPTIMUS];
        expect(analysisProtocolKey).toEqual(key);
    });

    /**
     * Confirm find analysis protocol key returns "smartseq2" when analysis protocol includes "smartseq2".
     */
    it(`returns protocol key "smartseq2" when analysis protocol includes "smartseq2"`, () => {
        // Confirm key returned is "smartseq2"
        const analysisProtocolKey = component["findAnalysisProtocolKey"](
            LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY,
            TEST_VALUE_SMARTSEQ2
        );
        const key = Object.keys(
            LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY
        )[INDEX_OF_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY_SMARTSEQ2];
        expect(analysisProtocolKey).toEqual(key);
    });

    /**
     * Confirm find analysis protocol key returns undefined when analysis protocol is neither includes "smartseq2" nor "optimus".
     */
    it(`returns undefined when analysis protocol is neither includes "smartseq2" nor "optimus"`, () => {
        // Confirm key returned is undefined
        const analysisProtocolKey = component["findAnalysisProtocolKey"](
            LOCAL_VALUE_PIPELINE_LINKS_BY_ANALYSIS_PROTOCOL_KEY,
            TEST_VALUE_CELL_RANGER
        );
        expect(analysisProtocolKey).toBeUndefined();
    });

    /**
     * Confirm all unlinked analysis protocols are displayed, when multiple unlinked workflow.
     */
    it("displays plain text for a list of workflows that have no corresponding pipelines", () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_UNLINKED_VALUES;

        fixture.detectChanges();

        // Confirm all protocols are displayed
        expect(getAnalysisProtocolsDisplayed("span").length).toEqual(3);
    });

    /**
     * Confirm all linked analysis protocols are displayed, when multiple linked workflow.
     */
    it("displays links for a list of workflows that all have corresponding pipelines", () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_LINKED_VALUES;

        fixture.detectChanges();

        // Confirm all protocols are displayed
        expect(getAnalysisProtocolsDisplayed("a").length).toEqual(3);
    });

    /**
     * Confirm all analysis protocols are displayed, when multiple mixed workflow.
     */
    it("displays links and plain text for analysis protocols when multiple mixed workflow", () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;

        fixture.detectChanges();

        // Confirm all protocols are displayed
        expect(getAnalysisProtocolsDisplayed("a").length).toEqual(2);
        expect(getAnalysisProtocolsDisplayed("span").length).toEqual(1);
    });

    /**
     * Confirm no analysis protocols are displayed, when workflow is empty.
     */
    it("displays no analysis protocols when workflow is empty", () => {
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
    it(`links to optimus pipeline when workflow includes "optimus"`, () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_OPTIMUS_VALUE;

        fixture.detectChanges();

        const analysisPortalDEs = getAnalysisProtocolsDisplayed("a");

        // Confirm href link
        expect(getHrefValue(analysisPortalDEs[0])).toEqual(
            `${testConfig.getPortalUrl()}${TEMPLATE_VALUE_DATA_PORTAL_LINK_OPTIMUS}`
        );
    });

    /**
     * Confirm data portal smartseq2 pipeline link is added to href attribute when workflow includes "smartseq2".
     */
    it(`links to smartseq2 pipeline when workflow includes "smartseq2"`, () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_SINGLE_SMARTSEQ2_VALUE;

        fixture.detectChanges();

        const analysisPortalDEs = getAnalysisProtocolsDisplayed("a");

        // Confirm href link
        expect(getHrefValue(analysisPortalDEs[0])).toEqual(
            `${testConfig.getPortalUrl()}${TEMPLATE_VALUE_DATA_PORTAL_LINK_SMARTSEQ2}`
        );
    });

    /**
     * Confirm comma is not displayed last when multiple workflow.
     */
    it("correctly delimits list of workflows", () => {
        // Set up initial component state
        component.workflow = INPUT_VALUE_WORKFLOW_MULTIPLE_MIXED_VALUES;

        fixture.detectChanges();

        const componentChildren = fixture.debugElement.children;
        const componentChildLast =
            componentChildren[componentChildren.length - 1];

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

        if (!debugElements) {
            return;
        }

        return debugElements.filter(
            (spanDE) => spanDE.nativeElement.innerHTML !== ", "
        );
    }

    /**
     * Returns the href attribute value for the specified debug element.
     *
     * @param {DebugElement} de
     * @returns {string}
     */
    function getHrefValue(de: DebugElement): string {
        if (!de) {
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
