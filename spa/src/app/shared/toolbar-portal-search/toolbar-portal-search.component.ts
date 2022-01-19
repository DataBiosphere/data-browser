/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying hca portal search.
 */

// Dependencies
import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
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
     * @param {Window} window
     */
    constructor(private configService: ConfigService, @Inject("Window") private window: Window) {
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
     * On clearing the search input value, the search remains open and active and the input element regains focus.
     */
    public onClearPortalSearch(): void {
        this.searchOpen = true;
        this.inputActive = true;
        this.portalSearch.setValue("");
        this.searchEl.nativeElement.focus();
    }
    
    /**
     * The search is closed and inactive when the input blurs from an event external to the form.
     * i.e. clicking action outside of portal search bar.
     */
    public onInputBlurEvent(event: FocusEvent): void {
        if ( event.relatedTarget === null ) {
            this.inputActive = false;
            this.searchOpen = false;
        }
    }
    
    /**
     * The search is open and active when the input focuses.
     */
    public onInputFocusEvent(): void {
        this.inputActive = true;
    }
    
    /**
     * Navigates to Data Portal search page.
     * @param searchTerms
     */
    public onSearchPortal(searchTerms: string): void {
        if ( searchTerms ) {
            const params = new URLSearchParams();
            params.set("q", searchTerms);
            this.window.location.href = `${this.portalURL}/search?${params.toString()}`;
        }
    }
    
    /**
     * Opens search bar and focuses input element.
     */
    public onOpenSearch(): void {
        this.searchOpen = true;
        setTimeout(() => { // TODO(cc) execute focus after search is open
            this.searchEl.nativeElement.focus();
        }, 0);
    }
}
