/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project matrix data.
 */

// Core dependencies
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
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
    @Input() matrixAvailable: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Output
    @Output() onProjectDataMatrixClose = new EventEmitter<boolean>();
    @Output() onProjectDataMatrixPosition = new EventEmitter<string>();

    /**
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService, private elementRef: ElementRef) {
    }

    /**
     * Public API
     */

    /**
     * Determines of the position of the project matrix data card relative to the active row.
     * Scrolls window, if required, to position the card.
     */
    public getPositionProjectMatrixDataCard() {

        // Get elements.
        const nativeElement = this.elementRef.nativeElement;
        let card = nativeElement.firstElementChild.getBoundingClientRect(),
            table = nativeElement.closest("mat-table").getBoundingClientRect(),
            row = nativeElement.closest("mat-row").getBoundingClientRect(),
            headerRow = nativeElement.closest("mat-table").firstElementChild.getBoundingClientRect();

        // Get element co-ordinates, window scroll position.
        // let cardHeight = card.height;
        // let rowTop = row.top;
        // let headerRowBottom = headerRow.bottom,
        // rowBottom = row.bottom,
        // windowScrollY = window.pageYOffset;

        // Calculate available heights for: window, vertical px above and below active row in relation to header row and table bottom, scroll position [includes table snapped/or not].
        let availableHeightAboveActiveRow = Math.max(0, (row.top - table.top - headerRow.height)); // check value when not snapped
        // availableHeightBelowActiveRow = (table.bottom - rowBottom),
        // windowAvailability = window.innerWidth < 1280 ? window.innerHeight : window.innerHeight - headerRowBottom,
        // windowScroll = window.innerWidth < 1280 ? windowScrollY : headerRow.top === 0 ? windowScrollY + headerRow.top : windowScrollY + headerRow.top - 24;
        // <mat-table> margin top included if table not snapped

        // Card positioning.
        // Default position is above active row, unless there is insufficent space and then it will be positioned below the active row.
        let projectDataMatrixTopPosition = availableHeightAboveActiveRow > card.height ? -card.height + "px" : "100%";
        this.onProjectDataMatrixPosition.emit(projectDataMatrixTopPosition);

        // Get viewing extents of the card and its active row.
        // let bottomViewingExtent = card.bottom > rowBottom ? card.bottom : rowBottom;
        // let topViewingExtent = card.top < rowTop ? card.top : rowTop;

        // Card position related to window.
        // This will assist with scroll, if required.
        // let hiddenByBottom = window.innerHeight - bottomViewingExtent;
        // let hiddenByTop = window.innerWidth >= 1280 ? topViewingExtent - headerRowBottom : topViewingExtent;

        // Scroll if card is partially hidden by window view or by table header row when table is snapped.
        // If window size is sufficient to display whole card, then the screen should scroll to always show the full card.
        // The position of the active row will dictate screen scrolling.
        // Scroll to either:
        // top align card with mat-header-row,
        // or, bottom align card with the bottom of the table,
        // or, if card does not require scrolling to fully display card then screen should not scroll.
        // if ( hiddenByTop <= 0 || (cardHeight > windowAvailability) ) {
        //
        //     let scrollBy = rowTop <= 0 && window.innerWidth >= 1280 ? topViewingExtent : hiddenByTop;
        //     window.scrollTo({left: 0, top: windowScroll + scrollBy, behavior: "smooth"});
        // }
        // else if ( hiddenByBottom < 0 ) {
        //
        //     window.scrollTo({left: 0, top: windowScroll - hiddenByBottom, behavior: "smooth"});
        // }
        // else {
        //
        //     return; // do nothing
        // }
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
