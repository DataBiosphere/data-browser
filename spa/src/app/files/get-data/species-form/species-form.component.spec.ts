/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing species selection component.
 */

// Core dependencies
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Store } from "@ngrx/store";

// App components
import { GetDataPanelComponent } from "../get-data-panel/get-data-panel.component";
import { SpeciesFormComponent } from "./species-form.component";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { selectFilesFacets } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { Term } from "../../shared/term.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { selectSystemStatusIndexing } from "../../../system/_ngrx/system.selectors";
import { DownloadButtonComponent } from "../../../shared/download-button/download-button.component";

describe("SpeciesSelectionComponent", () => {

    let component: SpeciesFormComponent;
    let fixture: ComponentFixture<SpeciesFormComponent>;
    let store: MockStore;
    
    const SELECTOR_BUTTON = "button";
    const SELECTOR_CHECKBOX_SELECTED = "mat-icon";
    const SELECTOR_CHECKBOX_GROUP = ".hca-checkbox-group";
    const SELECTOR_CHECKBOX_LABEL = ".hca-checkbox-label";

    const FACET_SINGLE_SPECIES_HUMAN = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.HOMO_SAPIENS, 100, false)
    ]);
    const FACET_MULTIPLE_SPECIES = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.HOMO_SAPIENS, 100, false),
        new Term(GenusSpecies.MUS_MUSCULUS, 100, false)
    ]);
    const FACET_MULTIPLE_SPECIES_HUMAN_SELECTED = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.HOMO_SAPIENS, 100, true),
        new Term(GenusSpecies.MUS_MUSCULUS, 100, false)
    ]);

    const testSearchTermHttpService =
        jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"]);
    testSearchTermHttpService.marshallSearchTerms.and.returnValue("");

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                DownloadButtonComponent,
                GetDataPanelComponent,
                SpeciesFormComponent
            ],
            imports: [
                MatIconModule
            ],
            providers: [
                {
                    provide: SearchTermHttpService,
                    useValue: testSearchTermHttpService
                },
                provideMockStore({
                    initialState: {}
                })
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SpeciesFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as MockStore;

        store.overrideSelector(selectSystemStatusIndexing, false);
    }));

    // Reset selectors after each test
    afterEach(() => {
        store?.resetSelectors();
    });

    /**
     * Species checkboxes are build if there is one species.
     */
    it("builds checkbox options if there is one species", () => {

        store.overrideSelector(selectFilesFacets, [FACET_SINGLE_SPECIES_HUMAN]);

        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();

        fixture.detectChanges();

        expect(component["buildSpeciesCheckboxOptions"]).toHaveBeenCalled();
    });

    /**
     * Species checkboxes are built if there is more than one species.
     */
    it("builds checkbox options if there is more than one species", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);

        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();

        fixture.detectChanges();

        expect(component["buildSpeciesCheckboxOptions"]).toHaveBeenCalled();
    });

    /**
     * Selects checkbox by default if there is only one species.
     */
    it("selects checkbox for single species", () => {

        const options = component["buildSpeciesCheckboxOptions"](FACET_SINGLE_SPECIES_HUMAN.terms);
        expect(options.length).toEqual(FACET_SINGLE_SPECIES_HUMAN.terms.length);
        expect(options[0].selected).toBeTrue();
    });

    /**
     * Checkbox option is created for each species.
     */
    it("correctly builds a checkbox option for each species", () => {

        const options = component["buildSpeciesCheckboxOptions"](FACET_MULTIPLE_SPECIES.terms);
        expect(options.length).toEqual(FACET_MULTIPLE_SPECIES.terms.length);
        options.forEach((option, i) => {

            expect(option.label).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
            expect(option.value).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
            expect(option.selected).toEqual(FACET_MULTIPLE_SPECIES.terms[i].selected);
        })
    });

    /**
     * Species checkboxes are displayed for each species
     */
    it("displays a checkbox option for each species", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        fixture.detectChanges();

        const checkboxGroupEls = findCheckboxGroupEls();
        expect(checkboxGroupEls).not.toBe(null);
        expect(checkboxGroupEls.length).toBe(FACET_MULTIPLE_SPECIES.terms.length);
    });

    /**
     * Species names are displayed as checkbox labels for each species
     */
    it("displays species name as checkbox label for each species", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        fixture.detectChanges();

        const checkboxLabelEls = findCheckboxLabelEls();
        expect(checkboxLabelEls.length).toEqual(2);
        checkboxLabelEls.forEach((checkboxLabelEl, i) => {

            expect(checkboxLabelEl.innerHTML).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
        });
    });

    /**
     * Species checkboxes are displayed for each species
     */
    it("displays a checkbox option as selected for selected species terms", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES_HUMAN_SELECTED]);
        fixture.detectChanges();

        const checkboxGroupEls = findCheckboxGroupEls();
        expect(checkboxGroupEls).not.toBe(null);
        expect(checkboxGroupEls.length).toBe(FACET_MULTIPLE_SPECIES_HUMAN_SELECTED.terms.length);

        let matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(1); // Human should be selected
    });

    /**
     * Species is selected when checkbox option is clicked.
     */
    it("selects species when checkbox option is clicked and species is not already selected", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        fixture.detectChanges();

        const mouseCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.MUS_MUSCULUS);
        mouseCheckboxEl.click();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.HOMO_SAPIENS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        const matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(2); // Human and mouse should now both be selected
    });

    /**
     * Species is selected when checkbox option is clicked. We can assume human is selected by default.
     */
    it("deselects species when checkbox option is selected and species was already selected", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        fixture.detectChanges();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.HOMO_SAPIENS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        let matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(1); // Human should be selected

        // De-select
        humanCheckboxEl.click();
        fixture.detectChanges();

        matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(0); // Human should no longer be selected

    });

    /**
     * Button is disabled when no species is selected.
     */
    it("disables button when no species are selected", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        store.overrideSelector(selectSystemStatusIndexing, false);
        store.overrideSelector(selectSystemStatusIndexing, false);
        fixture.detectChanges();

        const buttonEl = findSelectSpeciesButton();
        expect(buttonEl.disabled).toBeTruthy();
    });

    /**
     * Button is enabled when at least one species selected.
     */
    it("enables button when species are selected", () => {

        store.overrideSelector(selectFilesFacets, [FACET_MULTIPLE_SPECIES]);
        store.overrideSelector(selectSystemStatusIndexing, false);
        fixture.detectChanges();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.HOMO_SAPIENS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        const buttonEl = findSelectSpeciesButton();
        expect(buttonEl.disabled).toBeFalsy()
    });

    /**
     * Action is dispatched so store when dispatch is called.
     */
    it("correctly dispatches select term action to store", () => {

        spyOn(store, "dispatch").and.callThrough();

        const facetName = FACET_SINGLE_SPECIES_HUMAN.name;
        const termName = FACET_SINGLE_SPECIES_HUMAN.terms[0].name;
        component["dispatchSelectedSpeciesAction"](facetName, termName, true);
        const actionToHaveBeenCalled =
            new SelectFileFacetTermAction(facetName, termName, true, GASource.SPECIES_SELECTION);
        expect(store.dispatch).toHaveBeenCalledWith(actionToHaveBeenCalled)
    });

    /**
     * Find the select species button.
     * 
     * @returns {HTMLElement}
     */
    function findSelectSpeciesButton(): HTMLSelectElement {

        return fixture.debugElement.nativeElement.querySelector(SELECTOR_BUTTON);
    }

    /**
     * Find the checkbox group HTML elements.
     * 
     * @returns {HTMLElement}
     */
    function findCheckboxGroupEls(): HTMLElement[] {

        return fixture.debugElement.nativeElement.querySelectorAll(SELECTOR_CHECKBOX_GROUP);
    }

    /**
     * Find the checkbox option with the specified label.
     *
     * @param {string} label
     * @returns {HTMLElement}
     */
    function findCheckboxGroupElWithLabel(label: string): HTMLElement {

        const groupEls = findCheckboxGroupEls() || [];
        return Array.from(groupEls).find((groupEl) => {

            const labelEls = findCheckboxLabelEls(groupEl);
            return Array.from(labelEls).find(labelEl => labelEl.innerHTML === label);
        });
    }

    /**
     * Find all checkbox label HTML elements.
     *
     * @param {HTMLElement} parentEl - default to debug element.
     * @returns {HTMLElement[]}
     */
    function findCheckboxLabelEls(parentEl: any = fixture.debugElement.nativeElement): HTMLElement[] {

        return parentEl.querySelectorAll(SELECTOR_CHECKBOX_LABEL);
    }

    /**
     * Find all selected checkboxes.
     *
     * @returns {HTMLElement[]}
     */
    function findSelectedCheckboxes(): HTMLElement[] {

        return fixture.debugElement.nativeElement.querySelectorAll(SELECTOR_CHECKBOX_SELECTED);
    }
});
