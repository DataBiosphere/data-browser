/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for ProjectDownloadMatrix.
 */

// Core dependencies
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatIconModule } from "@angular/material";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { ClipboardModule } from "ngx-clipboard";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { CopyToClipboardComponent } from "../../shared/copy-to-clipboard/copy-to-clipboard.component";
import { FileDownloadComponent } from "../../shared/file-download/file-download.component";
import { DataDownloadCitationComponent } from "../data-download-citation/data-download-citation.component";
import { LeftBarComponent } from "../left-bar/left-bar.component";
import { ProjectDownloadMatrixComponent } from "./project-download-matrix.component";
import { GenusSpecies } from "../shared/genus-species.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { SpeciesMatrixUrls } from "../shared/species-matrix-urls.model";
import { GTMService } from "../../shared/gtm/gtm.service";
import { MatrixService } from "../shared/matrix.service";

describe("ProjectDownloadMatrixComponent", () => {

    let component: ProjectDownloadMatrixComponent;
    let fixture: ComponentFixture<ProjectDownloadMatrixComponent>;

    const testStore = jasmine.createSpyObj("Store", ["pipe", "dispatch"]);

    // Example of project matrix urls with single values
    const SPECIES_URLS_HOMO_SAPIENS = new SpeciesMatrixUrls(
        "1234",
        "https://test.com/1234.homo_sapiens.csv.zip",
        "https://test.com/1234.homo_sapiens.loom",
        "https://test.com/1234.homo_sapiens.mtx.zip"
    );

    const SPECIES_URLS_MUS_MUSCULUS = new SpeciesMatrixUrls(
        "4321",
        "https://test.com/4321.mus_musculus.csv.zip",
        "https://test.com/4321.mus_musculus.loom",
        "https://test.com/4321.mus_musculus.mtx.zip"
    );

    // Input values
    const PROJECT_MATRIX_URLS_SINGLE_SPECIES = new ProjectMatrixUrls("1234", new Map([
        [GenusSpecies.HOMO_SAPIENS, SPECIES_URLS_HOMO_SAPIENS]
    ]));

    const PROJECT_MATRIX_URLS_MULTI_SPECIES = new ProjectMatrixUrls("4321", new Map([
        [GenusSpecies.HOMO_SAPIENS, SPECIES_URLS_HOMO_SAPIENS],
        [GenusSpecies.MUS_MUSCULUS, SPECIES_URLS_MUS_MUSCULUS]
    ]));

    // Example of project matrix urls with no values
    const PROJECT_MATRIX_URLS_EMPTY = new ProjectMatrixUrls("1111", new Map());

    // Selectors
    const SELECTOR_COMPONENT_FILE_DOWNLOAD = "file-download";
    const SELECTOR_HEADING_H3 = "h3";

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                CopyToClipboardComponent,
                DataDownloadCitationComponent,
                LeftBarComponent,
                FileDownloadComponent,
                ProjectDownloadMatrixComponent
            ],
            imports: [
                ClipboardModule,
                MatIconModule
            ],
            providers: [
                ConfigService,
                {
                    provide: GTMService,
                    useValue: jasmine.createSpyObj("GTMService", [
                        "trackEvent"
                    ])
                },
                {
                    provide: MatrixService,
                    useValue: jasmine.createSpyObj("MatrixService", [
                        "trackRequestCohortMatrix",
                        "trackDownloadCohortMatrix",
                        "trackCopyToClipboardCohortMatrixLink",
                        
                    ])
                },
                {
                    provide: Store,
                    useValue: testStore
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectDownloadMatrixComponent);
        component = fixture.componentInstance;

        component.classFontName = "fontsize-s";
    }));

    /**
     * Smoke test
     */
    it("should create an instance", () => {

        expect(component).toBeTruthy();
    });

    /**
     * Confirm heading for single species is displayed for project matrix URLS for a single species.
     */
    it("displays single species heading for project that has prepared matrix for one species", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
        fixture.detectChanges();

        // Grab the species headers - there should only be one, and that one should be homo sapiens
        const speciesDebugEls = getDEsBySelector(SELECTOR_HEADING_H3);
        expect(speciesDebugEls.length).toBe(1);
        const homoSapiensDebugEl = speciesDebugEls[0];
        expect(homoSapiensDebugEl.nativeElement.innerHTML).toBe(GenusSpecies.HOMO_SAPIENS);
    });

    /**
     * Confirm headings for all species is displayed for project matrix URLS for multi species.
     */
    it("displays headings for all species for project that has prepared matrix for multiple species", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_MULTI_SPECIES;
        fixture.detectChanges();

        // Grab the species headers
        const speciesDebugEls = getDEsBySelector(SELECTOR_HEADING_H3);

        // There should be a header for every species in the project matrix URLs
        const species = Array.from(component.projectMatrixUrls.urlsBySpecies.keys());
        expect(speciesDebugEls.length).toBe(species.length);
        const headings = speciesDebugEls.map(debugEl => {
            return debugEl.nativeElement.innerHTML;
        });
        species.forEach(s => {
            expect(headings.indexOf(s)).not.toBe(-1);
        });
    });

    /**
     * Confirm no heading is displayed for project that has no prepared matrix URLS.
     */
    it("displays no heading for project that has no prepared matrix", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_EMPTY;
        fixture.detectChanges();

        // Grab the species headers - there should be none
        const speciesDebugEls = getDEsBySelector(SELECTOR_HEADING_H3);
        expect(speciesDebugEls.length).toBe(0);
    });

    /**
     * Confirm components <file-download> is displayed for project matrix URLS for a single species.
     */
    it("displays components file download for project that has prepared matrix for one species", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_SINGLE_SPECIES;
        fixture.detectChanges();

        // Grab the component - there should only be three, one for each matrix url for the one species
        const fileDownloadDEs = getDEsBySelector(SELECTOR_COMPONENT_FILE_DOWNLOAD);
        expect(fileDownloadDEs.length).toBe(3);
    });

    /**
     * Confirm components <file-download> is displayed for project matrix URLS for a multi species.
     */
    it("displays components file download for project that has prepared matrix for multi species", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_MULTI_SPECIES;
        fixture.detectChanges();

        // Grab the component - there should only be 6, one for each matrix url, for both species
        const fileDownloadDEs = getDEsBySelector(SELECTOR_COMPONENT_FILE_DOWNLOAD);
        expect(fileDownloadDEs.length).toBe(6);
    });

    /**
     * Confirm component <file-download> is not displayed for project that has no prepared matrix URLS.
     */
    it("displays no component file download for project that has no prepared matrix URLS", () => {

        component.projectMatrixUrls = PROJECT_MATRIX_URLS_EMPTY;
        fixture.detectChanges();

        // Grab the component - there should be none
        const fileDownloadDEs = getDEsBySelector(SELECTOR_COMPONENT_FILE_DOWNLOAD);
        expect(fileDownloadDEs.length).toBe(0);
    });

    // /**
    //  * Confirm component <file-download> input property value for "url" for project matrix URLS for multi species.
    //  */
    // it(`displays components file download input property value "url" for project that has prepared matrix for multiple species`, () => {
    //
    //     component.projectMatrixUrls = PROJECT_MATRIX_URLS_MULTI_SPECIES;
    //     fixture.detectChanges();
    //
    //     // Get each species in the project matrix URLs
    //     const species = Array.from(component.projectMatrixUrls.urlsBySpecies.keys());
    //


    //     // Get the urls for each species
    //     const urlsBySpecies = species.map(s => {
    //         return Array.from(component.projectMatrixUrls.listMatrixUrlsBySpecies(s)).map(matrix => matrix.url);
    //     }).reduce((a, b) => a.concat(b), []);
    //
    //     // Grab the file download components
    //     const fileDownloadDEs = getDEsBySelector(SELECTOR_COMPONENT_FILE_DOWNLOAD);
    //
    //     // Get all input property urls
    //     const inputPropertyUrls = fileDownloadDEs.map(debugEl => {
    //         return debugEl.componentInstance[INPUT_PROPERTY_URL];
    //     });
    //
    //     // There should be an input property url for every species for each project matrix URL
    //     urlsBySpecies.forEach(s => {
    //         expect(inputPropertyUrls.indexOf(s)).not.toBe(-1);
    //     });
    // });

    // /**
    //  * Confirm component <file-download> input property value for "label" for project matrix URLS for multi species.
    //  */
    // it(`displays components file download input property value "label" for project that has prepared matrix for multiple species`, () => {
    //
    //     component.projectMatrixUrls = PROJECT_MATRIX_URLS_MULTI_SPECIES;
    //     fixture.detectChanges();
    //
    //     // Get each species in the project matrix URLs
    //     const species = Array.from(component.projectMatrixUrls.urlsBySpecies.keys());
    //
    //     // Get the labels for each species
    //     const labelsBySpecies = species.map(s => {
    //         return Array.from(component.projectMatrixUrls.listMatrixUrlsBySpecies(s)).map(matrix => matrix.fileType);
    //     }).reduce((a, b) => a.concat(b), []);
    //
    //     // Grab the file download components
    //     const fileDownloadDEs = getDEsBySelector(SELECTOR_COMPONENT_FILE_DOWNLOAD);
    //
    //     // Get all input property labels
    //     const inputPropertyLabels = fileDownloadDEs.map(debugEl => {
    //         return debugEl.componentInstance[INPUT_PROPERTY_LABEL];
    //     });
    //
    //     // There should be an input property label for every species for each project matrix URL
    //     labelsBySpecies.forEach(s => {
    //         expect(inputPropertyLabels.indexOf(s)).not.toBe(-1);
    //     });
    // });

    /**
     * Returns all debug elements for the specified selector.
     *
     * @param {string} selector
     * @returns {DebugElement[]}
     */
    function getDEsBySelector(selector: string): DebugElement[] {

        return fixture.debugElement.queryAll(By.css(selector));
    }
});
