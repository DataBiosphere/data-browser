/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of samples-specific model saved in the table models value of the table state.
 */

// App dependencies
import { TableModel } from "../table/table.model";
import { PaginationModel } from "../table/pagination.model";
import { EntityName } from "../shared/entity-name.model";

// Sample data, based on first page of results
const SAMPLES_DATA = [
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "a"
                ],
                "workflowVersion": [
                    "a"
                ]
            }
        ],
        "entryId": "e7cca2dc-ca90-4722-884a-6afa3211a1da",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "disease": [
                    "a"
                ],
                "preservationMethod": [
                    "a"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            "a"
        ],
        "donorOrganisms": [
            {
                "id": [
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12"
                ],
                "organismAgeUnit": [
                    "week"
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": [
                    "a"
                ]
            }
        ],
        "organoids": [
            "a"
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [
                    "a"
                ],
                "selectedCellType": [
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            },
            {
                "fileType": "unknown",
                "count": 30,
                "totalSize": 636842097
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 56575551018
            },
            {
                "fileType": "matrix",
                "count": 6,
                "totalSize": 888
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 151039275
            }
        ]
    }
];

// Basic samples pagination model, based on first page of project results
const DEFAULT_SAMPLES_PAGINATION_MODEL = {
    "count": 15,
    "total": 670,
    "size": 15,
    "search_after": "1110_T",
    "search_after_uid": "doc#cc4e57cc-2f41-49f5-9ddd-526a96d555c0",
    "search_before": null,
    "search_before_uid": null,
    "sort": "sampleId",
    "order": "asc",
    "current_page": 1
} as PaginationModel;

/**
 * Model of sample table model that is saved in store.
 */
export const SAMPLES_TABLE_MODEL = {
    pagination: DEFAULT_SAMPLES_PAGINATION_MODEL,
    data: SAMPLES_DATA,
    loading: false,
    tableName: EntityName.SAMPLES,
    termCountsByFacetName: new Map()
} as TableModel;
