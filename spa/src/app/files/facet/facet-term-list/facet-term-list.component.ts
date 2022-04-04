/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Displays list of facet terms, including checkbox indicating if term is currently selected, as well as corresponding
 * count. Emits "facetTermSelected" event on click of term.
 */

// Core dependencies
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    QueryList,
    Output,
    Renderer2,
    ViewChildren,
} from "@angular/core";

// App dependencies
import { FacetTermSelectedEvent } from "../file-facet/facet-term-selected.event";
import { CountSizePipe } from "../../../pipe/count-size/count-size.pipe";
import { LocaleStringPipe } from "../../../pipe/locale-string/locale-string.pipe";
import { Term } from "../../shared/term.model";

@Component({
    selector: "facet-term-list",
    templateUrl: "facet-term-list.component.html",
    styleUrls: ["facet-term-list.component.scss"],
})
export class FacetTermListComponent implements AfterViewInit {
    // Inputs
    @Input() fileFacetName: string;
    @Input() terms: Term[];
    @Input() useShortList: boolean;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FacetTermSelectedEvent>();

    // View child/ren
    @ViewChildren("facetTerm") termElRefs: QueryList<ElementRef>;

    /**
     * @param {ElementRef} el
     */
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    /**
     * Return the inline style configuration for the chart legend, for the specified term.
     *
     * @param term {Term}
     * @returns {any}
     */
    getLegendStyle(term: Term): any {
        // If term is selected, set the background color as well
        if (term.selected) {
            let style = {
                "border-color": "#1F6B9A",
                "background-color": "#1C7CC7",
            };

            return style;
        }
    }

    /**
     * Returns class truncate if displayValue is not spaced
     * @param termName
     * @returns {string}
     */
    public getTruncatedClass(termName) {
        if (termName.indexOf(" ") == -1) {
            return "truncate";
        }
    }

    /**
     * Returns true if the term count value is not formatted by CountSizePipe.
     * Value will be less than 1,000 if true.
     * @param {number} termCount
     * @returns {boolean}
     */
    public isDisabled(termCount: number): boolean {
        return (
            new CountSizePipe().transform(termCount) ===
            new LocaleStringPipe().transform(termCount)
        );
    }

    /**
     * Handle click on individual facet term or entity - emit event to parent.
     *
     * @param {string} fileFacetName
     * @param {Term} term
     */
    public onClickFacetTerm(fileFacetName: string, term: Term): void {
        // Update facet state
        this.facetTermSelected.emit(
            new FacetTermSelectedEvent(fileFacetName, term.name, !term.selected)
        );
    }

    /**
     * Track by function used when displaying the list of terms or entities.
     *
     * @param {number} index
     * @param {Term} term
     * @returns {string}
     */
    public trackByFn(index: number, term: Term): string {
        return term.name;
    }

    /**
     * Calculate the heights of each term list, "cutting" the last visible term in any list that extend beyond the
     * bottom of the menu, to indicate more.
     */
    ngAfterViewInit() {
        // Grab the list element and its parent container
        const listEl = this.el.nativeElement;
        const parentEl = listEl.parentElement;
        const listOffset = listEl.offsetTop - parentEl.offsetTop;

        // Determine the heights of the list element and the list's parent
        const nativeElHeight = listEl.getBoundingClientRect().height;
        const parentElHeight = parentEl.getBoundingClientRect().height;

        // We don't need to proceed if the list fits into its parent container
        if (nativeElHeight + listOffset <= parentElHeight) {
            return;
        }

        // Calculate the new height of the list parent, depending on how many terms are visible
        let updatedParentHeight = 0;
        let heightTally = listOffset;
        let previousHeightTally = heightTally;
        let lastVisibleTermElRef: ElementRef;
        for (let termElRef of this.termElRefs.toArray()) {
            // Determine the height of the terms up to and including this term
            const termHeight =
                termElRef.nativeElement.getBoundingClientRect().height;
            const heightIncludingTerm = heightTally + termHeight;

            // Move on to the next term if this term is fully visible, updating total height of terms up to and including
            // this term and keeping a record of the previous tally (in case we need to cut the previous term)
            if (heightIncludingTerm < parentElHeight) {
                previousHeightTally = heightTally;
                heightTally = heightIncludingTerm;
                lastVisibleTermElRef = termElRef;
            }
            // Otherwise we have found the first term that is not fully visible. Determine if we should cut this
            // term's or the previous term's visibility, to indicate there are more terms
            else {
                const visibleSpace = parentElHeight - heightTally;
                const percentVisible = visibleSpace / termHeight;

                // If less than half of the term is visible, roll back the height to cut the last fully visible term
                if (percentVisible < 0.5 && lastVisibleTermElRef) {
                    updatedParentHeight =
                        previousHeightTally +
                        this.calculateCheckBoxCutOffHeight(
                            lastVisibleTermElRef.nativeElement
                        );
                }
                // Otherwise more than half the current term is visible, cut current term height back to 50%
                else {
                    updatedParentHeight =
                        heightTally +
                        this.calculateCheckBoxCutOffHeight(
                            termElRef.nativeElement
                        );
                }

                break;
            }
        }

        // Update parent to new height total
        this.renderer.setStyle(parentEl, "height", `${updatedParentHeight}px`);
    }

    /**
     * Return the height of where to cut off the checkbox element, that is a child of the specified term list item.
     *
     * @param {HTMLElement} termEl
     * @returns {number}
     */
    private calculateCheckBoxCutOffHeight(termEl: HTMLElement): number {
        // Find the term's checkbox
        const checkboxes = termEl.getElementsByClassName("chart-legend-bar");
        if (!checkboxes.length) {
            return 0;
        }

        // Add the offset of the checkbox to half the checkbox height; we only want to show half of the checkbox
        const checkbox = checkboxes[0] as HTMLElement;
        const height =
            checkbox.offsetTop -
            termEl.offsetTop +
            Math.floor(checkbox.getBoundingClientRect().height / 2);
        return height;
    }
}
