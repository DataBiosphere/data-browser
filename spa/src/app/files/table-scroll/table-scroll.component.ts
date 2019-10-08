/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for handling scroll of data tables.
 */

// Core dependencies
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component, ContentChild,
    ElementRef, Inject,
    Input,
    OnDestroy,
    Renderer2
} from "@angular/core";
import { MatTable } from "@angular/material";
import { fromEvent, merge, Observable, Subject } from "rxjs";
import { debounceTime, map, switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { TableRendererService } from "../table/table-renderer.service";
import { ResponsiveService } from "../../shared/responsive/responsive.service";

@Component({
    selector: "table-scroll",
    templateUrl: "./table-scroll.component.html",
    styleUrls: ["./table-scroll.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableScroll implements OnDestroy, AfterContentInit {

    // Locals
    private ngDestroy$ = new Subject();

    // Content children
    @ContentChild(MatTable, {read: ElementRef, static: false}) matTable: ElementRef;

    // Inputs
    @Input("dataLoaded") dataLoaded$: Observable<boolean>;

    /**
     * @param {ResponsiveService} responsiveService
     * @param {TableRendererService} tableRendererService
     * @param {ElementRef} elementRef
     * @param {Renderer2} renderer
     * @param {Window} window
     */
    constructor(
        private responsiveService: ResponsiveService,
        private tableRendererService: TableRendererService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        @Inject("Window") private window: Window) {
    }

    /**
     * After the table data has been loaded, or window has been resized, explicitly set width on table to ensure correct
     * sizing with respect to its container.
     * 
     */
    private addResizeEventListener() {

        const loaded$ = this.dataLoaded$.pipe(
            take(1),
            switchMap(() => this.tableRendererService.onRenderCompleted())
        );

        const resize$ = fromEvent(this.window, "resize").pipe(
            debounceTime(250),
            map(() => true)
        );

        merge(loaded$, resize$).pipe(
            takeUntil(this.ngDestroy$)
        ).subscribe(() => {

            const tableEl = this.matTable.nativeElement;
            const tableWidth = tableEl.scrollWidth;

            const el = this.elementRef.nativeElement;
            const containerWidth = el.offsetWidth;
            if ( tableWidth < containerWidth ) {
                this.renderer.setStyle(tableEl, "width", `${containerWidth}px`);
            }
            else {
                this.renderer.setStyle(tableEl, "width", `${tableWidth}px`);
            }
        });
    }

    /**
     * After the table data has been loaded, calculate the width of the table and explicitly add it to the table element
     * (to ensure rendering of row delimiters is correct). Once table width has been calculated, update component host
     * class to indicate loading is complete and overflow can now be added.
     */
    ngAfterContentInit() {

        this.addResizeEventListener();
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
}
