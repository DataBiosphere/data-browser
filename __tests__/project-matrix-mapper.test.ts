/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec for testing mapping of project matrix values returned from Azul.
 */

// App components
import {
  GenusSpecies,
  LibraryConstructionApproach,
} from "../app/viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/constants";
import {
  flattenResponseTree,
  mergeDuplicatedMatrixViews,
  projectMatrixMapper,
  sortMatrixViews,
  sortMatrixViewsMeta,
} from "../app/viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/projectMatrixMapper";
import { HCA_DCP_CATEGORY_KEY } from "../site-config/hca-dcp/category";

const COUNT_MATRIX = "Count Matrix";
const LARGE_INTESTINE = "large intestine";
const LYMPH_NODE = "lymph node";
const MOCK_PROJECT_MATRIX_FILE_0 = {
  name: "123.loom",
  size: 254147853,
  url: "http://path/to/file0?version=0&catalog=dcp2ebi",
};
const MOCK_PROJECT_MATRIX_FILE_1 = {
  name: "456.loom",
  size: 254147854,
  url: "http://path/to/file1?version=0&catalog=dcp2ebi",
};
const CONTRIBUTED_ANALYSES = {
  genusSpecies: {
    "Homo sapiens": {
      stage: {
        adult: {
          organ: {
            "large intestine": {
              libraryConstructionApproach: {
                [LibraryConstructionApproach.TENX_V2]: [
                  {
                    name: MOCK_PROJECT_MATRIX_FILE_0.name,
                    size: MOCK_PROJECT_MATRIX_FILE_0.size,
                    url: MOCK_PROJECT_MATRIX_FILE_0.url,
                  },
                ],
                [LibraryConstructionApproach.SMART_SEQ2]: [
                  {
                    name: MOCK_PROJECT_MATRIX_FILE_1.name,
                    size: MOCK_PROJECT_MATRIX_FILE_1.size,
                    url: MOCK_PROJECT_MATRIX_FILE_1.url,
                  },
                ],
              },
            },
            "lymph node": {
              libraryConstructionApproach: {
                [LibraryConstructionApproach.TENX_V2]: [
                  {
                    name: MOCK_PROJECT_MATRIX_FILE_0.name,
                    size: MOCK_PROJECT_MATRIX_FILE_0.size,
                    url: MOCK_PROJECT_MATRIX_FILE_0.url,
                  },
                  {
                    name: MOCK_PROJECT_MATRIX_FILE_1.name,
                    size: MOCK_PROJECT_MATRIX_FILE_1.size,
                    url: MOCK_PROJECT_MATRIX_FILE_1.url,
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

describe("MatrixMapper", () => {
  /**
   * Converts returns matrices tree format into a row for each file specified in the tree.
   */
  it("transforms matrices tree into matrix views", () => {
    const contributorMatrices = CONTRIBUTED_ANALYSES;
    const matrixViews = flattenResponseTree(contributorMatrices);
    expect(matrixViews.length).toEqual(4);

    const matrixView0 = matrixViews[0];
    expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
    expect(matrixView0.libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.TENX_V2
    );
    expect(matrixView0.organ.length).toEqual(1);
    expect(matrixView0.organ[0]).toEqual(LARGE_INTESTINE);
    expect(matrixView0.stage.length).toEqual(1);
    expect(matrixView0.stage[0]).toEqual("adult");
    expect(matrixView0.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    expect(matrixView0.size).toEqual(MOCK_PROJECT_MATRIX_FILE_0.size);
    expect(matrixView0.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url);

    const matrixView1 = matrixViews[1];
    expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
    expect(matrixView1.libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.SMART_SEQ2
    );
    expect(matrixView0.organ.length).toEqual(1);
    expect(matrixView1.organ[0]).toEqual(LARGE_INTESTINE);
    expect(matrixView0.stage.length).toEqual(1);
    expect(matrixView1.stage[0]).toEqual("adult");
    expect(matrixView1.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(matrixView1.size).toEqual(MOCK_PROJECT_MATRIX_FILE_1.size);
    expect(matrixView1.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);

    const matrixView2 = matrixViews[2];
    expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
    expect(matrixView2.libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.TENX_V2
    );
    expect(matrixView0.organ.length).toEqual(1);
    expect(matrixView2.organ[0]).toEqual(LYMPH_NODE);
    expect(matrixView0.stage.length).toEqual(1);
    expect(matrixView2.stage[0]).toEqual("adult");
    expect(matrixView2.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    expect(matrixView2.size).toEqual(MOCK_PROJECT_MATRIX_FILE_0.size);
    expect(matrixView2.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url);

    const matrixView3 = matrixViews[3];
    expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
    expect(matrixView3.libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.TENX_V2
    );
    expect(matrixView0.organ.length).toEqual(1);
    expect(matrixView3.organ[0]).toEqual(LYMPH_NODE);
    expect(matrixView0.stage.length).toEqual(1);
    expect(matrixView3.stage[0]).toEqual("adult");
    expect(matrixView3.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(matrixView3.size).toEqual(MOCK_PROJECT_MATRIX_FILE_1.size);
    expect(matrixView3.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);
  });

  /**
   * Converts returns matrices tree format into a row for each file specified in the tree.
   */
  it("merges files with matching urls", () => {
    const contributorMatrices = CONTRIBUTED_ANALYSES;
    const dupedMatrixViews = flattenResponseTree(contributorMatrices);
    const matrixViews = mergeDuplicatedMatrixViews(dupedMatrixViews);
    expect(matrixViews.length).toEqual(2);

    const matrixView0 = matrixViews[0];
    expect(matrixView0.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
    expect(matrixView0.size).toEqual(MOCK_PROJECT_MATRIX_FILE_0.size);
    expect(matrixView0.url).toEqual(MOCK_PROJECT_MATRIX_FILE_0.url);
    expect(matrixView0.organ.length).toEqual(2);
    expect(matrixView0.organ.indexOf(LARGE_INTESTINE)).not.toEqual(-1);
    expect(matrixView0.organ.indexOf(LYMPH_NODE)).not.toEqual(-1);
    expect(matrixView0.libraryConstructionApproach.length).toEqual(1);
    expect(matrixView0.libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.TENX_V2
    );
    expect(matrixView0.stage.length).toEqual(1);

    const matrixView1 = matrixViews[1];
    expect(matrixView1.fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(matrixView1.size).toEqual(MOCK_PROJECT_MATRIX_FILE_1.size);
    expect(matrixView1.url).toEqual(MOCK_PROJECT_MATRIX_FILE_1.url);
    expect(matrixView1.organ.length).toEqual(2);
    expect(matrixView1.organ.indexOf(LARGE_INTESTINE)).not.toEqual(-1);
    expect(matrixView1.organ.indexOf(LYMPH_NODE)).not.toEqual(-1);
    expect(matrixView1.libraryConstructionApproach.length).toEqual(2);
    expect(
      matrixView1.libraryConstructionApproach.indexOf(
        LibraryConstructionApproach.TENX_V2
      )
    ).not.toEqual(-1);
    expect(
      matrixView1.libraryConstructionApproach.indexOf(
        LibraryConstructionApproach.SMART_SEQ2
      )
    ).not.toEqual(-1);
    expect(matrixView1.stage.length).toEqual(1);
    expect(matrixView1.stage[0]).toEqual("adult");
  });

  /**
   * Converts returns matrices tree format into a row for each file specified in the tree.
   */
  it("sorts file view model values", () => {
    const viewModels = [
      {
        contentDescription: ["Matrix"],
        fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
        id: "1234",
        libraryConstructionApproach: [
          LibraryConstructionApproach.SMART_SEQ2,
          LibraryConstructionApproach.TENX_V2,
        ],
        organ: [LYMPH_NODE, LARGE_INTESTINE],
        size: MOCK_PROJECT_MATRIX_FILE_0.size,
        url: MOCK_PROJECT_MATRIX_FILE_0.url,
        version: "1",
      },
    ];
    sortMatrixViewsMeta(viewModels);
    expect(viewModels[0].libraryConstructionApproach[0]).toEqual(
      LibraryConstructionApproach.TENX_V2
    );
    expect(viewModels[0].libraryConstructionApproach[1]).toEqual(
      LibraryConstructionApproach.SMART_SEQ2
    );
    expect(viewModels[0].organ[0]).toEqual(LARGE_INTESTINE);
    expect(viewModels[0].organ[1]).toEqual(LYMPH_NODE);
  });

  /**
   * Confirm multi-value keys are added as separate values (eg kidney,blood becomes [kidney, blood])
   */
  it("splits multi-value keys and adds as separate values", () => {
    const matrices = {
      genusSpecies: {
        "Homo sapiens,Mus musculus": [
          {
            name: MOCK_PROJECT_MATRIX_FILE_0.name,
            url: MOCK_PROJECT_MATRIX_FILE_0.url,
          },
        ],
      },
    };

    const matrixViews = projectMatrixMapper(matrices);
    const matrixView = matrixViews[0];
    const species = matrixView[HCA_DCP_CATEGORY_KEY.GENUS_SPECIES];
    expect(species.length).toEqual(2);
    expect(species.indexOf(GenusSpecies.HOMO_SAPIENS)).not.toEqual(-1);
    expect(species.indexOf(GenusSpecies.MUS_MUSCULUS)).not.toEqual(-1);
  });

  /**
   * Confirm meta values are sorted alpha.
   */
  it("sorts meta", () => {
    const matrices = {
      genusSpecies: {
        "Mus musculus,Homo sapiens": [
          {
            name: MOCK_PROJECT_MATRIX_FILE_0.name,
            url: MOCK_PROJECT_MATRIX_FILE_0.url,
          },
        ],
      },
    };

    const matrixViews = projectMatrixMapper(matrices);
    const matrixView = matrixViews[0];
    const species = matrixView[HCA_DCP_CATEGORY_KEY.GENUS_SPECIES];
    expect(species[0]).toEqual(GenusSpecies.HOMO_SAPIENS);
    expect(species[1]).toEqual(GenusSpecies.MUS_MUSCULUS);
  });

  /**
   * Confirm views are sorted by species.
   */
  it("sorts views by species", () => {
    const viewModels = [
      {
        contentDescription: ["Matrix"],
        fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
        genusSpecies: [GenusSpecies.MUS_MUSCULUS],
        id: "1234",
        libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
        organ: [LYMPH_NODE, LARGE_INTESTINE],
        size: MOCK_PROJECT_MATRIX_FILE_0.size,
        url: MOCK_PROJECT_MATRIX_FILE_0.url,
        version: "1",
      },
      {
        contentDescription: [COUNT_MATRIX],
        fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
        genusSpecies: [GenusSpecies.HOMO_SAPIENS],
        id: "1234",
        libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
        organ: [LYMPH_NODE, LARGE_INTESTINE],
        size: MOCK_PROJECT_MATRIX_FILE_1.size,
        url: MOCK_PROJECT_MATRIX_FILE_1.url,
        version: "1",
      },
    ];

    sortMatrixViews(viewModels);

    expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
  });

  /**
   * Confirm views are sorted by species then organ
   */
  it("sorts views by species then organ", () => {
    const viewModels = [
      {
        contentDescription: [COUNT_MATRIX],
        fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
        genusSpecies: [GenusSpecies.HOMO_SAPIENS],
        id: "1234",
        libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
        organ: [LYMPH_NODE],
        size: MOCK_PROJECT_MATRIX_FILE_0.size,
        url: MOCK_PROJECT_MATRIX_FILE_0.url,
        version: "1",
      },
      {
        contentDescription: ["Matrix"],
        fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
        genusSpecies: [GenusSpecies.HOMO_SAPIENS],
        id: "1235",
        libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2],
        organ: [LARGE_INTESTINE],
        size: MOCK_PROJECT_MATRIX_FILE_1.size,
        url: MOCK_PROJECT_MATRIX_FILE_1.url,
        version: "1",
      },
    ];

    sortMatrixViews(viewModels);

    expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
  });

  /**
   * Confirm views are sorted by species, organ then library construction approach
   */
  it("sorts views by species, organ then library construction approach", () => {
    const viewModels = [
      {
        contentDescription: ["Matrix"],
        fileName: MOCK_PROJECT_MATRIX_FILE_0.name,
        genusSpecies: [GenusSpecies.HOMO_SAPIENS],
        id: "1234",
        libraryConstructionApproach: [LibraryConstructionApproach.SMART_SEQ2],
        organ: [LYMPH_NODE],
        size: MOCK_PROJECT_MATRIX_FILE_0.size,
        url: MOCK_PROJECT_MATRIX_FILE_0.url,
        version: "1",
      },
      {
        contentDescription: [COUNT_MATRIX],
        fileName: MOCK_PROJECT_MATRIX_FILE_1.name,
        genusSpecies: [GenusSpecies.HOMO_SAPIENS],
        id: "1235",
        libraryConstructionApproach: [LibraryConstructionApproach.TENX_V2], // "10x .."
        organ: [LYMPH_NODE],
        size: MOCK_PROJECT_MATRIX_FILE_1.size,
        url: MOCK_PROJECT_MATRIX_FILE_1.url,
        version: "1",
      },
    ];

    sortMatrixViews(viewModels);

    expect(viewModels[0].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_1.name);
    expect(viewModels[1].fileName).toEqual(MOCK_PROJECT_MATRIX_FILE_0.name);
  });

  /**
   * Confirm empty response tree is converted to empty array.
   */
  it("converts empty tree response to empty array", () => {
    const matrixViews = projectMatrixMapper({});
    expect(matrixViews).toBeTruthy();
    expect(matrixViews.length).toEqual(0);
  });

  /**
   * Confirm null response tree is converted to empty array.
   */
  it("converts null tree response to empty array", () => {
    const matrixViews = projectMatrixMapper();
    expect(matrixViews).toBeTruthy();
    expect(matrixViews.length).toEqual(0);
  });

  /**
   * Confirm leaves with multiple files are added as individual rows.
   */
  it("handles multiple files in leaf", () => {
    const matrices = {
      genusSpecies: {
        "Homo sapiens": [
          {
            name: MOCK_PROJECT_MATRIX_FILE_0.name,
            size: MOCK_PROJECT_MATRIX_FILE_0.size,
            url: MOCK_PROJECT_MATRIX_FILE_0.url,
          },
          {
            name: MOCK_PROJECT_MATRIX_FILE_1.name,
            size: MOCK_PROJECT_MATRIX_FILE_1.size,
            url: MOCK_PROJECT_MATRIX_FILE_1.url,
          },
        ],
      },
    };

    const matrixViews = projectMatrixMapper(matrices);
    expect(matrixViews.length).toEqual(2);
  });
});
