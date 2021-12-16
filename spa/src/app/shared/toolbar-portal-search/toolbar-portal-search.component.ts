/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying hca portal search.
 */

// Dependencies
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "toolbar-portal-search",
    templateUrl: "toolbar-portal-search.component.html",
    styleUrls: ["toolbar-portal-search.component.scss"],
})

export class ToolbarPortalSearchComponent {
    
    // Template variables
    public inputActive = false;
    public portalSearch: FormControl = new FormControl();
    public portalURL: string;
    public searchOpen = false;
    
    // Locals
    public portalSearchGroup: FormGroup;
    
    @ViewChild("search") searchEl: ElementRef;
    
    /**
     * @param configService
     */
    constructor(private configService: ConfigService) {
        this.portalURL = this.configService.getPortalUrl();
        
        this.portalSearchGroup = new FormGroup({
            portalSearch: this.portalSearch
        });
    }
    
    /**
     * Returns true if input is "active" and search terms are not empty.
     * @param searchTerms
     */
    public isClearButtonVisible(searchTerms: string): boolean {
        return this.inputActive && !!searchTerms;
    }
    
    /**
     * On focus event (focus), the input element is "active".
     * On focus event (blur), if the clear button was clicked:
     * - the input value is cleared, and
     * - the input element will remain "active".
     * Otherwise, the blur event will proceed as expected and the input will become "inactive".
     * @param event
     */
    public onInputFocusEvent(event: FocusEvent): void {
        if ( event.type === "focus" ) {
            /* Search is open, input is active. */
            this.inputActive = true;
        } else if ( !!event.relatedTarget ) {
            /* Search is open, input value is cleared, and refocuses. */
            this.searchOpen = true;
            this.inputActive = true;
            this.portalSearch.setValue("");
            this.searchEl.nativeElement.focus();
        } else {
            /* Search is closed, input is inactive. */
            this.inputActive = false;
            this.searchOpen = false;
        }
    }
    
    /**
     * Navigates to Data Portal search page.
     * @param searchTerms
     */
    public onSearchPortal(searchTerms: string): void {
        if ( searchTerms ) {
            const params = new URLSearchParams();
            params.set("q", searchTerms);
            window.location.href = `${this.portalURL}/search?${params.toString()}`;
        }
    }
    
    /**
     * Opens search bar and focuses input element.
     */
    public onOpenSearch(): void {
        this.searchOpen = true;
        setTimeout(()=>{ // TODO(cc) execute focus after search is open
            this.searchEl.nativeElement.focus();
        },0);
    }
}
