import { LibraryConstructionApproach } from "../shared/library-construction-approach.model";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of projects with various values, to be exercised by the project row mapper spec.
 */

// Example of matrix files
export const MOCK_PROJECT_MATRIX_FILE_0 = {
    "name": "123.loom",
    "url": "http://path/to/file0?version=0&catalog=dcp2ebi"
};
export const MOCK_PROJECT_MATRIX_FILE_1 = {
    "name": "456.loom",
    "url": "http://path/to/file1?version=0&catalog=dcp2ebi"
};

// Example of project with single values (eg disease, genusSpecies)
export const PROJECT_ROW_SINGLE_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10x_v2"
                ],
                "nucleicAcidSource": [
                    "single cell"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [
                    "optimus_v1.1.0"
                ],
                "assayType": [
                    "in situ sequencing"
                ]
            }
        ],
        "entryId": "ae5237b4-633f-403a-afc6-cb87e6f90db1",
        "projects": [
            {
                "projectTitle": "1 FOV BaristaSeq mouse SpaceTx dataset",
                "projectShortname": "barista_seq",
                "laboratory": [
                    "x"
                ],
                "arrayExpressAccessions": [
                    "x"
                ],
                "geoSeriesAccessions": [
                    "x"
                ],
                "insdcProjectAccessions": [
                    "x"
                ],
                "insdcStudyAccessions": [
                    "x"
                ],
                "supplementaryLinks": [
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz"
                ],
                "contributorMatrices": {
                    "genusSpecies": {
                        "Homo sapiens": {
                            "stage": {
                                "adult": {
                                    "organ": {
                                        "large intestine": {
                                            "libraryConstructionApproach": {
                                                [LibraryConstructionApproach.TENX_V2]: [
                                                    {
                                                        "url": MOCK_PROJECT_MATRIX_FILE_0.url,
                                                        "name": MOCK_PROJECT_MATRIX_FILE_0.name
                                                    }
                                                ],
                                                [LibraryConstructionApproach.SMART_SEQ2]: [{
                                                        "url": MOCK_PROJECT_MATRIX_FILE_1.url,
                                                        "name": MOCK_PROJECT_MATRIX_FILE_1.name
                                                    }
                                                ]
                                            }
                                        },
                                        "lymph node": {
                                            "libraryConstructionApproach": {
                                                [LibraryConstructionApproach.TENX_V2]: [
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
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "420508_specimen"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "x"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    "fresh"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "420508_specimen"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "x"
                ],
                "disease": [
                    "x"
                ],
                "preservationMethod": [
                    "fresh"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [],
        "donorOrganisms": [
            {
                "biologicalSex": [
                    "male"
                ],
                "developmentStage": [
                    "adult"
                ],
                "disease": [
                    "x"
                ],
                "donorCount": 15,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [{
                    "value": "56",
                    "unit": "year"
                }]
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "Brain"
                ],
                "organPart": [
                    "cortex"
                ],
                "selectedCellType": [
                    "neuron"
                ],
                "totalCells": 1330000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "unknown",
                "count": 5,
                "totalSize": 7529700
            },
            {
                "fileType": "bam",
                "count": 1,
                "totalSize": 22403106
            },
            {
                "fileType": "matrix",
                "count": 1,
                "totalSize": 148
            },
            {
                "fileType": "csv",
                "count": 1,
                "totalSize": 637725
            }
        ]
    };

// Example of project with multiple values within single objects
export const PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10x_v2",
                    "x"
                ],
                "nucleicAcidSource": [
                    "single cell",
                    "single nucleus"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000",
                    "x"
                ],
                "pairedEnd": [
                    false,
                    true
                ],
                "workflow": [
                    "optimus_v1.1.0",
                    "optimus_v1.2.0"
                ],
                "assayType": [
                    "in situ sequencing",
                    "x"
                ]
            }
        ],
        "entryId": "ae5237b4-633f-403a-afc6-cb87e6f90db1",
        "projects": [
            {
                "projectTitle": [
                    "1 FOV BaristaSeq mouse SpaceTx dataset",
                    "x"
                ],
                "projectShortname": [
                    "barista_seq",
                    "x"
                ],
                "laboratory": [],
                "arrayExpressAccessions": [
                    "x",
                    "y"
                ],
                "geoSeriesAccessions": [
                    "x",
                    "y"
                ],
                "insdcProjectAccessions": [
                    "x",
                    "y"
                ],
                "insdcStudyAccessions": [
                    "x",
                    "y"
                ],
                "supplementaryLinks": [
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz",
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens",
                    "x"
                ],
                "id": [
                    "420508_specimen",
                    "x"
                ],
                "organ": [
                    "brain",
                    "blood"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "disease": [
                    "normal",
                    "H syndrome"
                ],
                "preservationMethod": [
                    "fresh",
                    "x"
                ],
                "source": [
                    "specimen_from_organism",
                    "x"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "420508_specimen",
                    "x"
                ],
                "organ": [
                    "brain",
                    "x"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "disease": [
                    "x",
                    "y"
                ],
                "preservationMethod": [
                    "fresh",
                    "x"
                ],
                "source": [
                    "specimen_from_organism",
                    "x"
                ]
            }
        ],
        "cellLines": [],
        "donorOrganisms": [
            {
                "biologicalSex": [
                    "male",
                    "female"
                ],
                "developmentStage": [
                    "adult",
                    "human adult stage"
                ],
                "disease": ["H syndrome", "normal"],
                "donorCount": 12,
                "genusSpecies": [
                    "Mus musculus",
                    "Homo sapiens"
                ],
                "id": [
                    "420508",
                    "123456"
                ],
                "organismAge": [{
                    "value": "56",
                    "unit": "year"
                }, {
                    "value": "60",
                    "unit": "year"
                }]
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "Brain"
                ],
                "organPart": [
                    "cortex",
                    "ventricular zone",
                    "hippocampus"
                ],
                "selectedCellType": [
                    "neuron",
                    "neuron"
                ],
                "totalCells": 1330000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "unknown",
                "count": 5,
                "totalSize": 7529700
            },
            {
                "fileType": "bam",
                "count": 1,
                "totalSize": 22403106
            },
            {
                "fileType": "matrix",
                "count": 1,
                "totalSize": 148
            },
            {
                "fileType": "csv",
                "count": 1,
                "totalSize": 637725
            }
        ]
    };

// Example of project with single and multiple values across multiple objects
export const PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10x_v2"
                ],
                "nucleicAcidSource": [
                    "single cell"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000"
                ],
                "pairedEnd": [
                    false,
                ],
                "workflow": [
                    "optimus_v1.2.0"
                ],
                "assayType": [
                    "in situ sequencing"
                ]
            },
            {
                "libraryConstructionApproach": [
                    "x",
                    "y"
                ],
                "nucleicAcidSource": [
                    "single nucleus"
                ],
                "instrumentManufacturerModel": [
                    "x",
                    "y"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "smartseq2_v2.4.0",
                    "optimus_v1.0.0"
                ],
                "assayType": [
                    "x",
                    "y"
                ]
            }
        ],
        "entryId": "ae5237b4-633f-403a-afc6-cb87e6f90db1",
        "projects": [
            {
                "projectTitle": "1 FOV BaristaSeq mouse SpaceTx dataset",
                "projectShortname": "barista_seq",
                "laboratory": [
                    "a"
                ],
                "arrayExpressAccessions": [
                    "a"
                ],
                "geoSeriesAccessions": [
                    "a"
                ],
                "insdcProjectAccessions": [
                    "a"
                ],
                "insdcStudyAccessions": [
                    "a"
                ],
                "supplementaryLinks": [
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz"
                ]
            },
            {
                "projectTitle": [
                    "x",
                    "y"
                ],
                "projectShortname": [
                    "x",
                    "y"
                ],
                "laboratory": [
                    "x",
                    "y"
                ],
                "arrayExpressAccessions": [
                    "x",
                    "y"
                ],
                "geoSeriesAccessions": [
                    "x",
                    "y"
                ],
                "insdcProjectAccessions": [
                    "x",
                    "y"
                ],
                "insdcStudyAccessions": [
                    "x",
                    "y"
                ],
                "supplementaryLinks": [
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Kidney.tar.gz",
                    "ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE109nnn/GSE109774/suppl/GSE109774_Liver.tar.gz"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "420508_specimen"
                ],
                "organ": [
                    "brain",
                    "blood"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "normal",
                    "H syndrome"
                ],
                "preservationMethod": [
                    "fresh"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            },
            {
                "sampleEntityType": [
                    "x",
                    "y"
                ],
                "id": [
                    "x",
                    "y"

                ],
                "organ": [
                    "x",
                    "y"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "disease": [
                    "x",
                    "y"
                ],
                "preservationMethod": [
                    "x",
                    "y"
                ],
                "source": [
                    "x",
                    "y"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "420508_specimen"
                ],
                "organ": [
                    "brain",
                    "blood"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "x",
                    "y"
                ],
                "preservationMethod": [
                    "fresh"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [],
        "donorOrganisms": [
            {
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "normal"
                ],
                "developmentStage": [
                    "adult"
                ],
                "donorCount": 8,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [{
                    "value": "56",
                    "unit": "year"
                }],
            },
            {
                "biologicalSex": [
                    "x",
                    "y"
                ],
                "developmentStage": [
                    "human adult stage"
                ],
                "disease": [
                    "x",
                    "y"
                ],
                "donorCount": 3,
                "genusSpecies": [
                    "x",
                    "y"
                ],
                "id": [
                    "x",
                    "y"
                ],
                "organismAge": [{
                    "value": "60",
                    "unit": "year"
                }]
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "Brain"
                ],
                "organPart": [
                    "cortex",
                    "ventricular zone",
                    "hippocampus"
                ],
                "selectedCellType": [
                    "neuron",
                    "neuron"
                ],
                "totalCells": 1330000
            },
            {
                "organ": [
                    "x",
                    "y"
                ],
                "organPart": [
                    "x",
                    "y"
                ],
                "selectedCellType": [
                    "x",
                    "y"
                ],
                "totalCells": 1330000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "unknown",
                "count": 5,
                "totalSize": 7529700
            },
            {
                "fileType": "bam",
                "count": 1,
                "totalSize": 22403106
            },
            {
                "fileType": "matrix",
                "count": 1,
                "totalSize": 148
            },
            {
                "fileType": "csv",
                "count": 1,
                "totalSize": 637725
            }
        ]
    };

// Example of project with empty array values
export const PROJECT_ROW_EMPTY_ARRAY_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [],
                "nucleicAcidSource": [],
                "instrumentManufacturerModel": [],
                "pairedEnd": [],
                "workflow": [],
                "assayType": []
            }
        ],
        "entryId": "46c58e08-4518-4e45-acfe-bdab2434975d",
        "projects": [
            {
                "projectTitle": [],
                "projectShortname": [],
                "laboratory": [],
                "arrayExpressAccessions": [],
                "geoSeriesAccessions": [],
                "insdcProjectAccessions": [],
                "insdcStudyAccessions": [],
                "supplementaryLinks": []
            }
        ],
        "samples": [
            {
                "sampleEntityType": [],
                "id": [],
                "organ": [],
                "organPart": [],
                "disease": [],
                "preservationMethod": [],
                "source": []
            }
        ],
        "specimens": [
            {
                "id": [],
                "organ": [],
                "organPart": [],
                "disease": [],
                "preservationMethod": [],
                "source": []
            }
        ],
        "cellLines": [],
        "donorOrganisms": [
            {
                "biologicalSex": [],
                "developmentStage": [],
                "disease": [],
                "genusSpecies": [],
                "donorCount": 1,
                "id": [],
                "organismAge": []
            }
        ],
        "organoids": [],
        "cellSuspensions": [],
        "fileTypeSummaries": []
    };

// Example of project with top level null values
export const PROJECT_ROW_NULL_TOP_LEVEL_VALUES =
    {
        "protocols": null,
        "entryId": "46c58e08-4518-4e45-acfe-bdab2434975d",
        "projects": null,
        "samples": null,
        "specimens": null,
        "cellLines": null,
        "donorOrganisms": null,
        "organoids": null,
        "cellSuspensions": null,
        "fileTypeSummaries": null
    };

// Example of project with null values
export const PROJECT_ROW_NULL_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": null,
                "nucleicAcidSource": null,
                "instrumentManufacturerModel": null,
                "pairedEnd": null,
                "workflow": null,
                "assayType": null
            }
        ],
        "entryId": "46c58e08-4518-4e45-acfe-bdab2434975d",
        "projects": [
            {
                "projectTitle": null,
                "projectShortname": null,
                "laboratory": null,
                "arrayExpressAccessions": null,
                "geoSeriesAccessions": null,
                "insdcProjectAccessions": null,
                "insdcStudyAccessions": null,
                "supplementaryLinks": null
            }
        ],
        "samples": [
            {
                "sampleEntityType": null,
                "id": null,
                "organ": null,
                "organPart": null,
                "disease": null,
                "preservationMethod": null,
                "source": null
            }
        ],
        "specimens": [
            {
                "id": null,
                "organ": null,
                "organPart": null,
                "disease": null,
                "preservationMethod": null,
                "source": null
            }
        ],
        "cellLines": [
            null
        ],
        "donorOrganisms": [
            {
                "biologicalSex": null,
                "developmentStage": null,
                "disease": null,
                "donorCount": null,
                "genusSpecies": null,
                "id": null,
                "organismAge": null
            }
        ],
        "organoids": null,
        "cellSuspensions": [
            {
                "organ": null,
                "organPart": null,
                "selectedCellType": null,
                "totalCells": null
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": null,
                "totalSize": null
            },
            {
                "fileType": "unknown",
                "count": null,
                "totalSize": null
            },
            {
                "fileType": "bam",
                "count": null,
                "totalSize": null
            },
            {
                "fileType": "matrix",
                "count": null,
                "totalSize": null
            },
            {
                "fileType": "csv",
                "count": null,
                "totalSize": null
            }
        ]
    };

// Example of project with null array values
export const PROJECT_ROW_NULL_ARRAY_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [null],
                "nucleicAcidSource": [null],
                "instrumentManufacturerModel": [null],
                "pairedEnd": [null],
                "workflow": [null],
                "assayType": [null]
            }
        ],
        "entryId": "46c58e08-4518-4e45-acfe-bdab2434975d",
        "projects": [
            {
                "projectTitle": [null],
                "projectShortname": [null],
                "laboratory": [null],
                "arrayExpressAccessions": [null],
                "geoSeriesAccessions": [null],
                "insdcProjectAccessions": [null],
                "insdcStudyAccessions": [null],
                "supplementaryLinks": [null]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [null],
                "id": [null],
                "organ": [null],
                "organPart": [null],
                "disease": [null],
                "preservationMethod": [null],
                "source": [null]
            }
        ],
        "specimens": [
            {
                "id": [null],
                "organ": [null],
                "organPart": [null],
                "disease": [null],
                "preservationMethod": [null],
                "source": [null]
            }
        ],
        "cellLines": [
            [null]
        ],
        "donorOrganisms": [
            {
                "biologicalSex": [null],
                "developmentStage": [null],
                "disease": [null],
                "donorCount": [null],
                "genusSpecies": [null],
                "id": [null],
                "organismAge": [null]
            }
        ],
        "organoids": [null],
        "cellSuspensions": [
            {
                "organ": [null],
                "organPart": [null],
                "selectedCellType": [null],
                "totalCells": [null]
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": [null],
                "totalSize": [null]
            },
            {
                "fileType": "unknown",
                "count": [null],
                "totalSize": [null]
            },
            {
                "fileType": "bam",
                "count": [null],
                "totalSize": [null]
            },
            {
                "fileType": "matrix",
                "count": [null],
                "totalSize": [null]
            },
            {
                "fileType": "csv",
                "count": [null],
                "totalSize": [null]
            }
        ]
    };
