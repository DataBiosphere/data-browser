/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of projects with various values, to be exercised by the project row mapper spec.
 */

// Example of project with single values (eg disease, genusSpecies)
export const PROJECT_ROW_SINGLE_VALUES =
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10x_v2"
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
                "id": [
                    "420508"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "x"
                ]
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
                "id": [
                    "420508",
                    "123456"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day",
                    "week"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
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
                    "brain"
                ],
                "organPart": [],
                "disease": [],
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
                "id": [
                    "420508"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day",
                    "week"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            },
            {
                "id": [
                    "x",
                    "y"
                ],
                "genusSpecies": [
                    "x",
                    "y"
                ],
                "organismAge": [
                    "x",
                    "y"
                ],
                "organismAgeUnit": [
                    "x",
                    "y"
                ],
                "biologicalSex": [
                    "x",
                    "y"
                ],
                "disease": [
                    "x",
                    "y"
                ]
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
                "insdcStudyAccessions": []
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
                "id": [],
                "genusSpecies": [],
                "organismAge": [],
                "organismAgeUnit": [],
                "biologicalSex": [],
                "disease": []
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
        "entryId": null,
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
                "instrumentManufacturerModel": null,
                "pairedEnd": null,
                "workflow": null,
                "assayType": null
            }
        ],
        "entryId": null,
        "projects": [
            {
                "projectTitle": null,
                "projectShortname": null,
                "laboratory": null,
                "arrayExpressAccessions": null,
                "geoSeriesAccessions": null,
                "insdcProjectAccessions": null,
                "insdcStudyAccessions": null
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
                "id": null,
                "genusSpecies": null,
                "organismAge": null,
                "organismAgeUnit": null,
                "biologicalSex": null,
                "disease": null
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
