/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project matrix data.
 */

// Core dependencies
import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { ConfigService } from "../../config/config.service";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

@Component({
    selector: "hca-get-project-matrix-data",
    templateUrl: "./hca-get-project-matrix-data.component.html",
    styleUrls: ["./hca-get-project-matrix-data.component.scss"]
})
export class HCAGetProjectMatrixDataComponent implements AfterViewInit {

    // Inputs
    @Input() isMatrix: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Output
    @Output() onProjectDataMatrixClose = new EventEmitter<boolean>();

    // Template variables
    cardBottomStyle;
    cardTopStyle;
    cardTransformStyle;

    /**
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService) {
    }

    /**
     * Public API
     */

    /**
     * Return the inline style configuration for the get project matrix data card.
     * @returns {{bottom: any; left: string; top: any; transform: string}}
     */
    getProjectDataByMatrixStyles() {
        return {
            "bottom": this.cardBottomStyle,
            "left": "50%",
            "top": this.cardTopStyle,
            "transform": this.cardTransformStyle
        };
    }

    /**
     * Determines of the position of the project matrix data card relative to the active row.
     * Scrolls window, if required, to position the card.
     */
    public getPositionProjectMatrixDataCard() {

        // Get elements.
        let card = document.getElementsByClassName("project-matrix")[0].getBoundingClientRect(),
            table = document.getElementsByTagName("mat-table")[0].getBoundingClientRect(),
            row = document.getElementsByClassName("mat-row active")[0].getBoundingClientRect(),
            headerRow = document.getElementsByTagName("mat-header-row")[0].getBoundingClientRect();

        // Get element co-ordinates, window scroll position.
        let cardHeight = card.height;
        let headerRowBottom = headerRow.bottom,
            rowBottom = row.bottom,
            rowTop = row.top,
            windowScrollY = window.pageYOffset;

        // Calculate available heights for: window, vertical px above and below card in relation to header row and table bottom, scroll position [includes table snapped/or not].
        let availableHeightAboveActiveRow = Math.max(0, (rowTop - table.top - headerRow.height)), // check value when not snapped
            availableHeightBelowActiveRow = (table.bottom - rowBottom),
            cardProjection = (cardHeight - row.height) / 2,
            windowAvailability = window.innerWidth < 1280 ? window.innerHeight : window.innerHeight - headerRowBottom,
            windowScroll = window.innerWidth < 1280 ? windowScrollY : headerRow.top === 0 ? windowScrollY + headerRow.top : windowScrollY + headerRow.top - 24; // <mat-table> margin top included if table not snapped

        // Card positioning.
        // Car to be centered over active row.
        // If this is not possible then the card will be top aligned with first table row, or bottom aligned with last table row.
        this.cardTopStyle = availableHeightAboveActiveRow < cardProjection ? -availableHeightAboveActiveRow + "px" : availableHeightBelowActiveRow < cardProjection ? "unset" : "50%";
        this.cardBottomStyle = availableHeightBelowActiveRow < cardProjection ? -availableHeightBelowActiveRow + "px" : "unset";
        this.cardTransformStyle = cardProjection <= availableHeightAboveActiveRow && cardProjection <= availableHeightBelowActiveRow ? "translate(-50%, -50%)" : "translateX(-50%)";

        // Get card top and bottom position - based on the rules above.
        let cardBottomPosition = availableHeightBelowActiveRow < cardProjection ? rowBottom + availableHeightBelowActiveRow : availableHeightAboveActiveRow < cardProjection ? rowTop - availableHeightAboveActiveRow + cardHeight : rowBottom + cardProjection;
        let cardTopPosition = availableHeightAboveActiveRow < cardProjection ? rowTop - availableHeightAboveActiveRow : availableHeightBelowActiveRow < cardProjection ? rowBottom + availableHeightBelowActiveRow - cardHeight : rowTop - cardProjection;

        // Card position related to window.
        // This will assist with scroll, if required.
        let cardHiddenByBottom = cardBottomPosition - window.innerHeight;
        let cardHiddenByTop = window.innerWidth >= 1280 ? cardTopPosition - headerRowBottom : cardTopPosition;

        // Scroll if card is partially hidden by window view or by table header row when table is snapped.
        // If window size is sufficient to display whole card, then the screen should scroll to always show the full card.
        // The position of the active row will dictate screen scrolling.
        // Scroll to either:
        // top align card with mat-header-row,
        // or, bottom align card with the bottom of the table,
        // or, if card does not require scrolling to fully display card then screen should not scroll.
        if ( cardHiddenByTop <= 0 || (cardHeight > windowAvailability) ) {

            let scrollBy = rowTop <= 0 && window.innerWidth >= 1280 ? cardTopPosition : cardHiddenByTop;
            window.scrollTo({left: 0, top: windowScroll + scrollBy, behavior: "smooth"});
        }
        else if ( cardHiddenByBottom > 0 ) {

            window.scrollTo({left: 0, top: windowScroll + cardHiddenByBottom, behavior: "smooth"});
        }
        else {

            return; // do nothing
        }
    }

    /**
     * Return the URL to the meta TSV for the specified project.
     * @param {string} projectId
     * @returns {string}
     */
    public onDownloadMetadata(projectId: string): string {

        const metaURL = this.configService.getProjectMetaURL();
        return `${metaURL}/projects/${this.projectId}.tsv`;
    }

    /**
     * Closes get project data by matrix.
     */
    public onGetProjectDataMatrixClose() {

        this.onProjectDataMatrixClose.emit(false);
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up initial position of component.
     */
    ngAfterViewInit() {

        this.getPositionProjectMatrixDataCard();
    }
}
