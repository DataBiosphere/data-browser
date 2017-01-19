// Dependencies
import { Directive, ElementRef, Inject, OnInit } from "@angular/core";

/**
 * Directive for toggling full screen, main nav.
 */

@Directive({
    selector: "[cc-hamburger]"
})

export class CCHamburgerDirective implements OnInit {

    // Locals
    private elementRef: ElementRef;
    private bodyEl: HTMLElement;

    // Constants
    private CSS_NAVBAR_OPEN = "toolbar-menu-open";
    private MENU_CLOSE_TOGGLE = "[menu-close]";

    /**
     * Grab reference to underlying element, as well as window - required for adding/removing CSS classes to indicate
     * open/closed state of full screen nav.
     *
     * @param elementRef {ElementRef}
     * @param window {Window}
     */
    constructor(elementRef: ElementRef, @Inject("Window") window: Window) {

        this.elementRef = elementRef;
        this.bodyEl = window.document.body;
    }

    /**
     * PRIVATES
     */

    /**
     * Prevent scroll when menu is open. Touch devices only - non-touch devices use overflow CSS property to
     * control scroll.
     *
     * @param bodyEl {Element}
     */
    disableScroll(bodyEl): void {

        bodyEl.addEventListener("touchmove", this.scrollFn);
    }

    /**
     * Enable click handler to close menu on click of menu item.
     *
     * @param bodyEl {HTMLElement}
     */
    enableClickToClose(bodyEl: HTMLElement): void {

        var menuCloseEl = bodyEl.querySelectorAll(this.MENU_CLOSE_TOGGLE)[0];
        if ( !menuCloseEl ) {
            return;
        }

        // Set up click event on hamburger toggle
        let that = this;
        menuCloseEl.addEventListener("click", (event: Event) => {
            that.onClickMenuClose(event);
        });
    }

    /**
     * Enable scroll when menu is closed.
     *
     * @param bodyEl {HTMLElement}
     */
    enableScroll(bodyEl: HTMLElement): void {

        bodyEl.removeEventListener("touchmove", this.scrollFn);
    }

    /**
     * Hide menu by removing the CSS class from the body, that indicates the menu is currently open.
     *
     * @param bodyEl {HTMLElement}
     */
    hideMenu(bodyEl: HTMLElement): void {

        // Toggle visibility of menu
        bodyEl.classList.remove(this.CSS_NAVBAR_OPEN);
    }

    /**
     * Add/remove class on body to toggle visibility of nav menu on mobile.
     *
     * Also prevent scroll if menu is open. This is specifically for touch devices where overflow: hidden on body
     * is not obeyed. https://worldvectorlogo.com/logos/obey.svg
     */
    initHamburger(): void {

        // Set up click event on hamburger toggle
        let that = this;
        this.elementRef.nativeElement.addEventListener("click", (event: Event) => {
            that.onClickMenuOpen(event);
        });
    }

    /**
     * Click handler, registered on hamburger element
     *
     * @param event {Event}
     */
    onClickMenuOpen(event: Event): void {

        // Mind you own business!
        event.preventDefault();

        // Open menu
        this.showMenu(this.bodyEl);

        // Disable scroll
        this.disableScroll(this.bodyEl);
    }


    /**
     * Click handler, registered on menu close element.
     *
     * @param event {Event}
     */
    onClickMenuClose(event: Event): void {

        // Mind you own business!
        event.preventDefault();

        // Close menu
        this.hideMenu(this.bodyEl);

        // Enable scroll
        this.enableScroll(this.bodyEl);
    }

    /**
     * Scroll (touchmove) event handler function - needs to be individual function so we can bind and unbind
     * depending on open/closed state of menu.
     *
     * @param event {Event}
     */
    scrollFn(event: Event): void {

        event.preventDefault();
    }

    /**
     * Show menu by adding class to body element, indicating menu is open.
     *
     * @param bodyEl {HTMLElement}
     */
    showMenu(bodyEl: HTMLElement): void {

        // Toggle visibility of menu
        bodyEl.classList.add(this.CSS_NAVBAR_OPEN);

        // Enable click to close menu
        this.enableClickToClose(bodyEl);
    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up click even on hamburger.
     */
    ngOnInit(): void {

        this.initHamburger();
    }
}
