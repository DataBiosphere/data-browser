/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of files-specific model saved in the table models value of the table state.
 */

// App dependencies
import { EntityName } from "../shared/entity-name.model";
import { TableModel } from "../table/table.model";
import { Pagination } from "../table/pagination/pagination.model";
import {
    FILE_EMPTY_ARRAY_VALUES,
    FILE_MULTIPLE_VALUES_SINGLE_OBJECT, FILE_NULL_TOP_LEVEL_VALUES, FILE_NULL_VALUES, FILE_SINGLE_VALUES,
    FILE_VALUES_ACROSS_MULTIPLE_OBJECTS
} from "./file-row-mapper.mock";

// File data
const FILES_DATA = [
    FILE_SINGLE_VALUES,
    FILE_MULTIPLE_VALUES_SINGLE_OBJECT,
    FILE_VALUES_ACROSS_MULTIPLE_OBJECTS,
    FILE_EMPTY_ARRAY_VALUES,
    FILE_NULL_VALUES,
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
                    "cell_line_WAe001-A"
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
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
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
                    "cell_line_WAe001-A"
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
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
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
                    "cell_line_WAe001-A"
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
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
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
                    "cell_line_WAe001-A"
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
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
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
                    "cell_line_WAe001-A"
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
                    {
                        "value": "56",
                        "unit": "year"
                    }
                ],
                "biologicalSex": [
                    "male"
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
} as Pagination;

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
