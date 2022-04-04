/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of samples with various values, to be exercised by the sample row mapper spec.
 */

// 0 - Example of sample with single values (eg disease, genusSpecies)
export const SAMPLE_SINGLE_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: ["Smart-seq2"],
            instrumentManufacturerModel: ["Illumina HiSeq 2500"],
            pairedEnd: [true],
            workflow: ["a"],
            workflowVersion: ["a"],
        },
    ],
    entryId: "e7cca2dc-ca90-4722-884a-6afa3211a1da",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: ["Melanoma infiltration of stromal and immune cells"],
            projectShortname: ["Mouse Melanoma"],
            laboratory: ["Human Cell Atlas Data Coordination Platform"],
        },
    ],
    samples: [
        {
            sampleEntityType: "specimens",
            id: "1104_LN",
            modelOrgan: ["foo"],
            organ: "lymph node",
            organPart: ["a"],
            disease: ["a"],
            preservationMethod: ["a"],
            source: "specimen_from_organism",
        },
    ],
    specimens: [
        {
            id: ["1104_LN"],
            organ: ["lymph node"],
            organPart: ["a"],
            disease: ["a"],
            preservationMethod: ["a"],
            source: ["specimen_from_organism"],
        },
    ],
    cellLines: ["a"],
    donorOrganisms: [
        {
            id: ["1104"],
            genusSpecies: ["Mus musculus"],
            organismAge: [
                {
                    value: "56",
                    unit: "year",
                },
            ],
            biologicalSex: ["female"],
            disease: ["a"],
        },
    ],
    organoids: ["a"],
    cellSuspensions: [
        {
            organ: ["lymph node"],
            organPart: ["a"],
            selectedCellType: ["CD4+ T cell"],
            totalCells: 91,
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "pdf",
            count: 3,
            totalSize: 15762678,
        },
        {
            format: "unknown",
            count: 30,
            totalSize: 636842097,
        },
        {
            format: "bam",
            count: 6,
            totalSize: 56575551018,
        },
        {
            format: "matrix",
            count: 6,
            totalSize: 888,
        },
        {
            format: "csv",
            count: 6,
            totalSize: 151039275,
        },
    ],
};

// 1 - Example of sample with multiple values within single objects
export const SAMPLE_MULTIPLE_VALUES_SINGLE_OBJECT = {
    protocols: [
        {
            libraryConstructionApproach: ["Smart-seq2", "a"],
            instrumentManufacturerModel: ["Illumina HiSeq 2500", "a"],
            pairedEnd: [true, false],
            workflow: ["a", "b"],
            workflowVersion: ["a", "b"],
        },
    ],
    entryId: "e7cca2dc-ca90-4722-884a-6afa3211a1da",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: [
                "Melanoma infiltration of stromal and immune cells",
                "a",
            ],
            projectShortname: ["Mouse Melanoma", "a"],
            laboratory: ["Human Cell Atlas Data Coordination Platform", "a"],
        },
    ],
    samples: [
        {
            sampleEntityType: "specimens",
            id: "1104_LN",
            modelOrgan: ["foo", "bar"],
            organ: "lymph node",
            organPart: ["a", "b"],
            disease: ["a", "b"],
            preservationMethod: ["a", "b"],
            source: "specimen_from_organism",
        },
    ],
    specimens: [
        {
            id: ["1104_LN", "b"],
            organ: ["lymph node", "b"],
            organPart: ["a", "b"],
            disease: ["a", "b"],
            preservationMethod: ["a", "b"],
            source: ["specimen_from_organism", "b"],
        },
    ],
    cellLines: ["a", "b"],
    donorOrganisms: [
        {
            id: ["1104", "b"],
            genusSpecies: ["Mus musculus", "b"],
            organismAge: [
                {
                    value: "56",
                    unit: "year",
                },
                {
                    value: "60",
                    unit: "year",
                },
            ],
            biologicalSex: ["female", "b"],
            disease: ["a", "b"],
        },
    ],
    organoids: ["a", "b"],
    cellSuspensions: [
        {
            organ: ["lymph node", "b"],
            organPart: ["a", "b"],
            selectedCellType: ["CD4+ T cell", "b"],
            totalCells: 91,
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "pdf",
            count: 3,
            totalSize: 15762678,
        },
        {
            format: "unknown",
            count: 30,
            totalSize: 636842097,
        },
        {
            format: "bam",
            count: 6,
            totalSize: 56575551018,
        },
        {
            format: "matrix",
            count: 6,
            totalSize: 888,
        },
        {
            format: "csv",
            count: 6,
            totalSize: 151039275,
        },
    ],
};

// 2 - Example of sample with single and multiple values across multiple objects
export const SAMPLE_VALUES_ACROSS_MULTIPLE_OBJECTS = {
    protocols: [
        {
            libraryConstructionApproach: ["Smart-seq2", "a"],
            instrumentManufacturerModel: ["Illumina HiSeq 2500", "a"],
            pairedEnd: [false],
            workflow: ["a", "b"],
            workflowVersion: ["a", "b"],
        },
        {
            libraryConstructionApproach: ["x"],
            instrumentManufacturerModel: ["x"],
            pairedEnd: [true],
            workflow: ["x"],
            workflowVersion: ["x"],
        },
    ],
    entryId: "e7cca2dc-ca90-4722-884a-6afa3211a1da",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: [
                "Melanoma infiltration of stromal and immune cells",
                "a",
            ],
            projectShortname: ["Mouse Melanoma", "a"],
            laboratory: ["Human Cell Atlas Data Coordination Platform", "a"],
        },
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7a",
            projectTitle: ["x"],
            projectShortname: ["x"],
            laboratory: ["x"],
        },
    ],
    samples: [
        {
            sampleEntityType: "specimens",
            id: "1104_LN",
            modelOrgan: ["foo"],
            organ: "lymph node",
            organPart: ["x"],
            disease: ["x"],
            preservationMethod: ["x"],
            source: "specimen_from_organism",
        },
        {
            sampleEntityType: "specimens",
            id: "1104_LN",
            organ: "lymph node",
            organPart: ["x"],
            disease: ["x"],
            preservationMethod: ["x"],
            source: "specimen_from_organism",
        },
    ],
    specimens: [
        {
            id: ["1104_LN", "b"],
            modelOrgan: ["bar"],
            organ: ["lymph node", "b"],
            organPart: ["a", "b"],
            disease: ["a", "b"],
            preservationMethod: ["a", "b"],
            source: ["specimen_from_organism", "b"],
        },
        {
            id: ["x"],
            organ: ["x"],
            organPart: ["x"],
            disease: ["x"],
            preservationMethod: ["x"],
            source: ["x"],
        },
    ],
    cellLines: ["a", "b"],
    donorOrganisms: [
        {
            id: ["1104", "b"],
            genusSpecies: ["Mus musculus", "b"],
            organismAge: [
                {
                    value: "56",
                    unit: "year",
                },
            ],
            biologicalSex: ["female", "b"],
            disease: ["a", "b"],
        },
        {
            id: ["x"],
            genusSpecies: ["x"],
            organismAge: [
                {
                    value: "60",
                    unit: "year",
                },
            ],
            biologicalSex: ["x"],
            disease: ["x"],
        },
    ],
    organoids: ["a", "b"],
    cellSuspensions: [
        {
            organ: ["lymph node", "b"],
            organPart: ["a", "b"],
            selectedCellType: ["CD4+ T cell", "b"],
            totalCells: 91,
        },
        {
            organ: ["x"],
            organPart: ["x"],
            selectedCellType: ["x"],
            totalCells: 91,
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "pdf",
            count: 3,
            totalSize: 15762678,
        },
        {
            format: "unknown",
            count: 30,
            totalSize: 636842097,
        },
        {
            format: "bam",
            count: 6,
            totalSize: 56575551018,
        },
        {
            format: "matrix",
            count: 6,
            totalSize: 888,
        },
        {
            format: "csv",
            count: 6,
            totalSize: 151039275,
        },
    ],
};

// 3 - Example of sample with empty array values
export const SAMPLE_EMPTY_ARRAY_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: [],
            instrumentManufacturerModel: [],
            pairedEnd: [],
            workflow: [],
            workflowVersion: [],
        },
    ],
    entryId: "e7cca2dc-ca90-4722-884a-6afa3211a1da",
    projects: [
        {
            projectId: "",
            projectTitle: [],
            projectShortname: [],
            laboratory: [],
        },
    ],
    samples: [
        {
            sampleEntityType: "specimens",
            id: "1104_LN",
            modelOrgan: [],
            organ: "lymph node",
            organPart: [],
            disease: [],
            preservationMethod: [],
            source: "specimen_from_organism",
        },
    ],
    specimens: [
        {
            id: [],
            organ: [],
            organPart: [],
            disease: [],
            preservationMethod: [],
            source: [],
        },
    ],
    cellLines: [],
    donorOrganisms: [
        {
            id: [],
            genusSpecies: [],
            organismAge: [],
            biologicalSex: [],
            disease: [],
        },
    ],
    organoids: [],
    cellSuspensions: [
        {
            organ: [],
            organPart: [],
            selectedCellType: [],
            totalCells: 91,
        },
    ],
    fileTypeSummaries: [],
};

// 4 -  Example of sample with top level null values
export const SAMPLE_NULL_TOP_LEVEL_VALUES = {
    protocols: null,
    entryId: null,
    projects: null,
    samples: null,
    specimens: null,
    cellLines: null,
    donorOrganisms: null,
    organoids: null,
    cellSuspensions: null,
    fileTypeSummaries: null,
};

// 5 -  Example of sample with null values
export const SAMPLE_NULL_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: null,
            instrumentManufacturerModel: null,
            pairedEnd: null,
            workflow: null,
            workflowVersion: null,
        },
    ],
    entryId: null,
    projects: [
        {
            projectId: null,
            projectTitle: null,
            projectShortname: null,
            laboratory: null,
        },
    ],
    samples: [
        {
            sampleEntityType: null,
            id: null,
            modelOrgan: null,
            organ: null,
            organPart: null,
            disease: null,
            preservationMethod: null,
            source: null,
        },
    ],
    specimens: [
        {
            id: null,
            organ: null,
            organPart: null,
            disease: null,
            preservationMethod: null,
            source: null,
        },
    ],
    cellLines: null,
    donorOrganisms: [
        {
            id: null,
            genusSpecies: null,
            organismAge: null,
            biologicalSex: null,
            disease: null,
        },
    ],
    organoids: null,
    cellSuspensions: [
        {
            organ: null,
            organPart: null,
            selectedCellType: null,
            totalCells: null,
        },
    ],
    fileTypeSummaries: [
        {
            format: null,
            count: null,
            totalSize: null,
        },
    ],
};
