/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of projects-specific model saved in the table models value of the table state.
 */

// App dependencies
import { TableModel } from "../table/table.model";
import { Pagination } from "../table/pagination/pagination.model";
import { EntityName } from "../shared/entity-name.model";
import {
    PROJECT_ROW_EMPTY_ARRAY_VALUES, PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT, PROJECT_ROW_NULL_TOP_LEVEL_VALUES,
    PROJECT_ROW_NULL_VALUES,
    PROJECT_ROW_SINGLE_VALUES,
    PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "./project-row-mapper.mock";

// Projects data
const PROJECTS_DATA = [
    PROJECT_ROW_SINGLE_VALUES,
    PROJECT_ROW_MULTIPLE_VALUES_SINGLE_OBJECT,
    PROJECT_ROW_VALUES_ACROSS_MULTIPLE_OBJECTS,
    PROJECT_ROW_EMPTY_ARRAY_VALUES,
    PROJECT_ROW_NULL_TOP_LEVEL_VALUES,
    PROJECT_ROW_NULL_VALUES,
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
                    "x"
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
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "x"
                ],
                "donorCount": 1,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day"
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
    },
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
                    "x"
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
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "x"
                ],
                "donorCount": 12,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day"
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
    },
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
                    "x"
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
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "x"
                ],
                "donorCount": 13,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day"
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
    },
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
                    "x"
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
                "biologicalSex": [
                    "male"
                ],
                "disease": [
                    "x"
                ],
                "donorCount": 10,
                "genusSpecies": [
                    "Mus musculus"
                ],
                "id": [
                    "420508"
                ],
                "organismAge": [
                    "56"
                ],
                "organismAgeUnit": [
                    "day"
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
    }
];

// Basic project pagination model, based on first page of project results
const DEFAULT_PROJECTS_PAGINATION_MODEL = {
    "count": 15,
    "total": 28,
    "size": 15,
    "search_after": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
    "search_after_uid": "doc#0ec2b05f-ddbe-4e5a-b30f-e81f4b1e330c",
    "search_before": null,
    "search_before_uid": null,
    "sort": "projectTitle",
    "order": "asc",
    "current_page": 1
} as Pagination;

/**
 * Model of project table model that is saved in store.
 */
export const PROJECTS_TABLE_MODEL = {
    pagination: DEFAULT_PROJECTS_PAGINATION_MODEL,
    data: PROJECTS_DATA,
    loading: false,
    tableName: EntityName.PROJECTS,
    termCountsByFacetName: new Map()
} as TableModel;
