/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project matrix data.
 */

// Core dependencies
import {
    AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input,
    Output
} from "@angular/core";
import { ConfigService } from "../../config/config.service";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

@Component({
    selector: "hca-get-project-matrix-data",
    templateUrl: "./hca-get-project-matrix-data.component.html",
    styleUrls: ["./hca-get-project-matrix-data.component.scss"]
})
export class HCAGetProjectMatrixDataComponent implements AfterViewInit, AfterViewChecked {

    // Inputs
    @Input() matrixAvailable: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Outputs
    @Output() projectDataMatrixClose = new EventEmitter<boolean>();
    @Output() projectDataMatrixPosition = new EventEmitter<string>();
    @Output() projectDataMatrixPositionBelowTable = new EventEmitter<number>();

    // Template variables
    public cardOpen = false;
    public cardProjection: number;

    /**
     * @param {ConfigService} configService
     * @param {ElementRef} elementRef
     */
    public constructor(private configService: ConfigService, private elementRef: ElementRef) {}

    /**
     * Public API
     */

    /**
     * Click event to close card.
     * Listens for a click event outside of the card.
     *
     * @param target
     */
    @HostListener("document:click", ["$event.target"])
    public onClick(target) {

        const clickedInside = this.elementRef.nativeElement.contains(target);

        // If the <hca-get-project-matrix-data> card is open and
        // the click event was outside the card, then close the card.
        if ( !clickedInside && this.cardOpen ) {
            this.cardOpen = false;
            this.onGetProjectDataMatrixClose();
        }
        // The card is closed
        else {
            this.cardOpen = true;
        }
    }

    /**
     * Determines whether card perimeter renders below the table.
     * If true, the px value of the projection is passed back to the parent to allocate a sufficient bottom margin to the table.
     * This assists with preventing a scroll action within the table itself - and maintains scroll on the body.
     */
    public getCardPositionBelowTable() {

        // Get elements.
        const nativeElement = this.elementRef.nativeElement,
            cardBottom = nativeElement.getBoundingClientRect().bottom,
            tableBottom = nativeElement.closest("mat-table").parentElement.getBoundingClientRect().bottom,
            cardPositionRelativeToTable = cardBottom - tableBottom;

        // Ascertain if card projects below table, or if the value of projection has changed.
        if ( cardPositionRelativeToTable > 0 && this.cardProjection !== cardPositionRelativeToTable ) {

            this.cardProjection = cardPositionRelativeToTable;
            this.projectDataMatrixPositionBelowTable.emit(this.cardProjection);
        }
        else {
            return; // do nothing
        }
    }

    /**
     * Determines of the position of the project matrix data card relative to the active row.
     */
    public getPositionProjectMatrixDataCard() {

        // Get elements.
        const nativeElement = this.elementRef.nativeElement;
        let card = nativeElement.firstElementChild.getBoundingClientRect(),
            table = nativeElement.closest("mat-table").getBoundingClientRect(),
            row = nativeElement.closest("mat-row").getBoundingClientRect(),
            headerRow = nativeElement.closest("mat-table").firstElementChild.getBoundingClientRect();

        // Calculate available heights for: window, vertical px above and below active row in relation to header row and table bottom, scroll position [includes table snapped/or not].
        let availableHeightAboveActiveRow = Math.max(0, (row.top - table.top - headerRow.height)); // check value when not snapped

        // Card positioning.
        // Default position is above active row, unless there is insufficent space and then it will be positioned below the active row.
        let projectDataMatrixTopPosition = availableHeightAboveActiveRow > card.height ? -card.height + "px" : "100%";
        this.projectDataMatrixPosition.emit(projectDataMatrixTopPosition);
    }

    /**
     * Return the URL to the meta TSV for the specified project.
     *
     * @returns {string}
     */
    public onDownloadMetadata(): string {

        const metaURL = this.configService.getProjectMetaURL();
        return `${metaURL}/projects/${this.projectId}.tsv`;
    }

    /**
     * Closes get project data by matrix.
     */
    public onGetProjectDataMatrixClose() {
        this.projectDataMatrixClose.emit(false);
        this.projectDataMatrixPositionBelowTable.emit(0);
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

    ngAfterViewChecked() {

        this.getCardPositionBelowTable();
    }
}
