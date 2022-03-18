/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Hamburger-related effects.
 */

// Core dependencies
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, switchMap, take, tap } from "rxjs/operators";

// App dependencies
import { CloseHamburgerAction } from "./close-hamburger.action";
import { selectHamburgerOpen } from "./hamburger.selectors";
import { HamburgerState } from "./hamburger.state";
import { ToggleHamburgerAction } from "./toggle-hamburger.action";

@Injectable()
export class HamburgerEffects {
    
    private renderer: Renderer2;

    /**
     * @param {Actions} actions$
     * @param {RendererFactory2} rendererFactory
     * @param {Router} router
     * @param {Store<HamburgerState>} store
     * @param {Document} document
     */
    constructor(private actions$: Actions,
                rendererFactory: RendererFactory2,
                private router: Router,
                private store: Store<HamburgerState>,
                @Inject(DOCUMENT) private document: Document) {

        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * Trigger close of hamburger on navigation end, if currently open.
     */
    
    closeHamburgerOnNavigation$: Observable<Action> = createEffect(() => this.router.events.pipe(
        filter(evt => evt instanceof NavigationEnd),
        switchMap(() => this.store.pipe(select(selectHamburgerOpen), take(1))),
        filter(open => open),
        map(() => {
            return new CloseHamburgerAction();
        })
    ));

    /**
     * Handle toggle, or close, of hamburger.
     */
    
    toggleHamburger$ = createEffect(() => this.actions$.pipe(
        ofType(CloseHamburgerAction.ACTION_TYPE, ToggleHamburgerAction.ACTION_TYPE),
        switchMap(() => this.store.pipe(select(selectHamburgerOpen), take(1))),
        tap((hamburgerOpen) => {
            
            // Scroll function - disabled scroll when hamburger is opened.
            const scrollFn = (event) => {
                event.preventDefault()
            };

            const bodyEl = this.document.body;
            if ( hamburgerOpen ) {
                this.renderer.addClass(bodyEl, "no-scroll");
                this.renderer.addClass(bodyEl, "hamburger-open");
                bodyEl.addEventListener("touchmove", scrollFn);
            }
            else {
                this.renderer.removeClass(bodyEl, "no-scroll");
                this.renderer.removeClass(bodyEl, "hamburger-open");
                bodyEl.removeEventListener("touchmove", scrollFn);
            }
        })
    ), {dispatch: false});
}
