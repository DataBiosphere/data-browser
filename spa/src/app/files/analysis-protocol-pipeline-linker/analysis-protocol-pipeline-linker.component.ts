/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for analysis protocol pipeline linker.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { AnalysisProtocolViewedEvent } from "./analysis-protocol-viewed.event";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "analysis-protocol-pipeline-linker",
    templateUrl: "./analysis-protocol-pipeline-linker.component.html",
    styleUrls: ["./analysis-protocol-pipeline-linker.component.scss"],
})
export class AnalysisProtocolPipelineLinkerComponent {
    // Inputs
    @Input() workflow: string;

    // Outputs
    @Output() analysisProtocolViewed =
        new EventEmitter<AnalysisProtocolViewedEvent>();

    // Template variables
    public portalURL: string;

    // Locals
    private pipelineLinksByAnalysisProtocolKey = {
        smartseq2: "/pipelines/smart-seq2-workflow",
        optimus: "/pipelines/optimus-workflow",
    };

    /**
     *
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {
        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Returns corresponding Data Portal pipeline link for the specified analysis protocol.
     *
     * @param {string} analysisProtocol
     * @returns {string}
     */
    public getPipelineLink(analysisProtocol: string): string {
        const analysisProtocolKey = this.findAnalysisProtocolKey(
            this.pipelineLinksByAnalysisProtocolKey,
            analysisProtocol
        );

        if (!analysisProtocolKey) {
            return "/";
        }

        const pipelineLink =
            this.pipelineLinksByAnalysisProtocolKey[analysisProtocolKey];

        return `${this.portalURL}${pipelineLink}`;
    }

    /**
     * Returns true if the analysis protocol has a corresponding pipeline in the Data Portal.
     *
     * @param {string} analysisProtocol
     * @returns {boolean}
     */
    public isAnalysisProtocolLinked(analysisProtocol: string): boolean {
        return !!this.findAnalysisProtocolKey(
            this.pipelineLinksByAnalysisProtocolKey,
            analysisProtocol
        );
    }

    /**
     * Returns concatenated string array of workflow values.
     *
     * @returns {string[]}
     */
    public listAnalysisProtocols(): string[] {
        if (!this.workflow) {
            return [];
        }

        return this.workflow.split(", ");
    }

    /**
     * Let parents know analysis protocol link has been clicked.
     *
     * @param {string} analysisProtocol
     */
    public onAnalysisProtocolLinkClicked(analysisProtocol: string) {
        this.analysisProtocolViewed.emit({
            analysisProtocol,
            url: this.getPipelineLink(analysisProtocol),
        });
    }

    /**
     * Returns the analysis protocol key for the specified analysis protocol.
     *
     * @param {Object} pipelineLinksByAnalysisProtocol
     * @param {string} analysisProtocol
     * @returns {string}
     */
    private findAnalysisProtocolKey(
        pipelineLinksByAnalysisProtocol: Object,
        analysisProtocol: string
    ): string {
        return Object.keys(pipelineLinksByAnalysisProtocol).find((key) => {
            return analysisProtocol.includes(key);
        });
    }
}
