/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing species selection component.
 */

// Core dependencies
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";

// App components
import { HCAGetDataPanelComponent } from "../hca-get-data-panel/hca-get-data-panel.component";
import { HCAGetMatrixSpeciesSelectionComponent } from "./hca-get-matrix-species-selection.component";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { Term } from "../../shared/term.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";

describe("HCAGetMatrixSpeciesSelectionComponent", () => {

    let component: HCAGetMatrixSpeciesSelectionComponent;
    let fixture: ComponentFixture<HCAGetMatrixSpeciesSelectionComponent>;

    const SELECTOR_BUTTON = "button";
    const SELECTOR_CHECKBOX_SELECTED = "mat-icon";
    const SELECTOR_CHECKBOX_GROUP = ".hca-checkbox-group";
    const SELECTOR_CHECKBOX_LABEL = ".hca-checkbox-label";

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    const FACET_SINGLE_SPECIES_HUMAN = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.HOMO_SAPIENS, 100, false)
    ]);
    const FACET_SINGLE_SPECIES_MOUSE = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.MUS_MUSCULUS, 100, false)
    ]);
    const FACET_MULTIPLE_SPECIES = new FileFacet(FileFacetName.GENUS_SPECIES, 100, [
        new Term(GenusSpecies.HOMO_SAPIENS, 100, false),
        new Term(GenusSpecies.MUS_MUSCULUS, 100, false)
    ]);

    const testSearchTermHttpService =
        jasmine.createSpyObj("SearchTermHttpService", ["bindSearchTerms", "marshallSearchTerms"]);
    testSearchTermHttpService.marshallSearchTerms.and.returnValue("");

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                HCAGetDataPanelComponent,
                HCAGetMatrixSpeciesSelectionComponent
            ],
            imports: [
                MatIconModule
            ],
            providers: [
                {
                    provide: SearchTermHttpService,
                    useValue: testSearchTermHttpService
                },
                {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HCAGetMatrixSpeciesSelectionComponent);
        component = fixture.componentInstance;
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Species selection is not required if there is only one species, and that species is human. 
     */
    it("skips species selection if there is only one species and that species is human", (done: DoneFn) => {

        component.speciesSelected.subscribe((speciesSelected) => {
            expect(speciesSelected).toEqual(true);
            done();
        });

        component.speciesFileFacet = FACET_SINGLE_SPECIES_HUMAN;
        component.ngOnChanges({});
    });

    /**
     * Species selection defaults to human if there is only one species, and that species is mouse.
     */
    it("does not auto select human if there is only one species and that species is mouse", () => {

        spyOn<any>(component, "dispatchSelectedSpeciesAction").and.callThrough();
        
        component.speciesFileFacet = FACET_SINGLE_SPECIES_MOUSE;
        component.ngOnChanges({});
        
        expect(component["dispatchSelectedSpeciesAction"]).not.toHaveBeenCalled();
    });

    /**
     * Species checkboxes are build if there is one species and that species is mouse
     */
    it("builds checkbox options if there is one species and species is mouse", () => {

        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();
        
        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});

        expect(component["buildSpeciesCheckboxOptions"]).toHaveBeenCalled();
    });

    /**
     * Species selection defaults to human if there is only one species, and that species is human.
     */
    it("auto selects human if there is only one species and that species is human", () => {

        spyOn<any>(component, "dispatchSelectedSpeciesAction").and.callThrough();

        component.speciesFileFacet = FACET_SINGLE_SPECIES_HUMAN;
        component.ngOnChanges({});

        expect(component["dispatchSelectedSpeciesAction"]).toHaveBeenCalled();
    });

    /**
     * Species checkbox options are not set up if there is only one species, and that species is human.
     */
    it("doesn't set up checkboxes if there is only one species and that species is human", () => {

        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();
    
        component.speciesFileFacet = FACET_SINGLE_SPECIES_HUMAN;
        component.ngOnChanges({});

        expect(component["buildSpeciesCheckboxOptions"]).not.toHaveBeenCalled();
    });

    /**
     * Species selection is not skipped if there is more than one species.
     */
    it("doesn't skips species selection if there is more than one species", () => {

        spyOn<any>(component, "dispatchSelectedSpeciesAction").and.callThrough();
        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();
        
        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});

        expect(component["dispatchSelectedSpeciesAction"]).not.toHaveBeenCalled();
        expect(component["buildSpeciesCheckboxOptions"]).toHaveBeenCalled();
    });

    /**
     * Species checkboxes are built if there is more than one species.
     */
    it("builds checkbox options if there is more than one species", () => {

        spyOn<any>(component, "buildSpeciesCheckboxOptions").and.callThrough();

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});

        expect(component["buildSpeciesCheckboxOptions"]).toHaveBeenCalled();
    });

    /**
     * Checkbox option is created for each species, auto selecting human if present.
     */
    it("correctly builds a checkbox option for each species", () => {

        const options = component["buildSpeciesCheckboxOptions"](FACET_MULTIPLE_SPECIES.terms);
        expect(options.length).toEqual(FACET_MULTIPLE_SPECIES.terms.length);
        options.forEach((option, i) => {

            expect(option.label).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
            expect(option.value).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
            expect(option.selected).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name === GenusSpecies.HOMO_SAPIENS);
        })
    });

    /**
     * Species checkboxes are displayed for each species
     */
    it("displays a checkbox option for each species", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const checkboxGroupEls = findCheckboxGroupEls();
        expect(checkboxGroupEls).not.toBe(null);
        expect(checkboxGroupEls.length).toBe(component.speciesFileFacet.terms.length);
    });

    /**
     * Species names are displayed as checkbox labels for each species
     */
    it("displays species name as checkbox label for each species", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const checkboxLabelEls = findCheckboxLabelEls();
        expect(checkboxLabelEls.length).toEqual(2);
        checkboxLabelEls.forEach((checkboxLabelEl, i) => {

            expect(checkboxLabelEl.innerHTML).toEqual(FACET_MULTIPLE_SPECIES.terms[i].name);
        });
    });

    /**
     * Species is selected when checkbox option is clicked. We can assume mouse is not selected by default, and human
     * is already selected by default.
     */
    it("selects species when checkbox option is selected and species is not already selected", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.MUS_MUSCULUS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        const matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(2); // Human and mouse should now both be selected
    });

    /**
     * Species is selected when checkbox option is clicked. We can assume human is selected by default.
     */
    it("deselects species when checkbox option is selected and species is already selected", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.HOMO_SAPIENS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        const matIconEl = findSelectedCheckboxes();
        expect(matIconEl).not.toBe(null);
        expect(matIconEl.length).toBe(0); // Human should no longer be selected
    });

    /**
     * Button is enabled when there is at least one species selected. We can assume human is selected by default.
     */
    it("disables button when no species are selected", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const buttonEl = findSelectSpeciesButton();
        expect(buttonEl.disabled).toBeFalsy();
    });

    /**
     * Button is disabled when there are no species selected. We can assume human is selected by default.
     */
    it("disables button when no species are selected", () => {

        component.speciesFileFacet = FACET_MULTIPLE_SPECIES;
        component.ngOnChanges({});
        fixture.detectChanges();

        const humanCheckboxEl = findCheckboxGroupElWithLabel(GenusSpecies.HOMO_SAPIENS);
        humanCheckboxEl.click();

        fixture.detectChanges();

        const buttonEl = findSelectSpeciesButton();
        expect(buttonEl.disabled).toBeTruthy()
    });

    /**
     * Action is dispatched so store when dispatch is called.
     */
    it("correctly dispatches select term action to store", () => {

        testStore.dispatch.and.callThrough();
        
        const facetName = FACET_SINGLE_SPECIES_HUMAN.name;
        const termName = FACET_SINGLE_SPECIES_HUMAN.terms[0].name;
        component["dispatchSelectedSpeciesAction"](facetName, termName, []);
        const actionToHaveBeenCalled =
            new SelectFileFacetTermAction(facetName, termName, true, GASource.COHORT_MATRIX, "");
        expect(testStore.dispatch).toHaveBeenCalledWith(actionToHaveBeenCalled)
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
