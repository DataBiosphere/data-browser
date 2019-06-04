/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of models saved in the table models value of the table state.
 */

// App dependencies
import { TableModel } from "../table/table.model";
import { PaginationModel } from "../table/pagination.model";
import { EntityName } from "./entity-name.model";

// Files data, based on first page of results
const FILES_DATA = [
    {
        // Example of file with single values (eg disease, genusSpecies)
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
                    "smartseq2"
                ],
                "workflowVersion": [
                    "v2.3.0"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectTitle": [
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types."
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation."
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Molecular Atlas"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines"
                ],
                "id": [
                    "cell_line_at_day_26"
                ],
                "disease": [
                    "normal"
                ],
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A"
                ],
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A",
                    "cell_line_at_day_26"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A"
                ],
                "genusSpecies": [
                    "Homo sapiens"
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
                "disease": null
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "selectedCellType": [
                    "inhibitory interneuron"
                ],
                "totalCells": 100
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    },
    // Example of file with multiple values (eg disease, genusSpecies)
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2",
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true,
                    false
                ],
                "workflow": [
                    "smartseq2"
                ],
                "workflowVersion": [
                    "v2.3.0"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectTitle": [
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types.",
                    "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types."
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation."
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Molecular Atlas"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines",
                    "cellLines"
                ],
                "id": [
                    "cell_line_at_day_26"
                ],
                "disease": [
                    "normal",
                    "normal"
                ],
                "organ": [
                    "embryo",
                    "embryo"
                ],
                "organPart": [
                    "blastocyst",
                    "blastocyst"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A",
                    "embryo_WAe001-A"
                ],
                "organ": [
                    "embryo",
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A",
                    "cell_line_at_day_26"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A"
                ],
                "genusSpecies": [
                    "Homo sapiens",
                    "Homo sapiens"
                ],
                "organismAge": [
                    "0-10",
                    "56"
                ],
                "organismAgeUnit": [
                    "day",
                    "week"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "selectedCellType": [
                    "inhibitory interneuron",
                    "inhibitory interneuron"
                ],
                "totalCells": 0
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    },
    // Example of file with null values (eg disease, genusSpecies)
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                ],
                "workflow": [
                    "smartseq2"
                ],
                "workflowVersion": [
                    "v2.3.0"
                ]
            }
        ],
        "entryId": "ee6a75bd-3252-41ee-b253-425bbd377f0c",
        "projects": [
            {
                "projectTitle": [
                ],
                "projectShortname": [
                    "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation."
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Molecular Atlas"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                ],
                "id": [
                    "cell_line_at_day_26"
                ],
                "disease": null,
                "organ": null,
                "organPart":null
            }
        ],
        "specimens": [
            {
                "id": [
                    "embryo_WAe001-A"
                ],
                "organ": [
                ],
                "organPart": [
                    "blastocyst"
                ],
                "disease": [
                    "normal"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [
            {
                "id": [
                    "cell_line_WAe001-A",
                    "cell_line_at_day_26"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_WAe001-A"
                ],
                "genusSpecies": [
                ],
                "organismAge": [
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": null,
                "disease": null
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "embryo"
                ],
                "organPart": [
                    "blastocyst"
                ],
                "selectedCellType": [
                ],
                "totalCells": null
            }
        ],
        "bundles": [
            {
                "bundleUuid": "e42b77f3-112a-47a8-a47b-0afa56c99585",
                "bundleVersion": "2019-05-15T232146.052000Z"
            }
        ],
        "files": [
            {
                "format": "matrix",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183.zarr!.zattrs",
                "sha256": "6f77cee1bd32665812a42640bf94a33f9e940298df8e20c4c76717c8d07a2613",
                "size": 148,
                "uuid": "86f5c1f3-7575-42cf-863c-ced4c2f4e475",
                "version": "2019-05-16T020707.744487Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/86f5c1f3-7575-42cf-863c-ced4c2f4e475?version=2019-05-16T020707.744487Z&replica=aws"
            }
        ]
    }
];

// Basic file pagination model, based on first page of project results
const DEFAULT_FILES_PAGINATION_MODEL = {
    "count": 15,
    "total": 528685,
    "size": 15,
    "search_after": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.rna_metrics.txt",
    "search_after_uid": "doc#596cf010-aee4-4141-b81a-ca1ade3c4a77",
    "search_before": null,
    "search_before_uid": null,
    "sort": "fileName",
    "order": "asc",
    "current_page": 1
} as PaginationModel;

// Projects data
const PROJECTS_DATA = [
    // Example of project with single values (eg disease, genusSpecies)
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
                "workflow": [],
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
                "laboratory": [],
                "arrayExpressAccessions": [],
                "geoSeriesAccessions": [],
                "insdcProjectAccessions": [],
                "insdcStudyAccessions": []
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
                "organPart": [],
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
                    "day"
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
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 0,
            "organTypes": [
                "brain"
            ],
            "cellCountSummaries": [],
            "genusSpecies": [
                "Mus musculus"
            ],
            "libraryConstructionApproach": [
                "10x_v2"
            ],
            "disease": []
        }
    },
    // Example of project with multiple values (eg disease, genusSpecies)
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
                    true
                ],
                "workflow": [],
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
                "laboratory": [],
                "arrayExpressAccessions": [],
                "geoSeriesAccessions": [],
                "insdcProjectAccessions": [],
                "insdcStudyAccessions": []
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens",
                    "specimens"
                ],
                "id": [
                    "420508_specimen"
                ],
                "organ": [
                    "brain",
                    "blood"
                ],
                "organPart": [],
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
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 0,
            "organTypes": [
                "brain"
            ],
            "cellCountSummaries": [],
            "genusSpecies": [
                "Mus musculus"
            ],
            "libraryConstructionApproach": [],
            "disease": []
        }
    },
    // Example of project with null or empty values (eg project title, disease)
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
                "projectTitle": null,
                "projectShortname": null,
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ],
                "arrayExpressAccessions": [],
                "geoSeriesAccessions": [],
                "insdcProjectAccessions": [],
                "insdcStudyAccessions": []
            }
        ],
        "samples": [
            {
                "sampleEntityType": [],
                "id": [
                    "E18_20161004_Hippocampus",
                    "E18_20160930_Ventricular_Zone",
                    "E18_20161004_Ventricular_Zone",
                    "E18_20160930_Hippocampus",
                    "E18_20160930_Cortex",
                    "E18_20161004_Cortex"
                ],
                "organ": [],
                "organPart": [
                    "cortex",
                    "ventricular zone",
                    "hippocampus"
                ],
                "disease": [],
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
                    "E18_20161004_Hippocampus",
                    "E18_20160930_Ventricular_Zone",
                    "E18_20161004_Ventricular_Zone",
                    "E18_20160930_Hippocampus",
                    "E18_20160930_Cortex",
                    "E18_20161004_Cortex"
                ],
                "organ": [
                    "Brain"
                ],
                "organPart": [
                    "cortex",
                    "ventricular zone",
                    "hippocampus"
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
        "cellLines": [],
        "donorOrganisms": [
            {
                "id": [
                    "E18_20160930",
                    "E18_20161004"
                ],
                "genusSpecies": [],
                "organismAge": [
                    "18"
                ],
                "organismAgeUnit": [],
                "biologicalSex": [
                    "unknown"
                ],
                "disease": null
            }
        ],
        "organoids": [],
        "cellSuspensions": [],
        "fileTypeSummaries": [],
        "projectSummary": {
            "donorCount": null,
            "totalCellCount": 1330000,
            "organTypes": [
                "Brain"
            ],
            "cellCountSummaries": [
                {
                    "organType": [
                        "Brain"
                    ],
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 1330000
                }
            ],
            "genusSpecies": [
                "Mus musculus"
            ],
            "libraryConstructionApproach": [],
            "disease": [
                "normal"
            ]
        }
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
} as PaginationModel;

// Sample data, based on first page of results
const SAMPLES_DATA = [
    // Example of samples with single values
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
                "workflow": [],
                "assayType": []
            }
        ],
        "entryId": "22e63f47-fd63-42f4-a229-70cdaaed01f2",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Sarah Teichmann",
                    "MRC Cancer Unit"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [],
                "disease": [
                    "normal"
                ],
                "preservationMethod": null,
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
                "organPart": [],
                "disease": [],
                "preservationMethod": [
                    null
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
                    "normal"
                ]
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [],
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
    // Example of project with multiple values (eg disease, genusSpecies)
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "Smart-seq2",
                    "Smart-seq2"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true,
                    false
                ],
                "workflow": [],
                "assayType": []
            }
        ],
        "entryId": "22e63f47-fd63-42f4-a229-70cdaaed01f2",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells",
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Sarah Teichmann",
                    "MRC Cancer Unit"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens",
                    "specimens"
                ],
                "id": "1104_LN",
                "organ": [
                    "lymph node",
                    "blood"
                ],
                "organPart": [],
                "disease": [
                    "normal",
                    "normal"
                ],
                "preservationMethod": null,
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
                "organPart": [],
                "disease": [],
                "preservationMethod": [
                    null
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
                    "1104"
                ],
                "genusSpecies": [
                    "Mus musculus",
                    "Mus musculus"
                ],
                "organismAge": [
                    "6-12",
                    "20-40"
                ],
                "organismAgeUnit": [
                    "day",
                    "week"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": [
                    "normal",
                    "normal"
                ]
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [],
                "selectedCellType": [
                    "CD4+ T cell",
                    "CD4+ T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 8206104986
            }
        ]
    },
    // Example of sample with null or empty values (eg project title, disease)
    {
        "protocols": [
            {
                "libraryConstructionApproach": [],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [],
                "workflow": [],
                "assayType": []
            }
        ],
        "entryId": "22e63f47-fd63-42f4-a229-70cdaaed01f2",
        "projects": [
            {
                "projectTitle": [],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Sarah Teichmann",
                    "MRC Cancer Unit"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": null,
                "id": [
                    "1104_LN",
                    "2104_LN"
                ],
                "organ": null,
                "organPart": [],
                "disease": [],
                "preservationMethod": null,
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
                "organPart": [],
                "disease": [],
                "preservationMethod": [
                    null
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
                    "1104"
                ],
                "genusSpecies": [],
                "organismAge": [],
                "organismAgeUnit": [],
                "biologicalSex": [],
                "disease": null
            }
        ],
        "organoids": [],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [],
                "selectedCellType": [],
                "totalCells": null
            }
        ],
        "fileTypeSummaries": []
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
 * Model of file table model that is saved in store.
 */
export const FILES_TABLE_MODEL = {
    pagination: DEFAULT_FILES_PAGINATION_MODEL,
    data: FILES_DATA,
    loading: false,
    tableName: EntityName.FILES,
    termCountsByFacetName: new Map()
} as TableModel;

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
