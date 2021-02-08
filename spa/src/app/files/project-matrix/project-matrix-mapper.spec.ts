/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing mapping of project matrix values returned from Azul.
 */

// App components
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import {
    MOCK_PROJECT_MATRIX_FILE_0,
    MOCK_PROJECT_MATRIX_FILE_1,
    PROJECT_ROW_SINGLE_VALUES
} from "../projects/project-row-mapper.mock";
import { ProjectMatrixMapper } from "./project-matrix-mapper";
import { GenusSpecies } from "../shared/genus-species.model";
import { LibraryConstructionApproach } from "../shared/library-construction-approach.model";

describe("MatrixMapper", () => {

    /**
     * Converts returns matrices tree format into a row for each file specified in the tree. 
     */
    it("transforms matrices tree into matrix views", () => {

        const rowMapper = new ProjectMatrixMapper();
        const contributorMatrices = PROJECT_ROW_SINGLE_VALUES.projects[0].contributorMatrices;
        const matrixViews = rowMapper["flattenResponseTree"](contributorMatrices);
        expect(matrixViews.length).toEqual(4);

        const matrixView0 = matrixViews[0];
        expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
        expect(matrixView0.libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.TENX_V2);
        expect(matrixView0.organ.length).toEqual(1);
        expect(matrixView0.organ[0]).toEqual("large intestine");
        expect(matrixView0.stage.length).toEqual(1);
        expect(matrixView0.stage[0]).toEqual("adult");
        expect(matrixView0.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
        expect(matrixView0.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url); 

        const matrixView1 = matrixViews[1];
        expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
        expect(matrixView1.libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.SMART_SEQ2);
        expect(matrixView0.organ.length).toEqual(1);
        expect(matrixView1.organ[0]).toEqual("large intestine");
        expect(matrixView0.stage.length).toEqual(1);
        expect(matrixView1.stage[0]).toEqual("adult");
        expect(matrixView1.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(matrixView1.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);
        
        const matrixView2 = matrixViews[2];
        expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
        expect(matrixView2.libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.TENX_V2);
        expect(matrixView0.organ.length).toEqual(1);
        expect(matrixView2.organ[0]).toEqual("lymph node");
        expect(matrixView0.stage.length).toEqual(1);
        expect(matrixView2.stage[0]).toEqual("adult");
        expect(matrixView2.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
        expect(matrixView2.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url);
        
        const matrixView3 = matrixViews[3];
        expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
        expect(matrixView3.libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.TENX_V2);
        expect(matrixView0.organ.length).toEqual(1);
        expect(matrixView3.organ[0]).toEqual("lymph node");
        expect(matrixView0.stage.length).toEqual(1);
        expect(matrixView3.stage[0]).toEqual("adult");
        expect(matrixView3.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(matrixView3.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);
    });

    /**
     * Converts returns matrices tree format into a row for each file specified in the tree.
     */
    it("merges files with matching urls", () => {

        const rowMapper = new ProjectMatrixMapper();
        const contributorMatrices = PROJECT_ROW_SINGLE_VALUES.projects[0].contributorMatrices;
        const dupedMatrixViews = rowMapper["flattenResponseTree"](contributorMatrices);
        const matrixViews = rowMapper["mergeDuplicatedMatrixViews"](dupedMatrixViews);
        expect(matrixViews.length).toEqual(2);

        const matrixView0 = matrixViews[0];
        expect(matrixView0.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
        expect(matrixView0.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url);
        expect(matrixView0.organ.length).toEqual(2);
        expect(matrixView0.organ.indexOf("large intestine")).not.toEqual(-1);
        expect(matrixView0.organ.indexOf("lymph node")).not.toEqual(-1);
        expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
        expect(matrixView0.libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.TENX_V2);
        expect(matrixView0.stage.length).toEqual(1);


        const matrixView1 = matrixViews[1];
        expect(matrixView1.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(matrixView1.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);
        expect(matrixView1.organ.length).toEqual(2);
        expect(matrixView1.organ.indexOf("large intestine")).not.toEqual(-1);
        expect(matrixView1.organ.indexOf("lymph node")).not.toEqual(-1);
        expect(matrixView1.libraryConstructionApproach.length).toEqual(2);
        expect(matrixView1.libraryConstructionApproach.indexOf(LibraryConstructionApproach.TENX_V2)).not.toEqual(-1);
        expect(matrixView1.libraryConstructionApproach.indexOf(LibraryConstructionApproach.SMART_SEQ2)).not.toEqual(-1);
        expect(matrixView1.stage.length).toEqual(1);
        expect(matrixView1.stage[0]).toEqual("adult");
    });

    /**
     * Converts returns matrices tree format into a row for each file specified in the tree.
     */
    it("sorts file view model values", () => {

        const rowMapper = new ProjectMatrixMapper();
        const viewModels = [{
            fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
            libraryConstructionApproach: [LibraryConstructionApproach.SMART_SEQ2, LibraryConstructionApproach.TENX_V2],
            organ: ["lymph node", "large intestine"],
            url: MOCK_PROJECT_MATRIX_FILE_0.url
        }];
        rowMapper["sortMatrixViewsMeta"](viewModels);
        expect(viewModels[0].libraryConstructionApproach[0]).toEqual(LibraryConstructionApproach.TENX_V2);
        expect(viewModels[0].libraryConstructionApproach[1]).toEqual(LibraryConstructionApproach.SMART_SEQ2);
        expect(viewModels[0].organ[0]).toEqual("large intestine");
        expect(viewModels[0].organ[1]).toEqual("lymph node");
    });

    /**
     * Confirm multi-value keys are added as separate values (eg kidney,blood becomes [kidney, blood])
     */
    it("splits multi-value keys and adds as separate values", () => {
        
        const matrices = {
            "genusSpecies": {
                "Homo sapiens,Mus musculus": [
                    {
                        "url": MOCK_PROJECT_MATRIX_FILE_0.url,
                        "name": MOCK_PROJECT_MATRIX_FILE_0.name
                    }
                ]
            }
        };

        const rowMapper = new ProjectMatrixMapper();
        const matrixViews = rowMapper.bindMatrices(matrices);
        const matrixView = matrixViews[0];
        const species = matrixView[FileFacetName.GENUS_SPECIES];
        expect(species.length).toEqual(2);
        expect(species.indexOf(GenusSpecies.HOMO_SAPIENS)).not.toEqual(-1);
        expect(species.indexOf(GenusSpecies.MUS_MUSCULUS)).not.toEqual(-1);
        
    });

    /**
     * Confirm meta values are sorted alpha.
     */
    it("sorts meta", () => {

        const matrices = {
            "genusSpecies": {
                "Mus musculus,Homo sapiens": [
                    {
                        "url": MOCK_PROJECT_MATRIX_FILE_0.url,
                        "name": MOCK_PROJECT_MATRIX_FILE_0.name
                    }
                ]
            }
        };

        const rowMapper = new ProjectMatrixMapper();
        const matrixViews = rowMapper.bindMatrices(matrices);
        const matrixView = matrixViews[0];
        const species = matrixView[FileFacetName.GENUS_SPECIES];
        expect(species[0]).toEqual(GenusSpecies.HOMO_SAPIENS);
        expect(species[1]).toEqual(GenusSpecies.MUS_MUSCULUS);
    });

    /**
     * Confirm views are sorted by species.
     */
    it("sorts views by species", () => {

        const viewModels = [{
            fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
            libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
            organ: ["lymph node", "large intestine"],
            genusSpecies: [GenusSpecies.MUS_MUSCULUS],
            url: MOCK_PROJECT_MATRIX_FILE_0.url
        }, {
            fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
            libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
            organ: ["lymph node", "large intestine"],
            genusSpecies: [GenusSpecies.HOMO_SAPIENS],
            url: MOCK_PROJECT_MATRIX_FILE_1.url
        }];

        const rowMapper = new ProjectMatrixMapper();
        rowMapper["sortMatrixViews"](viewModels);
        
        expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    });

    /**
     * Confirm views are sorted by species then organ
     */
    it("sorts views by species then organ", () => {

        const viewModels = [{
            fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
            libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
            organ: ["lymph node"],
            genusSpecies: [GenusSpecies.HOMO_SAPIENS],
            url: MOCK_PROJECT_MATRIX_FILE_0.url
        }, {
            fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
            libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
            organ: ["large intestine"],
            genusSpecies: [GenusSpecies.HOMO_SAPIENS],
            url: MOCK_PROJECT_MATRIX_FILE_1.url
        }];

        const rowMapper = new ProjectMatrixMapper();
        rowMapper["sortMatrixViews"](viewModels);

        expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    });

    /**
     * Confirm views are sorted by species, organ then library construction approach
     */
    it("sorts views by species, organ then library construction approach", () => {

        const viewModels = [{
            fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
            libraryConstructionApproach: [LibraryConstructionApproach.SMART_SEQ2],
            organ: ["lymph node"],
            genusSpecies: [GenusSpecies.HOMO_SAPIENS],
            url: MOCK_PROJECT_MATRIX_FILE_0.url
        }, {
            fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
            libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2], // "10x .."
            organ: ["lymph node"],
            genusSpecies: [GenusSpecies.HOMO_SAPIENS],
            url: MOCK_PROJECT_MATRIX_FILE_1.url
        }];

        const rowMapper = new ProjectMatrixMapper();
        rowMapper["sortMatrixViews"](viewModels);

        expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
        expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    });
    
    /**
     * Confirm empty response tree is converted to empty array.
     */
    it("converts empty tree response to empty array", () => {

        const rowMapper = new ProjectMatrixMapper();
        const matrixViews = rowMapper.bindMatrices({});
        expect(matrixViews).toBeTruthy();
        expect(matrixViews.length).toEqual(0);
    });

    /**
     * Confirm null response tree is converted to empty array.
     */
    it("converts null tree response to empty array", () => {

        const rowMapper = new ProjectMatrixMapper();
        const matrixViews = rowMapper.bindMatrices();
        expect(matrixViews).toBeTruthy();
        expect(matrixViews.length).toEqual(0);
    });

    /**
     * Confirm leaves with multiple files are added as individual rows.
     */
    it("handles multiple files in leaf", () => {

        const matrices = {
            "genusSpecies": {
                "Homo sapiens": [
                    {
                        "url": MOCK_PROJECT_MATRIX_FILE_0.url,
                        "name": MOCK_PROJECT_MATRIX_FILE_0.name
                    },
                    {
                        "url": MOCK_PROJECT_MATRIX_FILE_1.url,
                        "name": MOCK_PROJECT_MATRIX_FILE_1.name
                    }
                ]
            }
        };

        const rowMapper = new ProjectMatrixMapper();
        const matrixViews = rowMapper.bindMatrices(matrices);
        expect(matrixViews.length).toEqual(2);
    });
});
