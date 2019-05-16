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

// File data, based on first page of results
const FILE_DATA = [
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
        "entryId": "ad6e9053-02f9-47c4-addc-5a8e31960825",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_QCs.csv",
                "sha256": "b102c859b516e92fe619a552bd066e9fc9ebcaae8feab326dd175c06bd306345",
                "size": 8130,
                "uuid": "d73acfa7-cd6f-4398-80de-755a24f818bd",
                "version": "2019-05-16T020702.459513Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/d73acfa7-cd6f-4398-80de-755a24f818bd?version=2019-05-16T020702.459513Z&replica=aws"
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
        "entryId": "3338e086-bc8d-4cc0-ac1f-8be4efbb1289",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_bait_bias_detail_metrics.csv",
                "sha256": "70f88f7c1cad161aa33d8d68dcc8cac3e3f76d1d821c8b8be72febe4c6154700",
                "size": 32752,
                "uuid": "cb91a5a7-4711-40e6-a1e2-696be46447ec",
                "version": "2019-05-16T020702.869822Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/cb91a5a7-4711-40e6-a1e2-696be46447ec?version=2019-05-16T020702.869822Z&replica=aws"
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
        "entryId": "5c8f2c6c-4eab-4524-a60b-85bfac27bd9b",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_base_distribution_by_cycle_metrics.csv",
                "sha256": "fcf78a1c151567d36dc3b30a9ffee6a0ce4ace3d948ac842bb730e277887a7be",
                "size": 8637,
                "uuid": "674a3b79-bc14-4a45-8515-e54d725ff550",
                "version": "2019-05-16T020703.245692Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/674a3b79-bc14-4a45-8515-e54d725ff550?version=2019-05-16T020703.245692Z&replica=aws"
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
        "entryId": "ad01caa0-4611-426a-909d-f3d81e21beac",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_error_summary_metrics.csv",
                "sha256": "f2132a8140480596115ef8b07fb6a26f6088f9af0dbb8ac8afa23982fa71120f",
                "size": 489,
                "uuid": "83f89b2c-7c52-41d7-ae89-f1d294448101",
                "version": "2019-05-16T020703.592181Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/83f89b2c-7c52-41d7-ae89-f1d294448101?version=2019-05-16T020703.592181Z&replica=aws"
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
        "entryId": "7942a028-31d2-4e65-9cb0-fb0e5ccb5469",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_gc_bias.csv",
                "sha256": "364751461bcfc224883da519ab495d7c7b55055ef27c2b825d8a414bd918a41b",
                "size": 9217,
                "uuid": "78952286-87cb-42e4-b7ba-ec564955d4c6",
                "version": "2019-05-16T020703.901159Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/78952286-87cb-42e4-b7ba-ec564955d4c6?version=2019-05-16T020703.901159Z&replica=aws"
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
        "entryId": "216ed181-f544-479b-8782-51244de8a795",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_pre_adapter_detail_metrics.csv",
                "sha256": "8dfe46f496bd1c5f51bccdea9162a62a3a1513cb21e1bf235737ea16b4ebb1ee",
                "size": 29255,
                "uuid": "b5e428e7-8328-4028-be6e-9bf7adbf3e0e",
                "version": "2019-05-16T020704.198685Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/b5e428e7-8328-4028-be6e-9bf7adbf3e0e?version=2019-05-16T020704.198685Z&replica=aws"
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
        "entryId": "c88e79ae-d3f3-446a-b933-8735867e3376",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "csv",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_pre_adapter_summary_metrics.csv",
                "sha256": "b6b935b2869cf5f77db53d7cb19599f81a96cd1a526e88d6021219125c24b031",
                "size": 1896,
                "uuid": "37843afe-16a4-4fff-bbc9-a31ec48b445e",
                "version": "2019-05-16T020704.544008Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/37843afe-16a4-4fff-bbc9-a31ec48b445e?version=2019-05-16T020704.544008Z&replica=aws"
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
        "entryId": "e4e317ef-4ed3-492b-a1d2-4890b9392185",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "txt",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.bait_bias_summary_metrics.txt",
                "sha256": "2907a20fded8ed74d01c015cc465ff81136625fddeb65ed83327e3b267ccb7cb",
                "size": 2709,
                "uuid": "a7963d51-0cfc-4488-8c77-801555a6ff06",
                "version": "2019-05-16T020700.794832Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/a7963d51-0cfc-4488-8c77-801555a6ff06?version=2019-05-16T020700.794832Z&replica=aws"
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
        "entryId": "dbac53bb-d45a-4add-ae20-5296c8929700",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "bam",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.bam",
                "sha256": "643676db712ddfcf18bb089a95d72e4cc549ff8f2df11acc122c68bf4599cd38",
                "size": 140830173,
                "uuid": "fad5f022-fb7c-41b2-b738-2dfffb5f9406",
                "version": "2019-05-16T020704.950185Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/fad5f022-fb7c-41b2-b738-2dfffb5f9406?version=2019-05-16T020704.950185Z&replica=aws"
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
        "entryId": "88c0d56a-3a05-4a7b-905b-7c58ad4d2368",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "bai",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.bam.bai",
                "sha256": "bfb12cd99b4a8e8ae401746fac8e8463143df97feb076121019d269b9078b188",
                "size": 2084952,
                "uuid": "89cf1bbb-fc88-4f79-8c5d-6a75626dbfee",
                "version": "2019-05-16T020705.130038Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/89cf1bbb-fc88-4f79-8c5d-6a75626dbfee?version=2019-05-16T020705.130038Z&replica=aws"
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
        "entryId": "3fb691e2-89c8-4280-a97c-26d697094b09",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "txt",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.insert_size_metrics.txt",
                "sha256": "984530b84c73250c86bb90860ac29e9ca9e1023a41e49d2494fb69d200970b09",
                "size": 8896,
                "uuid": "8b8001ee-7889-405a-987c-cd3dfd38a7c3",
                "version": "2019-05-16T020701.183693Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/8b8001ee-7889-405a-987c-cd3dfd38a7c3?version=2019-05-16T020701.183693Z&replica=aws"
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
        "entryId": "f69260a6-8c0e-4462-8bae-0abc336c8682",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "txt",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.quality_by_cycle_metrics.txt",
                "sha256": "4767120bc52d42f6878aa2cff064036bff3cf6592d6c156a0b4c34ba8607e24e",
                "size": 2514,
                "uuid": "2565d888-f20d-4574-adf7-6d71eab7c4fe",
                "version": "2019-05-16T020701.523437Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/2565d888-f20d-4574-adf7-6d71eab7c4fe?version=2019-05-16T020701.523437Z&replica=aws"
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
        "entryId": "3ee05282-fca3-46a2-bd19-1581c52f39fc",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "txt",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.quality_distribution_metrics.txt",
                "sha256": "1fad172f6672a6c5ebdd443d884f7884432412e7e1c314e613b33b30328766e9",
                "size": 1472,
                "uuid": "d3285986-ebbf-4555-aa6d-2754d2ab4c73",
                "version": "2019-05-16T020701.800700Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/d3285986-ebbf-4555-aa6d-2754d2ab4c73?version=2019-05-16T020701.800700Z&replica=aws"
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
        "entryId": "596cf010-aee4-4141-b81a-ca1ade3c4a77",
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
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

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
                "format": "txt",
                "name": "0000ea22-7033-44a8-88ff-190d8dde0183_qc.rna_metrics.txt",
                "sha256": "d2b92c9a1a2ce297f81e8643f8f4ab6b428d8a3ea9492498b282c8f23e5602b3",
                "size": 3260,
                "uuid": "08577a0e-0f87-4669-a83e-b5edd055700a",
                "version": "2019-05-16T020702.079144Z",
                "url": "https:\/\/service.explore.data.humancellatlas.org\/fetch\/dss\/files\/08577a0e-0f87-4669-a83e-b5edd055700a?version=2019-05-16T020702.079144Z&replica=aws"
            }
        ]
    }
];

// Basic file pagination model, based on first page of project results
const DEFAULT_FILE_PAGINATION_MODEL = {
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

// Project data, based on first page of results
const PROJECT_DATA = [
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "ff481f29-3d0b-4533-9de2-a760c61c162d",
        "projects": [
            {
                "projectTitle": "1.3 Million Brain Cells from E18 Mice",
                "projectShortname": "1M Neurons",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "E18_20160930_Brain",
                    "E18_20161004_Brain"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "cortex"
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
                    "E18_20160930_Brain",
                    "E18_20161004_Brain"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "cortex"
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
        "cellLines": [

        ],
        "donorOrganisms": [
            {
                "id": [
                    "E18_20160930",
                    "E18_20161004"
                ],
                "genusSpecies": [
                    "Mus musculus"
                ],
                "organismAge": [
                    "18"
                ],
                "organismAgeUnit": [
                    "day"
                ],
                "biologicalSex": [
                    "unknown"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
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
                "fileType": "fastq",
                "count": 16377,
                "totalSize": 3206177550920
            }
        ],
        "projectSummary": {
            "donorCount": 2,
            "totalCellCount": 1330000,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 1330000
                }
            ],
            "genusSpecies": [
                "Mus musculus"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "normal"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "e1231ae9-7ed6-414f-9ea5-1f675f119300",
        "projects": [
            {
                "projectTitle": "10x 1 Run Integration Test",
                "projectShortname": "prod\/optimus\/2019-05-08T15:22:18Z",
                "laboratory": [
                    "Department of Biology"
                ],
                "arrayExpressAccessions": [
                    "E-AAAA-00"
                ],
                "geoSeriesAccessions": [
                    "GSE00000"
                ],
                "insdcProjectAccessions": [
                    "SRP000000"
                ],
                "insdcStudyAccessions": [
                    "PRJNA000000"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_ID_1"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "20"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "selectedCellType": [

                ],
                "totalCells": 5000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            }
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 5000,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 5000
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "H syndrome"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "87722d63-b828-4f9e-92e1-a6698d37baf0",
        "projects": [
            {
                "projectTitle": "10x 1 Run Integration Test",
                "projectShortname": "prod\/optimus\/2019-05-07T12:01:17Z",
                "laboratory": [
                    "Department of Biology"
                ],
                "arrayExpressAccessions": [
                    "E-AAAA-00"
                ],
                "geoSeriesAccessions": [
                    "GSE00000"
                ],
                "insdcProjectAccessions": [
                    "SRP000000"
                ],
                "insdcStudyAccessions": [
                    "PRJNA000000"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_ID_1"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "20"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "selectedCellType": [

                ],
                "totalCells": 5000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            }
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 5000,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 5000
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "H syndrome"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [
                    "optimus"
                ],
                "workflowVersion": [
                    "v1.1.0"
                ]
            }
        ],
        "entryId": "7909a094-92ad-4229-b884-77459603ac53",
        "projects": [
            {
                "projectTitle": "10x 1 Run Integration Test",
                "projectShortname": "prod\/optimus\/2019-05-14T12:01:21Z",
                "laboratory": [
                    "Department of Biology"
                ],
                "arrayExpressAccessions": [
                    "E-AAAA-00"
                ],
                "geoSeriesAccessions": [
                    "GSE00000"
                ],
                "insdcProjectAccessions": [
                    "SRP000000"
                ],
                "insdcStudyAccessions": [
                    "PRJNA000000"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_ID_1"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "20"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "selectedCellType": [

                ],
                "totalCells": 5000
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
                "totalSize": 22403001
            },
            {
                "fileType": "matrix",
                "count": 1,
                "totalSize": 148
            },
            {
                "fileType": "csv",
                "count": 1,
                "totalSize": 637805
            }
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 5000,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 5000
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "H syndrome"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "53b2b7e1-84ce-4302-ae2e-a0075e1144d7",
        "projects": [
            {
                "projectTitle": "10x 1 Run Integration Test",
                "projectShortname": "prod\/optimus\/2019-05-15T12:01:22Z",
                "laboratory": [
                    "Department of Biology"
                ],
                "arrayExpressAccessions": [
                    "E-AAAA-00"
                ],
                "geoSeriesAccessions": [
                    "GSE00000"
                ],
                "insdcProjectAccessions": [
                    "SRP000000"
                ],
                "insdcStudyAccessions": [
                    "PRJNA000000"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "specimen_ID_1"
                ],
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "disease": [
                    "H syndrome"
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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "donor_ID_1"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "20"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    "amygdala"
                ],
                "selectedCellType": [

                ],
                "totalCells": 5000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 3,
                "totalSize": 17837811
            }
        ],
        "projectSummary": {
            "donorCount": 1,
            "totalCellCount": 5000,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 5000
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "H syndrome"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [
                    "cellranger"
                ],
                "workflowVersion": [
                    "v1.0.2"
                ]
            }
        ],
        "entryId": "d96c2451-6e22-441f-a3e6-70fd0878bb1b",
        "projects": [
            {
                "projectTitle": "Assessing the relevance of organoids to model inter-individual variation",
                "projectShortname": "HPSI human cerebral organoids",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "organoids"
                ],
                "id": [
                    "Org_HPSI0314i-sojd_3_3",
                    "Org_HPSI0314i-hoik_1_1",
                    "Org_HPSI0214i-kucg_2_2",
                    "Org_HPSI0214i-wibj_2_1",
                    "Org_HPSI0314i-hoik_1_3",
                    "Org_HPSI0314i-hoik_1_2",
                    "Org_HPSI0314i-sojd_3_2",
                    "Org_HPSI0314i-sojd_3_1",
                    "Org_HPSI0214i-kucg_2_1",
                    "Org_HPSI0214i-wibj_2_3",
                    "Org_HPSI0214i-kucg_2_3",
                    "Org_HPSI0214i-wibj_2_2"
                ],
                "modelOrgan": [
                    "brain"
                ],
                "modelOrganPart": [
                    null
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "HPSI0214i-kucg_skin",
                    "HPSI0314i-hoik_skin",
                    "HPSI0314i-sojd_skin",
                    "HPSI0214i-wibj_skin"
                ],
                "organ": [
                    "skin of body"
                ],
                "organPart": [
                    "skin epidermis"
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
                    "HPSI0314i-hoik_1",
                    "HPSI0214i-wibj_2",
                    "HPSI0314i-sojd_3",
                    "HPSI0214i-kucg_2"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "HPSI0314i-hoik",
                    "HPSI0214i-wibj",
                    "HPSI0314i-sojd",
                    "HPSI0214i-kucg"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "40-44",
                    "45-49",
                    "55-59",
                    "65-69"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [
            {
                "id": [
                    "Org_HPSI0314i-sojd_3_3",
                    "Org_HPSI0314i-hoik_1_1",
                    "Org_HPSI0214i-kucg_2_2",
                    "Org_HPSI0214i-wibj_2_1",
                    "Org_HPSI0314i-hoik_1_3",
                    "Org_HPSI0314i-hoik_1_2",
                    "Org_HPSI0314i-sojd_3_2",
                    "Org_HPSI0314i-sojd_3_1",
                    "Org_HPSI0214i-kucg_2_1",
                    "Org_HPSI0214i-wibj_2_3",
                    "Org_HPSI0214i-kucg_2_3",
                    "Org_HPSI0214i-wibj_2_2"
                ],
                "modelOrgan": [
                    "brain"
                ],
                "modelOrganPart": [
                    null
                ]
            }
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    null
                ],
                "selectedCellType": [
                    "neural cell"
                ],
                "totalCells": 19916
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 18,
                "totalSize": 53857782294
            },
            {
                "fileType": "tsv",
                "count": 24,
                "totalSize": 95534429
            },
            {
                "fileType": "mtx",
                "count": 12,
                "totalSize": 2566974093
            },
            {
                "fileType": "h5",
                "count": 18,
                "totalSize": 2026941150
            },
            {
                "fileType": "csv",
                "count": 6,
                "totalSize": 4107
            },
            {
                "fileType": "bam",
                "count": 6,
                "totalSize": 55804183057
            },
            {
                "fileType": "bai",
                "count": 6,
                "totalSize": 37758984
            },
            {
                "fileType": "unknown",
                "count": 6,
                "totalSize": 16147394
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            }
        ],
        "projectSummary": {
            "donorCount": 4,
            "totalCellCount": 19916,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 19916
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "normal"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 2500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "005d611a-14d5-4fbf-846e-571a1f874f70",
        "projects": [
            {
                "projectTitle": "Assessing the relevance of organoids to model inter-individual variation",
                "projectShortname": "HPSI human cerebral organoids",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [
                    "ERP114427"
                ],
                "insdcStudyAccessions": [
                    "PRJEB31821"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "organoids"
                ],
                "id": [
                    "Org_HPSI0314i-hoik_1_1",
                    "Org_HPSI0314i-hoik_1_3",
                    "Org_HPSI0314i-sojd_3_3",
                    "Org_HPSI0314i-sojd_3_2",
                    "Org_HPSI0214i-kucg_2_2",
                    "Org_HPSI0214i-wibj_2_2",
                    "Org_HPSI0314i-hoik_1_2",
                    "Org_HPSI0214i-kucg_2_3",
                    "Org_HPSI0214i-wibj_2_3",
                    "Org_HPSI0214i-wibj_2_1",
                    "Org_HPSI0314i-sojd_3_1",
                    "Org_HPSI0214i-kucg_2_1"
                ],
                "modelOrgan": [
                    "brain"
                ],
                "modelOrganPart": [
                    null
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "HPSI0314i-hoik_skin",
                    "HPSI0214i-kucg_skin",
                    "HPSI0214i-wibj_skin",
                    "HPSI0314i-sojd_skin"
                ],
                "organ": [
                    "skin of body"
                ],
                "organPart": [
                    "skin epidermis"
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
                    "HPSI0214i-kucg_2",
                    "HPSI0214i-wibj_2",
                    "HPSI0314i-sojd_3",
                    "HPSI0314i-hoik_1"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "HPSI0214i-kucg",
                    "HPSI0314i-hoik",
                    "HPSI0314i-sojd",
                    "HPSI0214i-wibj"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "45-49",
                    "65-69",
                    "55-59",
                    "40-44"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [
            {
                "id": [
                    "Org_HPSI0314i-hoik_1_1",
                    "Org_HPSI0314i-hoik_1_3",
                    "Org_HPSI0314i-sojd_3_3",
                    "Org_HPSI0314i-sojd_3_2",
                    "Org_HPSI0214i-kucg_2_2",
                    "Org_HPSI0214i-wibj_2_2",
                    "Org_HPSI0314i-hoik_1_2",
                    "Org_HPSI0214i-kucg_2_3",
                    "Org_HPSI0214i-wibj_2_3",
                    "Org_HPSI0214i-wibj_2_1",
                    "Org_HPSI0314i-sojd_3_1",
                    "Org_HPSI0214i-kucg_2_1"
                ],
                "modelOrgan": [
                    "brain"
                ],
                "modelOrganPart": [
                    null
                ]
            }
        ],
        "cellSuspensions": [
            {
                "organ": [
                    "brain"
                ],
                "organPart": [
                    null
                ],
                "selectedCellType": [
                    "neural cell"
                ],
                "totalCells": 19916
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 18,
                "totalSize": 53857782294
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 15762678
            }
        ],
        "projectSummary": {
            "donorCount": 4,
            "totalCellCount": 19916,
            "organSummaries": [
                {
                    "organType": "brain",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 19916
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [
                "normal"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "MARS-seq"
                ],
                "instrumentManufacturerModel": [
                    "Illumina NextSeq500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "e1f2a0e4-1ec8-431e-a6df-c975b3a1131f",
        "projects": [
            {
                "projectTitle": "Bone marrow plasma cells from hip replacement surgeries",
                "projectShortname": "BM_PC",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Prof. Ido Amit"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "Hip11_specimen",
                    "Hip13_specimen",
                    "Hip8_specimen",
                    "Hip16_specimen",
                    "Hip10_specimen",
                    "Hip7_specimen",
                    "Hip6_specimen",
                    "Hip15_specimen",
                    "Hip5_specimen",
                    "Hip9_specimen",
                    "Hip17_specimen",
                    "Hip12_specimen"
                ],
                "organ": [
                    "hematopoietic system"
                ],
                "organPart": [
                    "bone marrow"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "Hip11_specimen",
                    "Hip13_specimen",
                    "Hip8_specimen",
                    "Hip16_specimen",
                    "Hip10_specimen",
                    "Hip7_specimen",
                    "Hip6_specimen",
                    "Hip15_specimen",
                    "Hip5_specimen",
                    "Hip9_specimen",
                    "Hip17_specimen",
                    "Hip12_specimen"
                ],
                "organ": [
                    "hematopoietic system"
                ],
                "organPart": [
                    "bone marrow"
                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "Hip13",
                    "Hip11",
                    "Hip8",
                    "Hip9",
                    "Hip12",
                    "Hip6",
                    "Hip15",
                    "Hip10",
                    "Hip5",
                    "Hip7",
                    "Hip17",
                    "Hip16"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "63",
                    "76",
                    "53",
                    "69",
                    "68",
                    "73",
                    "78",
                    "49",
                    "50",
                    "80",
                    "85"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "hematopoietic system"
                ],
                "organPart": [
                    "bone marrow"
                ],
                "selectedCellType": [
                    "Plasma cells"
                ],
                "totalCells": 9500
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 50,
                "totalSize": 32304816501
            },
            {
                "fileType": "pdf",
                "count": 2,
                "totalSize": 204869
            }
        ],
        "projectSummary": {
            "donorCount": 12,
            "totalCellCount": 9500,
            "organSummaries": [
                {
                    "organType": "hematopoietic system",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 9500
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "MARS-seq"
            ],
            "disease": [

            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina Hiseq 2500"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "5f256182-5dfc-4070-8404-f6fa71d37c73",
        "projects": [
            {
                "projectTitle": "Cell hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics ",
                "projectShortname": "Multiplexed scRNA-seq with barcoded antibodies",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Satija Lab",
                    "Technology Development and Innovation"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "Specimen_PBMC4",
                    "Specimen_PBMC3",
                    "Specimen_PBMC5",
                    "Specimen_PBMC6",
                    "Specimen_PBMC8",
                    "Specimen_PBMC1",
                    "Specimen_PBMC2",
                    "Specimen_PBMC7"
                ],
                "organ": [
                    "blood"
                ],
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "Specimen_PBMC4",
                    "Specimen_PBMC3",
                    "Specimen_PBMC5",
                    "Specimen_PBMC6",
                    "Specimen_PBMC8",
                    "Specimen_PBMC1",
                    "Specimen_PBMC2",
                    "Specimen_PBMC7"
                ],
                "organ": [
                    "blood"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "Donor_PBMC4",
                    "Donor_PBMC1",
                    "Donor_PBMC3",
                    "Donor_PBMC6",
                    "Donor_PBMC2",
                    "Donor_PBMC5",
                    "Donor_PBMC7",
                    "Donor_PBMC8"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "unknown"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "blood"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "peripheral blood mononuclear cell"
                ],
                "totalCells": 20000
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 6,
                "totalSize": 83729759795
            }
        ],
        "projectSummary": {
            "donorCount": 8,
            "totalCellCount": 20000,
            "organSummaries": [
                {
                    "organType": "blood",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 20000
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [

            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina Hiseq X 10"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [
                    "cellranger"
                ],
                "workflowVersion": [
                    "v1.0.2"
                ]
            }
        ],
        "entryId": "179bf9e6-5b33-4c5b-ae26-96c7270976b8",
        "projects": [
            {
                "projectTitle": "Census of Immune Cells",
                "projectShortname": "1M Immune Cells",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Regev Lab"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "3_CB2",
                    "5_CB4",
                    "2_BM2",
                    "6_BM7",
                    "7_BM2",
                    "2_CB1",
                    "4_BM1",
                    "2_BM7",
                    "5_BM8",
                    "2_CB7",
                    "8_BM6",
                    "3_BM2",
                    "3_CB5",
                    "1_CB8",
                    "5_CB2",
                    "7_CB4",
                    "7_BM5",
                    "4_BM2",
                    "8_BM7",
                    "7_BM1",
                    "3_BM5",
                    "2_CB8",
                    "8_BM2",
                    "2_CB3",
                    "1_CB2",
                    "4_BM3",
                    "4_BM4",
                    "3_CB6",
                    "8_CB6",
                    "1_CB3",
                    "4_CB4",
                    "3_CB1",
                    "5_CB5",
                    "4_CB8",
                    "1_CB4",
                    "8_CB3",
                    "5_CB6",
                    "6_CB6",
                    "4_CB6",
                    "8_CB2",
                    "6_BM8",
                    "6_BM4",
                    "8_BM5",
                    "2_BM6",
                    "7_CB5",
                    "6_BM5",
                    "5_BM1",
                    "3_BM4",
                    "5_CB7",
                    "2_BM8",
                    "3_BM7",
                    "6_BM1",
                    "6_CB7",
                    "5_CB8",
                    "5_CB1",
                    "3_BM8",
                    "5_BM4",
                    "7_BM6",
                    "3_BM3",
                    "7_CB2",
                    "8_CB7",
                    "3_CB8",
                    "6_CB8",
                    "1_BM3",
                    "1_BM6",
                    "5_CB3",
                    "2_BM5",
                    "4_CB2",
                    "1_CB7",
                    "3_CB3",
                    "2_CB5",
                    "1_BM5",
                    "5_BM7",
                    "6_BM6",
                    "3_BM1",
                    "1_BM4",
                    "6_BM3",
                    "6_CB3",
                    "8_CB8",
                    "5_BM6",
                    "2_CB2",
                    "1_CB1",
                    "8_CB4",
                    "5_BM5",
                    "8_CB5",
                    "1_CB6",
                    "7_BM4",
                    "1_BM7",
                    "7_BM8",
                    "4_BM5",
                    "4_BM7",
                    "7_CB3",
                    "5_BM3",
                    "7_CB7",
                    "7_CB6",
                    "7_CB8",
                    "8_BM8",
                    "8_BM1",
                    "1_BM1",
                    "7_CB1"
                ],
                "organ": [
                    "blood",
                    "immune system"
                ],
                "organPart": [
                    "bone marrow",
                    "umbilical cord blood"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "3_CB2",
                    "5_CB4",
                    "2_BM2",
                    "6_BM7",
                    "7_BM2",
                    "2_CB1",
                    "4_BM1",
                    "2_BM7",
                    "5_BM8",
                    "2_CB7",
                    "8_BM6",
                    "3_BM2",
                    "3_CB5",
                    "1_CB8",
                    "5_CB2",
                    "7_CB4",
                    "7_BM5",
                    "4_BM2",
                    "8_BM7",
                    "7_BM1",
                    "3_BM5",
                    "2_CB8",
                    "8_BM2",
                    "2_CB3",
                    "1_CB2",
                    "4_BM3",
                    "4_BM4",
                    "3_CB6",
                    "8_CB6",
                    "1_CB3",
                    "4_CB4",
                    "3_CB1",
                    "5_CB5",
                    "4_CB8",
                    "1_CB4",
                    "8_CB3",
                    "5_CB6",
                    "6_CB6",
                    "4_CB6",
                    "8_CB2",
                    "6_BM8",
                    "6_BM4",
                    "8_BM5",
                    "2_BM6",
                    "7_CB5",
                    "6_BM5",
                    "5_BM1",
                    "3_BM4",
                    "5_CB7",
                    "2_BM8",
                    "3_BM7",
                    "6_BM1",
                    "6_CB7",
                    "5_CB8",
                    "5_CB1",
                    "3_BM8",
                    "5_BM4",
                    "7_BM6",
                    "3_BM3",
                    "7_CB2",
                    "8_CB7",
                    "3_CB8",
                    "6_CB8",
                    "1_BM3",
                    "1_BM6",
                    "5_CB3",
                    "2_BM5",
                    "4_CB2",
                    "1_CB7",
                    "3_CB3",
                    "2_CB5",
                    "1_BM5",
                    "5_BM7",
                    "6_BM6",
                    "3_BM1",
                    "1_BM4",
                    "6_BM3",
                    "6_CB3",
                    "8_CB8",
                    "5_BM6",
                    "2_CB2",
                    "1_CB1",
                    "8_CB4",
                    "5_BM5",
                    "8_CB5",
                    "1_CB6",
                    "7_BM4",
                    "1_BM7",
                    "7_BM8",
                    "4_BM5",
                    "4_BM7",
                    "7_CB3",
                    "5_BM3",
                    "7_CB7",
                    "7_CB6",
                    "7_CB8",
                    "8_BM8",
                    "8_BM1",
                    "1_BM1",
                    "7_CB1"
                ],
                "organ": [
                    "blood",
                    "immune system"
                ],
                "organPart": [
                    "bone marrow",
                    "umbilical cord blood"
                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "CB4",
                    "BM3",
                    "BM4",
                    "CB2",
                    "BM1",
                    "CB6",
                    "CB1",
                    "BM7",
                    "CB5",
                    "BM2",
                    "BM6",
                    "CB7",
                    "CB8",
                    "BM5",
                    "BM8",
                    "CB3"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "50",
                    "39",
                    "26",
                    "36",
                    "32",
                    "52",
                    "0",
                    "29"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "immune system"
                ],
                "organPart": [
                    "bone marrow"
                ],
                "selectedCellType": [
                    "bone marrow hematopoietic cell"
                ],
                "totalCells": 274182
            },
            {
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "umbilical cord blood"
                ],
                "selectedCellType": [
                    "cord blood hematopoietic stem cell"
                ],
                "totalCells": 253910
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 762,
                "totalSize": 1306165450414
            },
            {
                "fileType": "tsv",
                "count": 1016,
                "totalSize": 4026442291
            },
            {
                "fileType": "mtx",
                "count": 508,
                "totalSize": 24458937000
            },
            {
                "fileType": "h5",
                "count": 762,
                "totalSize": 29813703209
            },
            {
                "fileType": "csv",
                "count": 254,
                "totalSize": 172862
            },
            {
                "fileType": "bam",
                "count": 254,
                "totalSize": 1212847684477
            },
            {
                "fileType": "bai",
                "count": 254,
                "totalSize": 1091867064
            },
            {
                "fileType": "unknown",
                "count": 254,
                "totalSize": 678678925
            }
        ],
        "projectSummary": {
            "donorCount": 16,
            "totalCellCount": 528092,
            "organSummaries": [
                {
                    "organType": "immune system",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 274182
                },
                {
                    "organType": "blood",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 253910
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [

            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "DroNc-Seq ",
                    "Drop-Seq "
                ],
                "instrumentManufacturerModel": [
                    "Illumina NextSeq 500"
                ],
                "pairedEnd": [
                    true
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "c765e3f9-7cfc-4501-8832-79e5f7abd321",
        "projects": [
            {
                "projectTitle": "Comparison, calibration, and benchmarking of high-throughput single cell RNA-Seq techniques for unbiased cell-type classification",
                "projectShortname": "Drop-seq, DroNc-seq, Fluidigm C1 Comparison",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Pott",
                    "Basu"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "cellLines"
                ],
                "id": [
                    "cell_line_Day0_hiPSC-CM_BioRep2",
                    "cell_line_Day7_hiPSC-CM_BioRep2",
                    "cell_line_Day3_hiPSC-CM_BioRep1",
                    "cell_line_Day1_hiPSC-CM_BioRep1",
                    "cell_line_Day3_hiPSC-CM_BioRep2",
                    "cell_line_Day0_hiPSC-CM_BioRep1",
                    "cell_line_Day1_hiPSC-CM_BioRep2",
                    "cell_line_Day15_hiPSC-CM_BioRep2",
                    "cell_line_Day7_hiPSC-CM_BioRep1"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "specimen_2",
                    "specimen_1"
                ],
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "venous blood"
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
                    "cell_line_Day0_hiPSC-CM_BioRep2",
                    "cell_line_Day7_hiPSC-CM_BioRep2",
                    "cell_line_Day3_hiPSC-CM_BioRep1",
                    "cell_line_Day1_hiPSC-CM_BioRep1",
                    "cell_line_Day3_hiPSC-CM_BioRep2",
                    "cell_line_GM18505",
                    "cell_line_GM18517",
                    "cell_line_Day0_hiPSC-CM_BioRep1",
                    "cell_line_Day1_hiPSC-CM_BioRep2",
                    "cell_line_Day15_hiPSC-CM_BioRep2",
                    "cell_line_Day7_hiPSC-CM_BioRep1"
                ]
            }
        ],
        "donorOrganisms": [
            {
                "id": [
                    "GM18517",
                    "GM18505"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    null
                ],
                "organismAgeUnit": [
                    null
                ],
                "biologicalSex": [
                    "female"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "venous blood"
                ],
                "selectedCellType": [

                ],
                "totalCells": 0
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 44,
                "totalSize": 158079432433
            }
        ],
        "projectSummary": {
            "donorCount": 2,
            "totalCellCount": 0,
            "organSummaries": [
                {
                    "organType": "blood",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 0
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "DroNc-Seq ",
                "Drop-Seq "
            ],
            "disease": [
                "normal"
            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "c4077b3c-5c98-4d26-a614-246d12c2e5d7",
        "projects": [
            {
                "projectTitle": "Ischaemic sensitivity of human tissue by single cell RNA seq",
                "projectShortname": "Tissue stability",
                "laboratory": [
                    "Molecular Immunity Unit, Department of Medicine",
                    "Human Cell Atlas Data Coordination Platform",
                    "Human Cell Atlas (Sarah Teichmann)",
                    "CGaP",
                    "Teichmann Lab",
                    "Human Cell Atlas UK",
                    "Rebecca Fitzgerald",
                    "Human Cell Atlas (Mike Stubbington)",
                    "Cambridge Biorepository for Translational Medicine",
                    "Oliver Stegle"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [
                    "ERP114453"
                ],
                "insdcStudyAccessions": [
                    "PRJEB31843"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "A16-Spl-0-TL1",
                    "A6-Oes-1-TL1",
                    "A12-Spl-0-TL1",
                    "A15-Oes-0-TL1",
                    "A12-Oes-0-TL1",
                    "A8-Spl-0-TL-0h"
                ],
                "organ": [
                    "spleen",
                    "esophagus"
                ],
                "organPart": [
                    "esophagus mucosa"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    "hypothermic preservation media at 2-8C"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "A16-Spl-0-TL1",
                    "A6-Oes-1-TL1",
                    "A12-Spl-0-TL1",
                    "A15-Oes-0-TL1",
                    "A12-Oes-0-TL1",
                    "A8-Spl-0-TL-0h"
                ],
                "organ": [
                    "spleen",
                    "esophagus"
                ],
                "organPart": [
                    "esophagus mucosa"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    "hypothermic preservation media at 2-8C"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [

        ],
        "donorOrganisms": [
            {
                "id": [
                    "CBTM-337C",
                    "CBTM-302C",
                    "CBTM-328C",
                    "CBTM-325C",
                    "CBTM-296C"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "50-55",
                    "20-25",
                    "40-45",
                    "30-35"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "esophagus"
                ],
                "organPart": [
                    "esophagus mucosa"
                ],
                "selectedCellType": [
                    "epithelial cell of esophagus"
                ],
                "totalCells": 10001
            },
            {
                "organ": [
                    "spleen"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "splenic endothelial cell"
                ],
                "totalCells": 10149
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 18,
                "totalSize": 114352566224
            },
            {
                "fileType": "pdf",
                "count": 5,
                "totalSize": 8420595
            }
        ],
        "projectSummary": {
            "donorCount": 5,
            "totalCellCount": 20150,
            "organSummaries": [
                {
                    "organType": "esophagus",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 10001
                },
                {
                    "organType": "spleen",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 10149
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [

            ]
        }
    },
    {
        "protocols": [
            {
                "libraryConstructionApproach": [
                    "10X v2 sequencing"
                ],
                "instrumentManufacturerModel": [
                    "Illumina HiSeq 4000"
                ],
                "pairedEnd": [
                    false
                ],
                "workflow": [
                    "cellranger"
                ],
                "workflowVersion": [
                    "v1.0.2"
                ]
            }
        ],
        "entryId": "5dfe932f-159d-4cab-8039-d32f22ffbbc2",
        "projects": [
            {
                "projectTitle": "Ischaemic sensitivity of human tissue by single cell RNA seq",
                "projectShortname": "Tissue stability",
                "laboratory": [
                    "Molecular Immunity Unit, Department of Medicine",
                    "Human Cell Atlas Data Coordination Platform",
                    "Human Cell Atlas (Sarah Teichmann)",
                    "Rebecca Fitzgerald",
                    "Teichmann Lab",
                    "Human Cell Atlas (Mike Stubbington)",
                    "Cambridge Biorepository for Translational Medicine"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "A6-Oes-1-TL1",
                    "A12-Spl-0-TL1",
                    "A1-Spl-0-TL5",
                    "A12-Oes-0-TL1",
                    "A16-Spl-0-TL1",
                    "A8-Spl-0-TL-0h",
                    "A15-Oes-0-TL1"
                ],
                "organ": [
                    "esophagus",
                    "spleen"
                ],
                "organPart": [
                    "epithelium of esophagus"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "A6-Oes-1-TL1",
                    "A12-Spl-0-TL1",
                    "A1-Spl-0-TL5",
                    "A12-Oes-0-TL1",
                    "A16-Spl-0-TL1",
                    "A8-Spl-0-TL-0h",
                    "A15-Oes-0-TL1"
                ],
                "organ": [
                    "esophagus",
                    "spleen"
                ],
                "organPart": [
                    "epithelium of esophagus"
                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "CBTM-302C",
                    "CBTM-296C",
                    "CBTM-284C",
                    "CBTM-325C",
                    "CBTM-328C",
                    "CBTM-337C"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "30-35",
                    "40-45",
                    "50-55",
                    "55-60",
                    "20-25"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "female",
                    "male"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "spleen"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "Live cells"
                ],
                "totalCells": 12109
            },
            {
                "organ": [
                    "esophagus"
                ],
                "organPart": [
                    "epithelium of esophagus"
                ],
                "selectedCellType": [
                    "Live cells"
                ],
                "totalCells": 10001
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 21,
                "totalSize": 132051479368
            },
            {
                "fileType": "tsv",
                "count": 28,
                "totalSize": 110941063
            },
            {
                "fileType": "mtx",
                "count": 14,
                "totalSize": 1416089575
            },
            {
                "fileType": "h5",
                "count": 21,
                "totalSize": 1763231612
            },
            {
                "fileType": "csv",
                "count": 7,
                "totalSize": 4791
            },
            {
                "fileType": "bam",
                "count": 7,
                "totalSize": 116285531295
            },
            {
                "fileType": "bai",
                "count": 7,
                "totalSize": 43625400
            },
            {
                "fileType": "unknown",
                "count": 7,
                "totalSize": 18691551
            },
            {
                "fileType": "pdf",
                "count": 5,
                "totalSize": 8420595
            }
        ],
        "projectSummary": {
            "donorCount": 6,
            "totalCellCount": 22110,
            "organSummaries": [
                {
                    "organType": "spleen",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 12109
                },
                {
                    "organType": "esophagus",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 10001
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "10X v2 sequencing"
            ],
            "disease": [

            ]
        }
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "ccd8370a-84b8-464d-a87e-e688ac3e4f62",
        "projects": [
            {
                "projectTitle": "Melanoma infiltration of stromal and immune cells",
                "projectShortname": "Mouse Melanoma",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
                    "MRC Cancer Unit"
                ],
                "arrayExpressAccessions": [
                    "E-MTAB-7427",
                    "E-MTAB-7417"
                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [
                    "ERP112843"
                ],
                "insdcStudyAccessions": [
                    "PRJEB30390"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "1117_LN",
                    "1107_T",
                    "1135_T",
                    "1242_LN",
                    "1134_LN",
                    "1120_LN",
                    "1110_T",
                    "1115_T",
                    "1104_LN",
                    "1200_T",
                    "1125_T",
                    "1202_T",
                    "1118_T",
                    "1117_T",
                    "1107_LN",
                    "1127_T",
                    "1209_LN",
                    "1202_LN",
                    "1122_LN",
                    "1115_LN",
                    "1112_LN",
                    "1197_LN",
                    "1120_T",
                    "1129_LN",
                    "1126_LN",
                    "1239_LN",
                    "1118_LN",
                    "1138_T",
                    "1139_T",
                    "1209_T",
                    "1134_T",
                    "1131_T",
                    "1110_LN",
                    "1235_LN",
                    "1108_LN",
                    "1113_T",
                    "1104_T",
                    "1269\/1274_LN",
                    "1122_T",
                    "1124_LN",
                    "1137_LN",
                    "1242_T",
                    "1108_T",
                    "1197_T",
                    "1235_T",
                    "1131_LN",
                    "1200_LN",
                    "1138_LN",
                    "1121_LN",
                    "1129_T",
                    "1265\/1274_skin",
                    "1137_T",
                    "1139_LN",
                    "1135_LN"
                ],
                "organ": [
                    "lymph node",
                    "tumor",
                    "skin of body"
                ],
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": [
                    null
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "1117_LN",
                    "1107_T",
                    "1135_T",
                    "1242_LN",
                    "1134_LN",
                    "1120_LN",
                    "1110_T",
                    "1115_T",
                    "1104_LN",
                    "1200_T",
                    "1125_T",
                    "1202_T",
                    "1118_T",
                    "1117_T",
                    "1107_LN",
                    "1127_T",
                    "1209_LN",
                    "1202_LN",
                    "1122_LN",
                    "1115_LN",
                    "1112_LN",
                    "1197_LN",
                    "1120_T",
                    "1129_LN",
                    "1126_LN",
                    "1239_LN",
                    "1118_LN",
                    "1138_T",
                    "1139_T",
                    "1209_T",
                    "1134_T",
                    "1131_T",
                    "1110_LN",
                    "1235_LN",
                    "1108_LN",
                    "1113_T",
                    "1104_T",
                    "1269\/1274_LN",
                    "1122_T",
                    "1124_LN",
                    "1137_LN",
                    "1242_T",
                    "1108_T",
                    "1197_T",
                    "1235_T",
                    "1131_LN",
                    "1200_LN",
                    "1138_LN",
                    "1121_LN",
                    "1129_T",
                    "1265\/1274_skin",
                    "1137_T",
                    "1139_LN",
                    "1135_LN"
                ],
                "organ": [
                    "lymph node",
                    "tumor",
                    "skin of body"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1197",
                    "1108",
                    "1139",
                    "1135",
                    "1115",
                    "1239",
                    "1202",
                    "1107",
                    "1269\/1274",
                    "1122",
                    "1137",
                    "1120",
                    "1209",
                    "1124",
                    "1138",
                    "1117",
                    "1134",
                    "1125",
                    "1104",
                    "1112",
                    "1110",
                    "1113",
                    "1118",
                    "1121",
                    "1235",
                    "1131",
                    "1265\/1274",
                    "1200",
                    "1129",
                    "1242",
                    "1126",
                    "1127"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD31+ endothelial",
                    "CD8-positive, alpha-beta T cell",
                    "B cell",
                    "CAFs",
                    "CD11b+ Macrophages\/monocytes",
                    "CD11b+CD11c+DC",
                    "CD4+ T cell",
                    "innate lymphoid cell",
                    "CD11c+ DC"
                ],
                "totalCells": 3185
            },
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD31+ endothelial",
                    "CD8-positive, alpha-beta T cell",
                    "B cell",
                    "CAFs",
                    "CD11b+ Macrophages\/monocytes",
                    "CD11b+CD11c+DC",
                    "CD4+ T cell",
                    "innate lymphoid cell",
                    "CD11c+ DC"
                ],
                "totalCells": 3274
            },
            {
                "organ": [
                    "skin of body"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD31+ endothelial",
                    "CAFs"
                ],
                "totalCells": 180
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 13278,
                "totalSize": 398998709565
            },
            {
                "fileType": "pdf",
                "count": 3,
                "totalSize": 123112
            }
        ],
        "projectSummary": {
            "donorCount": 32,
            "totalCellCount": 6639,
            "organSummaries": [
                {
                    "organType": "tumor",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 3185
                },
                {
                    "organType": "lymph node",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 3274
                },
                {
                    "organType": "skin of body",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 180
                }
            ],
            "genusSpecies": [
                "Mus musculus"
            ],
            "libraryConstructionApproach": [
                "Smart-seq2"
            ],
            "disease": [

            ]
        }
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
                    false
                ],
                "workflow": [

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "0ec2b05f-ddbe-4e5a-b30f-e81f4b1e330c",
        "projects": [
            {
                "projectTitle": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
                "projectShortname": "CD4+ cytotoxic T lymphocytes",
                "laboratory": [
                    "Human Cell Atlas Data Coordination Platform",
                    "Division of Vaccine Discovery",
                    "Molecular Atlas"
                ],
                "arrayExpressAccessions": [

                ],
                "geoSeriesAccessions": [

                ],
                "insdcProjectAccessions": [

                ],
                "insdcStudyAccessions": [

                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": [
                    "specimens"
                ],
                "id": [
                    "Subject12_DENV positive_PBMC_TEM",
                    "Subject16_DENV negative_PBMC_IL7Rlow_TEMRA",
                    "Subject10_DENV negative_PBMC_TEMRA",
                    "Subject15_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject14_DENV positive_PBMC_TEMRA",
                    "Subject12_DENV positive_PBMC_TCM",
                    "Subject5_DENV positive_PBMC_TEMRA",
                    "Subject16_DENV negative_PBMC_IL7Rhigh_TEMRA",
                    "Subject14_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject3_DENV positive_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TCM",
                    "Subject1_DENV negative_PBMC_TEMRA",
                    "Subject11_DENV positive_PBMC_TEMRA",
                    "Subject9_DENV negative_PBMC_TEMRA",
                    "Subject13_DENV positive_PBMC_TEMRA",
                    "Subject12_DENV positive_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TEM",
                    "Subject2_DENV negative_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TEMRA",
                    "Subject13_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject4_DENV negative_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_DENV antigen specific TEM",
                    "Subject7_DENV negative_PBMC_TEMRA",
                    "Subject15_DENV positive_PBMC_TEMRA",
                    "Subject3_DENV positive_PBMC_TCM",
                    "Subject8_DENV positive_PBMC_TEMRA",
                    "Subject3_DENV positive_PBMC_TEM",
                    "Subject6_DENV positive_PBMC_DENV antigen specific TEMRA"
                ],
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "peripheral blood mononuclear cell"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    "cryopreservation, other"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "specimens": [
            {
                "id": [
                    "Subject12_DENV positive_PBMC_TEM",
                    "Subject16_DENV negative_PBMC_IL7Rlow_TEMRA",
                    "Subject10_DENV negative_PBMC_TEMRA",
                    "Subject15_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject14_DENV positive_PBMC_TEMRA",
                    "Subject12_DENV positive_PBMC_TCM",
                    "Subject5_DENV positive_PBMC_TEMRA",
                    "Subject16_DENV negative_PBMC_IL7Rhigh_TEMRA",
                    "Subject14_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject3_DENV positive_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TCM",
                    "Subject1_DENV negative_PBMC_TEMRA",
                    "Subject11_DENV positive_PBMC_TEMRA",
                    "Subject9_DENV negative_PBMC_TEMRA",
                    "Subject13_DENV positive_PBMC_TEMRA",
                    "Subject12_DENV positive_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TEM",
                    "Subject2_DENV negative_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_TEMRA",
                    "Subject13_DENV positive_PBMC_DENV antigen specific TEMRA",
                    "Subject4_DENV negative_PBMC_TEMRA",
                    "Subject6_DENV positive_PBMC_DENV antigen specific TEM",
                    "Subject7_DENV negative_PBMC_TEMRA",
                    "Subject15_DENV positive_PBMC_TEMRA",
                    "Subject3_DENV positive_PBMC_TCM",
                    "Subject8_DENV positive_PBMC_TEMRA",
                    "Subject3_DENV positive_PBMC_TEM",
                    "Subject6_DENV positive_PBMC_DENV antigen specific TEMRA"
                ],
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "peripheral blood mononuclear cell"
                ],
                "disease": [

                ],
                "preservationMethod": [
                    "cryopreservation, other"
                ],
                "source": [
                    "specimen_from_organism"
                ]
            }
        ],
        "cellLines": [

        ],
        "donorOrganisms": [
            {
                "id": [
                    "Subject6",
                    "Subject14",
                    "Subject13",
                    "Subject10",
                    "Subject3",
                    "Subject1",
                    "Subject8",
                    "Subject2",
                    "Subject16",
                    "Subject15",
                    "Subject5",
                    "Subject12",
                    "Subject4",
                    "Subject9",
                    "Subject7",
                    "Subject11"
                ],
                "genusSpecies": [
                    "Homo sapiens"
                ],
                "organismAge": [
                    "18-60"
                ],
                "organismAgeUnit": [
                    "year"
                ],
                "biologicalSex": [
                    "unknown"
                ],
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "blood"
                ],
                "organPart": [
                    "peripheral blood mononuclear cell"
                ],
                "selectedCellType": [
                    "effector memory CD8-positive, alpha-beta T cell, terminally differentiated",
                    "CD8-positive, alpha-beta T cell"
                ],
                "totalCells": 2244
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 2244,
                "totalSize": 80050236577
            }
        ],
        "projectSummary": {
            "donorCount": 16,
            "totalCellCount": 2244,
            "organSummaries": [
                {
                    "organType": "blood",
                    "countOfDocsWithOrganType": 1,
                    "totalCellCountByOrgan": 2244
                }
            ],
            "genusSpecies": [
                "Homo sapiens"
            ],
            "libraryConstructionApproach": [
                "Smart-seq2"
            ],
            "disease": [

            ]
        }
    }
];

// Basic project pagination model, based on first page of project results
const DEFAULT_PROJECT_PAGINATION_MODEL = {
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
const SAMPLE_DATA = [
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

                ],
                "workflowVersion": [

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
                    "Human Cell Atlas Data Coordination Platform",
                    "Institute of Cellular Medicine",
                    "MRC Cancer Unit",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

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
                "organPart": [

                ],
                "disease": [

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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

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
                "count": 182,
                "totalSize": 8206104986
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "46b58d7b-7143-4c0a-88f3-73d0409eb453",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
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

                ],
                "disease": [

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
                "organPart": [

                ],
                "disease": [

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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

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
                "count": 182,
                "totalSize": 8206104986
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "e4f50686-1c23-4e7c-9f8e-7d5dbadd9e93",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

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
                "count": 182,
                "totalSize": 5893786371
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "e4007e2f-1f23-43b2-8178-71c1c19956b0",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1104_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1104_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

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
                "count": 182,
                "totalSize": 5893786371
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "c15f20e0-9e1f-44c2-ae9e-c42cd5c0aaaf",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Sarah Teichmann",
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1107_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1107_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1107"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD8-positive, alpha-beta T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 4712170205
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "7f703bae-9662-4847-b689-53173dc25f12",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1107_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1107_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1107"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD8-positive, alpha-beta T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 4712170205
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "f4301b11-451e-4d52-bb89-2d551e40dfc5",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1107_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1107_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1107"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD8-positive, alpha-beta T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 5825947527
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "b6a1b8c0-2b5c-40ae-b72d-c341b8eb0910",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Human Cell Atlas Data Coordination Platform",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1107_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1107_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1107"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "CD8-positive, alpha-beta T cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 5825947527
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "69add1b3-3a88-4f2b-bcc9-99a72b3679de",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Sarah Teichmann",
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1108_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1108_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1108"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "innate lymphoid cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 6356622348
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "37f016e6-2ba2-44a0-9dba-a438357de2fb",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Sarah Teichmann",
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1108_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1108_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1108"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "innate lymphoid cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 6356622348
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "e38aaabb-9cab-4d2c-891f-7ae9d694191e",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "Sarah Teichmann",
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Human Cell Atlas Data Coordination Platform"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1108_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1108_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1108"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "innate lymphoid cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 7468460874
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "b8f63ab5-e1f6-4d72-8d67-4bc14ba94315",
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
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1108_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1108_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1108"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "innate lymphoid cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 7468460874
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "a73c5442-7731-4630-ba17-9349d49834b7",
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
                    "MRC Cancer Unit",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1110_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1110_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1110"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "B cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 8753121196
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "1493b932-2399-4003-837a-2c773d83e48a",
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
                    "Institute of Cellular Medicine",
                    "MRC Cancer Unit",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1110_LN",
                "organ": "lymph node",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1110_LN"
                ],
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1110"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "lymph node"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "B cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 8753121196
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

                ],
                "workflowVersion": [

                ]
            }
        ],
        "entryId": "cc4e57cc-2f41-49f5-9ddd-526a96d555c0",
        "projects": [
            {
                "projectTitle": [
                    "Melanoma infiltration of stromal and immune cells"
                ],
                "projectShortname": [
                    "Mouse Melanoma"
                ],
                "laboratory": [
                    "MRC Cancer Unit",
                    "Human Cell Atlas Data Coordination Platform",
                    "Institute of Cellular Medicine",
                    "Sarah Teichmann"
                ]
            }
        ],
        "samples": [
            {
                "sampleEntityType": "specimens",
                "id": "1110_T",
                "organ": "tumor",
                "organPart": [

                ],
                "disease": [

                ],
                "preservationMethod": null,
                "source": "specimen_from_organism"
            }
        ],
        "specimens": [
            {
                "id": [
                    "1110_T"
                ],
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "disease": [

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

        ],
        "donorOrganisms": [
            {
                "id": [
                    "1110"
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
                "disease": null
            }
        ],
        "organoids": [

        ],
        "cellSuspensions": [
            {
                "organ": [
                    "tumor"
                ],
                "organPart": [

                ],
                "selectedCellType": [
                    "B cell"
                ],
                "totalCells": 91
            }
        ],
        "fileTypeSummaries": [
            {
                "fileType": "fastq.gz",
                "count": 182,
                "totalSize": 1251172890
            }
        ]
    }
];

// Basic samples pagination model, based on first page of project results
const DEFAULT_SAMPLE_PAGINATION_MODEL = {
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
export const FILE_TABLE_MODEL = {
    pagination: DEFAULT_FILE_PAGINATION_MODEL,
    data: FILE_DATA,
    loading: false,
    tableName: EntityName.FILES,
    termCountsByFacetName: new Map()
} as TableModel;

/**
 * Model of project table model that is saved in store.
 */
export const PROJECT_TABLE_MODEL = {
    pagination: DEFAULT_PROJECT_PAGINATION_MODEL,
    data: PROJECT_DATA,
    loading: false,
    tableName: EntityName.PROJECTS,
    termCountsByFacetName: new Map()
} as TableModel;

/**
 * Model of sample table model that is saved in store.
 */
export const SAMPLE_TABLE_MODEL = {
    pagination: DEFAULT_PROJECT_PAGINATION_MODEL,
    data: SAMPLE_DATA,
    loading: false,
    tableName: EntityName.SAMPLES,
    termCountsByFacetName: new Map()
} as TableModel;
