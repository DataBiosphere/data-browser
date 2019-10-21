/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project matrix data.
 */

// Core dependencies
import {
    AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild
} from "@angular/core";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { CopyToClipboardComponent } from "../hca-get-data/copy-to-clipboard/copy-to-clipboard.component";

@Component({
    selector: "project-prepared-matrix-downloads",
    templateUrl: "./project-prepared-matrix-downloads.component.html",
    styleUrls: ["./project-prepared-matrix-downloads.component.scss"]
})
export class ProjectPreparedMatrixDownloadsComponent implements AfterViewInit, AfterViewChecked, OnInit {

    // Inputs
    @Input() matrixAvailable: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Outputs
    @Output() preparedMatrixDownloadsOpened = new EventEmitter<boolean>();
    @Output() preparedMatrixDownloadsTop = new EventEmitter<string>(); // CC position top value
    @Output() preparedMatrixDownloadsPositionBelowTable = new EventEmitter<number>();

    // Template variables
    private cardProjection: number;

    /**
     * @param {ElementRef} elementRef
     */
    public constructor(private elementRef: ElementRef) {
    }

    /**
     * Public API
     */

    /**
     * Add click handler to determine if we should close card.
     *
     */
    @HostListener("document:click")
    public onDocumentClick() {

        // If the click event is outside the card, then close the card.
        // Any click event inside the card will trigger method OnClickInsideCard, and card will not close.
        // Exception to this is the calling of method onPreparedMatrixDownloadsOpened when close icon is clicked.
        this.onPreparedMatrixDownloadsOpened(false);
    }

    /**
     * Prevents event propagation when mouse event is inside card.
     * Excludes calling of method onPreparedMatrixDownloadsOpened when close icon is clicked.
     *
     * @param {MouseEvent} event
     */
    public onClickInsideCard(event: MouseEvent) {

        // Prevent any click event inside card from propagation.
        event.stopPropagation();
    }

    /**
     * Let parents know download component has either been opened or closed.
     *
     * @param {boolean} opened
     */
    public onPreparedMatrixDownloadsOpened(opened: boolean) {

        this.preparedMatrixDownloadsOpened.emit(opened);

        if ( !opened ) {
            this.preparedMatrixDownloadsPositionBelowTable.emit(0);
        }
    }

    /**
     * Determines whether card perimeter renders below the table.
     * If true, the px value of the projection is passed back to the parent to allocate a sufficient bottom margin to the table.
     * This assists with preventing a scroll action within the table itself - and maintains scroll on the body.
     */
    private getCardPositionBelowTable() {

        // Get elements.
        const nativeElement = this.elementRef.nativeElement,
            cardBottom = nativeElement.getBoundingClientRect().bottom,
            tableBottom = nativeElement.closest("mat-table").parentElement.getBoundingClientRect().bottom,
            cardPositionRelativeToTable = cardBottom - tableBottom;

        // Ascertain if card projects below table, or if the value of projection has changed.
        if ( cardPositionRelativeToTable > 0 && this.cardProjection !== cardPositionRelativeToTable ) {

            this.cardProjection = cardPositionRelativeToTable;
            this.preparedMatrixDownloadsPositionBelowTable.emit(this.cardProjection);
        }
        else {
            return; // do nothing
        }
    }

    /**
     * Determines of the position of the project matrix data card relative to the active row.
     */
    private getPositionProjectMatrixDataCard() {

        // Get elements.
        const nativeElement = this.elementRef.nativeElement;
        const card = nativeElement.firstElementChild.getBoundingClientRect(),
            table = nativeElement.closest("mat-table").getBoundingClientRect(),
            row = nativeElement.closest("mat-row").getBoundingClientRect(),
            headerRow = nativeElement.closest("mat-table").firstElementChild.getBoundingClientRect();

        // Calculate available heights for: window, vertical px above and below active row in relation to header row and table bottom, scroll position [includes table snapped/or not].
        const availableHeightAboveActiveRow = Math.max(0, (row.top - table.top - headerRow.height)); // check value when not snapped

        // Card positioning. Default position is above active row, unless there is insufficient space and then it will
        // be positioned below the active row. For position above, scoot card up by the total card height. For position
        // below, use "100%" of row height to place it below row.
        const projectDataMatrixTopPosition = availableHeightAboveActiveRow > card.height ? `-${card.height}px` : "100%";
        this.preparedMatrixDownloadsTop.emit(projectDataMatrixTopPosition);
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

    /**
     *
     */
    ngAfterViewChecked() {

        this.getCardPositionBelowTable();
    }

    /**
     * Let parents know downloads are now open.
     */
    ngOnInit() {

        this.onPreparedMatrixDownloadsOpened(true);
    }
}
