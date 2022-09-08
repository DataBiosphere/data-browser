/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying portal search.
 */

// Dependencies
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ConfigService } from "../../../config/config.service";

@Component({
    selector: "portal-search",
    templateUrl: "portal-search.component.html",
    styleUrls: ["portal-search.component.scss"],
})
export class PortalSearchComponent implements AfterViewInit {
    // Template variables
    public portalSearch: FormControl = new FormControl();
    public portalURL: string;

    // Inputs
    @Input() searchOpen: boolean;
    @Output() searchClosed = new EventEmitter<void>();

    // Locals
    public portalSearchGroup: FormGroup;

    @ViewChild("search") searchEl: ElementRef;

    /**
     * @param configService
     * @param {Window} window
     */
    constructor(
        private configService: ConfigService,
        @Inject("Window") private window: Window
    ) {
        this.portalURL = this.configService.getPortalUrl();

        this.portalSearchGroup = new FormGroup({
            portalSearch: this.portalSearch,
        });
    }

    /**
     * On clearing the search input value, the search remains open and active and the input element regains focus.
     */
    public onClearPortalSearch(): void {
        this.portalSearch.setValue("");
        this.searchEl.nativeElement.focus();
    }

    /**
     * Closes portal search.
     */
    public onClosePortalSearch(): void {
        this.searchClosed.emit();
    }

    /**
     * Navigates to Data Portal search page.
     * @param searchTerms
     */
    public onSearchPortal(searchTerms: string): void {
        if (searchTerms) {
            const params = new URLSearchParams();
            params.set("q", searchTerms);
            this.window.location.href = `${
                this.portalURL
            }/search?${params.toString()}`;
        }
    }

    /**
     * Focuses search input.
     */
    public ngAfterViewInit() {
        this.searchEl.nativeElement.focus();
    }
}
