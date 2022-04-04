import { LibraryConstructionApproach } from "../shared/library-construction-approach.model";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of projects with various values, to be exercised by the project row mapper spec.
 */

// Example of matrix files
export const MOCK_PROJECT_MATRIX_FILE_0 = {
    name: "123.loom",
    size: 254147853,
    url: "http://path/to/file0?version=0&catalog=dcp2ebi",
};
export const MOCK_PROJECT_MATRIX_FILE_1 = {
    name: "456.loom",
    size: 254147854,
    url: "http://path/to/file1?version=0&catalog=dcp2ebi",
};

// Example of project with single values (eg disease, genusSpecies)
export const PROJECT_ROW_SINGLE_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: ["10x_v2"],
            nucleicAcidSource: ["single cell"],
            instrumentManufacturerModel: ["Illumina HiSeq 4000"],
            pairedEnd: [false],
            workflow: ["optimus_v1.1.0"],
            assayType: ["in situ sequencing"],
        },
    ],
    entryId: "ae5237b4-633f-403a-afc6-cb87e6f90db1",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: "1 FOV BaristaSeq mouse SpaceTx dataset",
            projectShortname: "barista_seq",
            laboratory: ["x"],
            accessions: [
                {
                    namespace: "array_express",
                    accession: "123",
                },
                {
                    namespace: "geo_series",
                    accession: "456",
                },
                {
                    namespace: "insdc_project",
                    accession: "789",
                },
                {
                    namespace: "insdc_study",
                    accession: "012",
                },
            ],
            supplementaryLinks: [
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz",
            ],
            contributedAnalyses: {
                genusSpecies: {
                    "Homo sapiens": {
                        stage: {
                            adult: {
                                organ: {
                                    "large intestine": {
                                        libraryConstructionApproach: {
                                            [LibraryConstructionApproach.TENX_V2]:
                                                [
                                                    {
                                                        size: MOCK_PROJECT_MATRIX_FILE_0.size,
                                                        url: MOCK_PROJECT_MATRIX_FILE_0.url,
                                                        name: MOCK_PROJECT_MATRIX_FILE_0.name,
                                                    },
                                                ],
                                            [LibraryConstructionApproach.SMART_SEQ2]:
                                                [
                                                    {
                                                        size: MOCK_PROJECT_MATRIX_FILE_1.size,
                                                        url: MOCK_PROJECT_MATRIX_FILE_1.url,
                                                        name: MOCK_PROJECT_MATRIX_FILE_1.name,
                                                    },
                                                ],
                                        },
                                    },
                                    "lymph node": {
                                        libraryConstructionApproach: {
                                            [LibraryConstructionApproach.TENX_V2]:
                                                [
                                                    {
                                                        size: MOCK_PROJECT_MATRIX_FILE_0.size,
                                                        url: MOCK_PROJECT_MATRIX_FILE_0.url,
                                                        name: MOCK_PROJECT_MATRIX_FILE_0.name,
                                                    },
                                                    {
                                                        size: MOCK_PROJECT_MATRIX_FILE_1.size,
                                                        url: MOCK_PROJECT_MATRIX_FILE_1.url,
                                                        name: MOCK_PROJECT_MATRIX_FILE_1.name,
                                                    },
                                                ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            matrices: {
                genusSpecies: {
                    "Mus musculus": {
                        organ: {
                            heart: {
                                libraryConstructionApproach: {
                                    "10X 3' v2 sequencing": {
                                        developmentStage: {
                                            "Theiler stage 21": [
                                                {
                                                    size: 3914763654,
                                                    matrixCellCount: null,
                                                    name: "pitx2-developing-mouse-heart-10XV2.loom",
                                                    fileSource:
                                                        "DCP/2 Analysis",
                                                    uuid: "5a606536-cd39-5269-b837-d17a9036d87c",
                                                    version:
                                                        "2021-02-17T00:12:58.000000Z",
                                                    url: "https://service.azul.data.humancellatlas.org/repository/files/5a606536-cd39-5269-b837-d17a9036d87c?catalog=dcp7&version=2021-02-17T00%3A12%3A58.000000Z",
                                                },
                                            ],
                                            "Theiler stage 17": [
                                                {
                                                    size: 3914763654,
                                                    matrixCellCount: null,
                                                    name: "pitx2-developing-mouse-heart-10XV2.loom",
                                                    fileSource:
                                                        "DCP/2 Analysis",
                                                    uuid: "5a606536-cd39-5269-b837-d17a9036d87c",
                                                    version:
                                                        "2021-02-17T00:12:58.000000Z",
                                                    url: "https://service.azul.data.humancellatlas.org/repository/files/5a606536-cd39-5269-b837-d17a9036d87c?catalog=dcp7&version=2021-02-17T00%3A12%3A58.000000Z",
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    ],
    samples: [
        {
            sampleEntityType: ["specimens"],
            id: ["420508_specimen"],
            organ: ["brain"],
            organPart: ["x"],
            disease: ["normal"],
            modelOrgan: ["foo"],
            preservationMethod: ["fresh"],
            source: ["specimen_from_organism"],
        },
    ],
    specimens: [
        {
            id: ["420508_specimen"],
            organ: ["brain"],
            organPart: ["x"],
            disease: ["x"],
            preservationMethod: ["fresh"],
            source: ["specimen_from_organism"],
        },
    ],
    cellLines: [],
    donorOrganisms: [
        {
            biologicalSex: ["male"],
            developmentStage: ["adult"],
            disease: ["x"],
            donorCount: 15,
            genusSpecies: ["Mus musculus"],
            id: ["420508"],
            organismAge: [
                {
                    value: "56",
                    unit: "year",
                },
            ],
        },
    ],
    organoids: [],
    cellSuspensions: [
        {
            organ: ["Brain"],
            organPart: ["cortex"],
            selectedCellType: ["neuron"],
            totalCells: 1330000,
        },
    ],
    fileTypeSummaries: [
        {
            contentDescription: ["Count Matrix"],
            count: 2,
            format: "loom",
            isIntermediate: true,
            totalSize: 17837811,
        },
        {
            count: 2,
            format: "contributor.matrix",
            totalSize: 17837811,
        },
        {
            count: 1,
            format: "dcp.matrix",
            totalSize: 17837811,
        },
        {
            format: "fastq",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "unknown",
            count: 5,
            totalSize: 7529700,
        },
        {
            format: "bam",
            count: 1,
            totalSize: 22403106,
        },
        {
            format: "bai",
            count: 1,
            totalSize: 22403106,
        },
        {
            format: "matrix",
            count: 1,
            totalSize: 148,
        },
        {
            format: "csv",
            count: 1,
            totalSize: 637725,
        },
    ],
};

// Example of project with multiple values within single objects
export const PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT = {
    protocols: [
        {
            libraryConstructionApproach: ["10x_v2", "x"],
            nucleicAcidSource: ["single cell", "single nucleus"],
            instrumentManufacturerModel: ["Illumina HiSeq 4000", "x"],
            pairedEnd: [false, true],
            workflow: ["optimus_v1.1.0", "optimus_v1.2.0"],
            assayType: ["in situ sequencing", "x"],
        },
    ],
    entryId: "ae5237b4-633f-403a-afc6-cb87e6f90db1",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: ["1 FOV BaristaSeq mouse SpaceTx dataset", "x"],
            projectShortname: ["barista_seq", "x"],
            laboratory: [],
            accessions: [
                {
                    namespace: "array_express",
                    accession: "123",
                },
                {
                    namespace: "array_express",
                    accession: "456",
                },
            ],
            supplementaryLinks: [
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz",
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz",
            ],
        },
    ],
    samples: [
        {
            sampleEntityType: ["specimens", "x"],
            id: ["420508_specimen", "x"],
            organ: ["brain", "blood"],
            organPart: ["x", "y"],
            modelOrgan: ["foo", "bar"],
            disease: ["normal", "H syndrome"],
            preservationMethod: ["fresh", "x"],
            source: ["specimen_from_organism", "x"],
        },
    ],
    specimens: [
        {
            id: ["420508_specimen", "x"],
            organ: ["brain", "x"],
            organPart: ["x", "y"],
            disease: ["x", "y"],
            preservationMethod: ["fresh", "x"],
            source: ["specimen_from_organism", "x"],
        },
    ],
    cellLines: [],
    donorOrganisms: [
        {
            biologicalSex: ["male", "female"],
            developmentStage: ["adult", "human adult stage"],
            disease: ["H syndrome", "normal"],
            donorCount: 12,
            genusSpecies: ["Mus musculus", "Homo sapiens"],
            id: ["420508", "123456"],
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
        },
    ],
    organoids: [],
    cellSuspensions: [
        {
            organ: ["Brain"],
            organPart: ["cortex", "ventricular zone", "hippocampus"],
            selectedCellType: ["neuron", "neuron"],
            totalCells: 1330000,
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "unknown",
            count: 5,
            totalSize: 7529700,
        },
        {
            format: "bam",
            count: 1,
            totalSize: 22403106,
        },
        {
            format: "matrix",
            count: 1,
            totalSize: 148,
        },
        {
            format: "csv",
            count: 1,
            totalSize: 637725,
        },
    ],
};

// Example of project with single and multiple values across multiple objects
export const PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS = {
    protocols: [
        {
            libraryConstructionApproach: ["10x_v2"],
            nucleicAcidSource: ["single cell"],
            instrumentManufacturerModel: ["Illumina HiSeq 4000"],
            pairedEnd: [false],
            workflow: ["optimus_v1.2.0"],
            assayType: ["in situ sequencing"],
        },
        {
            libraryConstructionApproach: ["x", "y"],
            nucleicAcidSource: ["single nucleus"],
            instrumentManufacturerModel: ["x", "y"],
            pairedEnd: [true],
            workflow: ["smartseq2_v2.4.0", "optimus_v1.0.0"],
            assayType: ["x", "y"],
        },
    ],
    entryId: "ae5237b4-633f-403a-afc6-cb87e6f90db1",
    projects: [
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7f",
            projectTitle: "1 FOV BaristaSeq mouse SpaceTx dataset",
            projectShortname: "barista_seq",
            laboratory: ["a"],
            accessions: [
                {
                    namespace: "array_express",
                    accession: "123",
                },
            ],
            supplementaryLinks: [
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz",
            ],
        },
        {
            projectId: "8c3c290d-dfff-4553-8868-54ce45f4ba7a",
            projectTitle: ["x", "y"],
            projectShortname: ["x", "y"],
            laboratory: ["x", "y"],
            accessions: [
                {
                    namespace: "array_express",
                    accession: "123",
                },
            ],
            supplementaryLinks: [
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz",
                "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz",
            ],
        },
    ],
    samples: [
        {
            sampleEntityType: ["specimens"],
            id: ["420508_specimen"],
            organ: ["brain", "blood"],
            organPart: ["a"],
            modelOrgan: ["foo"],
            disease: ["normal", "H syndrome"],
            preservationMethod: ["fresh"],
            source: ["specimen_from_organism"],
        },
        {
            sampleEntityType: ["x", "y"],
            id: ["x", "y"],
            organ: ["x", "y"],
            organPart: ["x", "y"],
            modelOrgan: ["bar"],
            disease: ["x", "y"],
            preservationMethod: ["x", "y"],
            source: ["x", "y"],
        },
    ],
    specimens: [
        {
            id: ["420508_specimen"],
            organ: ["brain", "blood"],
            organPart: ["a"],
            disease: ["x", "y"],
            preservationMethod: ["fresh"],
            source: ["specimen_from_organism"],
        },
    ],
    cellLines: [],
    donorOrganisms: [
        {
            biologicalSex: ["male"],
            disease: ["normal"],
            developmentStage: ["adult"],
            donorCount: 8,
            genusSpecies: ["Mus musculus"],
            id: ["420508"],
            organismAge: [
                {
                    value: "56",
                    unit: "year",
                },
            ],
        },
        {
            biologicalSex: ["x", "y"],
            developmentStage: ["human adult stage"],
            disease: ["x", "y"],
            donorCount: 3,
            genusSpecies: ["x", "y"],
            id: ["x", "y"],
            organismAge: [
                {
                    value: "60",
                    unit: "year",
                },
            ],
        },
    ],
    organoids: [],
    cellSuspensions: [
        {
            organ: ["Brain"],
            organPart: ["cortex", "ventricular zone", "hippocampus"],
            selectedCellType: ["neuron", "neuron"],
            totalCells: 1330000,
        },
        {
            organ: ["x", "y"],
            organPart: ["x", "y"],
            selectedCellType: ["x", "y"],
            totalCells: 1330000,
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: 3,
            totalSize: 17837811,
        },
        {
            format: "unknown",
            count: 5,
            totalSize: 7529700,
        },
        {
            format: "bam",
            count: 1,
            totalSize: 22403106,
        },
        {
            format: "matrix",
            count: 1,
            totalSize: 148,
        },
        {
            format: "csv",
            count: 1,
            totalSize: 637725,
        },
    ],
};

// Example of project with empty array values
export const PROJECT_ROW_EMPTY_ARRAY_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: [],
            nucleicAcidSource: [],
            instrumentManufacturerModel: [],
            pairedEnd: [],
            workflow: [],
            assayType: [],
        },
    ],
    entryId: "46c58e08-4518-4e45-acfe-bdab2434975d",
    projects: [
        {
            projectId: "",
            projectTitle: [],
            projectShortname: [],
            accessions: [],
            laboratory: [],
            arrayExpressAccessions: [],
            geoSeriesAccessions: [],
            insdcProjectAccessions: [],
            insdcStudyAccessions: [],
            supplementaryLinks: [],
        },
    ],
    samples: [
        {
            sampleEntityType: [],
            id: [],
            organ: [],
            organPart: [],
            modelOrgan: [],
            disease: [],
            preservationMethod: [],
            source: [],
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
            biologicalSex: [],
            developmentStage: [],
            disease: [],
            genusSpecies: [],
            donorCount: 1,
            id: [],
            organismAge: [],
        },
    ],
    organoids: [],
    cellSuspensions: [],
    fileTypeSummaries: [],
};

// Example of project with top level null values
export const PROJECT_ROW_NULL_TOP_LEVEL_VALUES = {
    protocols: null,
    entryId: "46c58e08-4518-4e45-acfe-bdab2434975d",
    projects: null,
    samples: null,
    specimens: null,
    cellLines: null,
    donorOrganisms: null,
    organoids: null,
    cellSuspensions: null,
    fileTypeSummaries: null,
};

// Example of project with null values
export const PROJECT_ROW_NULL_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: null,
            nucleicAcidSource: null,
            instrumentManufacturerModel: null,
            pairedEnd: null,
            workflow: null,
            assayType: null,
        },
    ],
    entryId: "46c58e08-4518-4e45-acfe-bdab2434975d",
    projects: [
        {
            projectId: null,
            projectTitle: null,
            projectShortname: null,
            accessions: null,
            laboratory: null,
            arrayExpressAccessions: null,
            geoSeriesAccessions: null,
            insdcProjectAccessions: null,
            insdcStudyAccessions: null,
            supplementaryLinks: null,
        },
    ],
    samples: [
        {
            sampleEntityType: null,
            id: null,
            organ: null,
            organPart: null,
            modelOrgan: null,
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
    cellLines: [null],
    donorOrganisms: [
        {
            biologicalSex: null,
            developmentStage: null,
            disease: null,
            donorCount: null,
            genusSpecies: null,
            id: null,
            organismAge: null,
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
            contentDescription: ["Count Matrix"],
            count: null,
            format: "loom",
            isIntermediate: true,
            totalSize: null,
        },
        {
            format: "fastq",
            count: null,
            totalSize: null,
        },
        {
            format: "fastq.gz",
            count: null,
            totalSize: null,
        },
        {
            format: "unknown",
            count: null,
            totalSize: null,
        },
        {
            format: "bam",
            count: null,
            totalSize: null,
        },
        {
            format: "bai",
            count: null,
            totalSize: null,
        },
        {
            format: "matrix",
            count: null,
            totalSize: null,
        },
        {
            format: "csv",
            count: null,
            totalSize: null,
        },
    ],
};

// Example of project with null array values
export const PROJECT_ROW_NULL_ARRAY_VALUES = {
    protocols: [
        {
            libraryConstructionApproach: [null],
            nucleicAcidSource: [null],
            instrumentManufacturerModel: [null],
            pairedEnd: [null],
            workflow: [null],
            assayType: [null],
        },
    ],
    entryId: "46c58e08-4518-4e45-acfe-bdab2434975d",
    projects: [
        {
            projectId: [null],
            projectTitle: [null],
            projectShortname: [null],
            accessions: [null],
            laboratory: [null],
            arrayExpressAccessions: [null],
            geoSeriesAccessions: [null],
            insdcProjectAccessions: [null],
            insdcStudyAccessions: [null],
            supplementaryLinks: [null],
        },
    ],
    samples: [
        {
            sampleEntityType: [null],
            id: [null],
            organ: [null],
            organPart: [null],
            modelOrgan: [null],
            disease: [null],
            preservationMethod: [null],
            source: [null],
        },
    ],
    specimens: [
        {
            id: [null],
            organ: [null],
            organPart: [null],
            disease: [null],
            preservationMethod: [null],
            source: [null],
        },
    ],
    cellLines: [[null]],
    donorOrganisms: [
        {
            biologicalSex: [null],
            developmentStage: [null],
            disease: [null],
            donorCount: [null],
            genusSpecies: [null],
            id: [null],
            organismAge: [null],
        },
    ],
    organoids: [null],
    cellSuspensions: [
        {
            organ: [null],
            organPart: [null],
            selectedCellType: [null],
            totalCells: [null],
        },
    ],
    fileTypeSummaries: [
        {
            format: "fastq.gz",
            count: [null],
            totalSize: [null],
        },
        {
            format: "unknown",
            count: [null],
            totalSize: [null],
        },
        {
            format: "bam",
            count: [null],
            totalSize: [null],
        },
        {
            format: "matrix",
            count: [null],
            totalSize: [null],
        },
        {
            format: "csv",
            count: [null],
            totalSize: [null],
        },
    ],
};
