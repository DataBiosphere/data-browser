/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mock of entity search results returned from server and parsed by service. That is, the expected return value from
 * FileService.fetchEntitySearchResults.
 */

// App dependencies
import { EntitySearchResults } from "./entity-search-results.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { Term } from "./term.model";

// Entity search results for projects tab where no facets have been selected
const DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS_JSON = {
    "fileFacets": [
        {
            "name": "organ",
            "total": 526,
            "terms": [
                {
                    "name": "blood",
                    "count": 100,
                    "selected": false
                },
                {
                    "name": "bone",
                    "count": 83,
                    "selected": false
                },
                {
                    "name": "brain",
                    "count": 58,
                    "selected": false
                },
                {
                    "name": "heart",
                    "count": 36,
                    "selected": false
                },
                {
                    "name": "fat",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "lymph node",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "pancreas",
                    "count": 26,
                    "selected": false
                },
                {
                    "name": "tumor",
                    "count": 25,
                    "selected": false
                },
                {
                    "name": "large intestine",
                    "count": 13,
                    "selected": false
                },
                {
                    "name": "hemopoietic organ",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "skin",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "thymus",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Brain",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "bladder ",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "kidney",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "kidney ",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "liver",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "muscle",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "spleen ",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "tongue ",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "trachea ",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "diaphragm",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "lung ",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "mammary gland",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "spleen",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "esophagus",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "lung endomucin",
                    "count": 2,
                    "selected": false
                },
                {
                    "name": "lung epcam",
                    "count": 2,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 25,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 29,
            "selectedTermCount": 0
        },
        {
            "name": "sampleEntityType",
            "total": 526,
            "terms": [
                {
                    "name": "specimens",
                    "count": 501,
                    "selected": false
                },
                {
                    "name": "cell_lines",
                    "count": 13,
                    "selected": false
                },
                {
                    "name": "organoids",
                    "count": 12,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 3,
            "selectedTermCount": 0
        },
        {
            "name": "project",
            "total": 526,
            "terms": [
                {
                    "name": "Tabula Muris",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "1M Immune Cells",
                    "count": 127,
                    "selected": false
                },
                {
                    "name": "Mouse Melanoma",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "CD4+ cytotoxic T lymphocytes",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "BM_PC",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "HPSI human cerebral organoids",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Healthy and type 2 diabetes pancreas",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "Drop-seq, DroNc-seq, Fluidigm C1 Comparison",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "Multiplexed scRNA-seq with barcoded antibodies",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Single cell transcriptome analysis of human pancreas",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Tissue stability",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "1M Neurons",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "Human Hematopoietic Profiling",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "Kidney biopsy scRNA-seq",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation.",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "barista_seq",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/Smart-seq2/2019-04-10T15:14:04Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/Smart-seq2/2019-04-10T15:32:35Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/Smart-seq2/2019-04-24T14:51:08Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/Smart-seq2/2019-05-08T22:00:52Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/Smart-seq2/2019-05-13T11:00:56Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-06T11:01:26Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-08T22:01:24Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-10T15:14:04Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-10T15:32:36Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-11T11:01:18Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-04-24T14:51:09Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-07T15:55:29Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-07T17:45:47Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-08T07:06:07Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-08T11:01:09Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-08T22:00:54Z",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "staging/optimus/2019-05-09T11:01:34Z",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 33,
            "selectedTermCount": 0
        },
        {
            "name": "instrumentManufacturerModel",
            "total": 526,
            "terms": [
                {
                    "name": "Illumina NovaSeq 6000",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "Illumina Hiseq X 10",
                    "count": 127,
                    "selected": false
                },
                {
                    "name": "Illumina HiSeq 2500",
                    "count": 111,
                    "selected": false
                },
                {
                    "name": "Illumina NextSeq 500",
                    "count": 23,
                    "selected": false
                },
                {
                    "name": "Illumina HiSeq 4000",
                    "count": 13,
                    "selected": false
                },
                {
                    "name": "Illumina NextSeq500",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Illumina HiSeq 2000",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "Illumina Hiseq 2500",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 9,
            "selectedTermCount": 0
        },
        {
            "name": "institution",
            "total": 526,
            "terms": [
                {
                    "name": "EMBL-EBI",
                    "count": 264,
                    "selected": false
                },
                {
                    "name": "Biohub",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "University of California at Santa Cruz",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "Broad Institute",
                    "count": 127,
                    "selected": false
                },
                {
                    "name": "University of Cambridge",
                    "count": 61,
                    "selected": false
                },
                {
                    "name": "Wellcome Trust Sanger Institute",
                    "count": 61,
                    "selected": false
                },
                {
                    "name": "DKFZ German Cancer Research Center",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "University of Helsinki",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "La Jolla Institute for Allergy and Immunology",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "EMBL-EBI European Bioinformatics Institute",
                    "count": 21,
                    "selected": false
                },
                {
                    "name": "University of California Santa Cruz",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "University of California, Santa Cruz",
                    "count": 13,
                    "selected": false
                },
                {
                    "name": "Max Planck Institute for Evolutionary Anthropology",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "The Weizmann Institute of Science",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Karolinska Institutet",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "University of Chicago",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "New York Genome Center",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Stanford University",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "MRC Cancer Unit",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "10x Genomics, Inc.",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "University of Washington",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "Sloan Kettering Institute",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "The Allen Institute for Brain Science",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Washington University in St. Louis",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 25,
            "selectedTermCount": 0
        },
        {
            "name": "donorDisease",
            "total": 0,
            "terms": [
                {
                    "name": "Unspecified",
                    "count": 526,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 1,
            "selectedTermCount": 0
        },
        {
            "name": "pairedEnd",
            "total": 526,
            "terms": [
                {
                    "name": "true",
                    "count": 345,
                    "selected": false
                },
                {
                    "name": "false",
                    "count": 180,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 3,
            "selectedTermCount": 0
        },
        {
            "name": "preservationMethod",
            "total": 526,
            "terms": [
                {
                    "name": "cryopreservation, other",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "fresh",
                    "count": 15,
                    "selected": false
                },
                {
                    "name": "cryopreservation in liquid nitrogen (dead tissue)",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "cryopreservation of live cells in liquid nitrogen",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 475,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 5,
            "selectedTermCount": 0
        },
        {
            "name": "genusSpecies",
            "total": 526,
            "terms": [
                {
                    "name": "Mus musculus",
                    "count": 283,
                    "selected": false
                },
                {
                    "name": "Homo sapiens",
                    "count": 243,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 2,
            "selectedTermCount": 0
        },
        {
            "name": "projectTitle",
            "total": 526,
            "terms": [
                {
                    "name": "Tabula Muris: Transcriptomic characterization of 20 organs and tissues from Mus musculus at single cell resolution",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "Census of Immune Cells",
                    "count": 127,
                    "selected": false
                },
                {
                    "name": "Melanoma infiltration of stromal and immune cells",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "10x 1 Run Integration Test",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Assessing the relevance of organoids to model inter-individual variation",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Bone marrow plasma cells from hip replacement surgeries",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Single-cell RNA-seq analysis of human pancreas from healthy individuals and type 2 diabetes patients",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "Comparison, calibration, and benchmarking of high-throughput single cell RNA-Seq techniques for unbiased cell-type classification",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "Cell hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics ",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Single cell transcriptome analysis of human pancreas reveals transcriptional signatures of aging and somatic mutation patterns.",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Ischaemic sensitivity of human tissue by single cell RNA seq",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "1.3 Million Brain Cells from E18 Mice",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "SS2 1 Cell Integration Test",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "Profiling of CD34+ cells from human bone marrow to understand hematopoiesis",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "1 FOV BaristaSeq mouse SpaceTx dataset",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Single Cell Transcriptomics of a Human Kidney Allograft Biopsy Defines a Diverse Inflammatory Response",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types.",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 18,
            "selectedTermCount": 0
        },
        {
            "name": "modelOrganPart",
            "total": 0,
            "terms": [
                {
                    "name": "Unspecified",
                    "count": 526,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 1,
            "selectedTermCount": 0
        },
        {
            "name": "disease",
            "total": 526,
            "terms": [
                {
                    "name": "H syndrome",
                    "count": 17,
                    "selected": false
                },
                {
                    "name": "normal",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "ESRD",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "hemolytic uremic syndrome",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 494,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 5,
            "selectedTermCount": 0
        },
        {
            "name": "workflow",
            "total": 526,
            "terms": [
                {
                    "name": "cellranger",
                    "count": 137,
                    "selected": false
                },
                {
                    "name": "optimus",
                    "count": 16,
                    "selected": false
                },
                {
                    "name": "smartseq2",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 366,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 4,
            "selectedTermCount": 0
        },
        {
            "name": "contactName",
            "total": 0,
            "terms": [
                {
                    "name": "Unspecified",
                    "count": 526,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 1,
            "selectedTermCount": 0
        },
        {
            "name": "organPart",
            "total": 526,
            "terms": [
                {
                    "name": "bone marrow",
                    "count": 75,
                    "selected": false
                },
                {
                    "name": "umbilical cord blood",
                    "count": 64,
                    "selected": false
                },
                {
                    "name": "peripheral blood mononuclear cell",
                    "count": 28,
                    "selected": false
                },
                {
                    "name": "islet of Langerhans",
                    "count": 18,
                    "selected": false
                },
                {
                    "name": "amygdala",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "tongue taste bud",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "epithelium of esophagus",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "cortex",
                    "count": 2,
                    "selected": false
                },
                {
                    "name": "hippocampus",
                    "count": 2,
                    "selected": false
                },
                {
                    "name": "ventricular zone",
                    "count": 2,
                    "selected": false
                },
                {
                    "name": "cortex of kidney ",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 314,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 12,
            "selectedTermCount": 0
        },
        {
            "name": "publicationTitle",
            "total": 0,
            "terms": [
                {
                    "name": "Unspecified",
                    "count": 526,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 1,
            "selectedTermCount": 0
        },
        {
            "name": "cellLineType",
            "total": 526,
            "terms": [
                {
                    "name": "induced pluripotent",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "primary",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "stem cell-derived",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "stem cell",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 501,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 5,
            "selectedTermCount": 0
        },
        {
            "name": "libraryConstructionApproach",
            "total": 526,
            "terms": [
                {
                    "name": "Smart-seq2",
                    "count": 327,
                    "selected": false
                },
                {
                    "name": "10X v2 sequencing",
                    "count": 149,
                    "selected": false
                },
                {
                    "name": "10x_v2",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "Chromium 3' Single Cell v2",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "MARS-seq",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "DroNc-seq ",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Drop-seq ",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "High-throughput single-cell labeling with indexing droplets",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 2,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 9,
            "selectedTermCount": 0
        },
        {
            "name": "biologicalSex",
            "total": 526,
            "terms": [
                {
                    "name": "male",
                    "count": 242,
                    "selected": false
                },
                {
                    "name": "female",
                    "count": 237,
                    "selected": false
                },
                {
                    "name": "unknown",
                    "count": 47,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 3,
            "selectedTermCount": 0
        },
        {
            "name": "laboratory",
            "total": 526,
            "terms": [
                {
                    "name": "Human Cell Atlas Data Coordination Platform",
                    "count": 286,
                    "selected": false
                },
                {
                    "name": "Quake",
                    "count": 222,
                    "selected": false
                },
                {
                    "name": "Regev Lab",
                    "count": 127,
                    "selected": false
                },
                {
                    "name": "MRC Cancer Unit",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "Sarah Teichmann",
                    "count": 54,
                    "selected": false
                },
                {
                    "name": "Molecular Atlas",
                    "count": 47,
                    "selected": false
                },
                {
                    "name": "Division of Vaccine Discovery",
                    "count": 33,
                    "selected": false
                },
                {
                    "name": "Department of Biology",
                    "count": 17,
                    "selected": false
                },
                {
                    "name": "Prof. Ido Amit",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Department of Cell and Molecular Biology (CMB)",
                    "count": 10,
                    "selected": false
                },
                {
                    "name": "Basu",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "Pott",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "Satija Lab",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Technology Development and Innovation",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "Cambridge Biorepository for Translational Medicine",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Human Cell Atlas (Mike Stubbington)",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Human Cell Atlas (Sarah Teichmann)",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Molecular Immunity Unit, Department of Medicine",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Rebecca Fitzgerald",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Teichmann Lab",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "Pe'er",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "The Humphreys' Lab",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 23,
            "selectedTermCount": 0
        },
        {
            "name": "projectDescription",
            "total": 0,
            "terms": [
                {
                    "name": "Unspecified",
                    "count": 526,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 1,
            "selectedTermCount": 0
        },
        {
            "name": "selectedCellType",
            "total": 526,
            "terms": [
                {
                    "name": "umbilical cord blood cell",
                    "count": 64,
                    "selected": false
                },
                {
                    "name": "bone marrow hematopoietic cell",
                    "count": 63,
                    "selected": false
                },
                {
                    "name": "CD31+ endothelial",
                    "count": 15,
                    "selected": false
                },
                {
                    "name": "TEMRA",
                    "count": 15,
                    "selected": false
                },
                {
                    "name": "CAFs",
                    "count": 13,
                    "selected": false
                },
                {
                    "name": "Plasma cells",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "neural cell",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "peripheral blood mononuclear cells",
                    "count": 8,
                    "selected": false
                },
                {
                    "name": "CD11b+ Macrophages/monocytes",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "CD8+ T cell",
                    "count": 7,
                    "selected": false
                },
                {
                    "name": "B Cell",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "CD11b+CD11c+DC",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "CD11c+ DC",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "CD4+ T cell",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "ILCs",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "neuron",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "arcuate artery endothelial cell",
                    "count": 5,
                    "selected": false
                },
                {
                    "name": "DENV antigen specific TEMRA",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "CD34-positive, CD38-negative hematopoietic stem cell",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "TCM",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "TEM",
                    "count": 3,
                    "selected": false
                },
                {
                    "name": "DENV antigen specific TEM",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "IL7R high TEMRA",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "IL7R low TEMRA",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "endothelial cells",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "epithelial cells",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "fibroblasts",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "inhibitory interneurons",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "monocytes",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "myofibroblasts",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 269,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 31,
            "selectedTermCount": 0
        },
        {
            "name": "workflowVersion",
            "total": 526,
            "terms": [
                {
                    "name": "v1.0.2",
                    "count": 122,
                    "selected": false
                },
                {
                    "name": "v1.0.1",
                    "count": 39,
                    "selected": false
                },
                {
                    "name": "v1.0.0",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "v2.1.0",
                    "count": 9,
                    "selected": false
                },
                {
                    "name": "v1.1.0",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "v2.2.0",
                    "count": 4,
                    "selected": false
                },
                {
                    "name": "v2.3.0",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 366,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 8,
            "selectedTermCount": 0
        },
        {
            "name": "fileFormat",
            "total": 526,
            "terms": [
                {
                    "name": "fastq.gz",
                    "count": 519,
                    "selected": false
                },
                {
                    "name": "bam",
                    "count": 172,
                    "selected": false
                },
                {
                    "name": "csv",
                    "count": 170,
                    "selected": false
                },
                {
                    "name": "bai",
                    "count": 163,
                    "selected": false
                },
                {
                    "name": "unknown",
                    "count": 158,
                    "selected": false
                },
                {
                    "name": "h5",
                    "count": 149,
                    "selected": false
                },
                {
                    "name": "mtx",
                    "count": 149,
                    "selected": false
                },
                {
                    "name": "tsv",
                    "count": 149,
                    "selected": false
                },
                {
                    "name": "matrix",
                    "count": 30,
                    "selected": false
                },
                {
                    "name": "results",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "txt",
                    "count": 14,
                    "selected": false
                },
                {
                    "name": "fastq",
                    "count": 6,
                    "selected": false
                },
                {
                    "name": "json",
                    "count": 1,
                    "selected": false
                },
                {
                    "name": "tiff",
                    "count": 1,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 14,
            "selectedTermCount": 0
        },
        {
            "name": "modelOrgan",
            "total": 526,
            "terms": [
                {
                    "name": "Brain",
                    "count": 12,
                    "selected": false
                },
                {
                    "name": "Unspecified",
                    "count": 514,
                    "selected": false
                }
            ],
            "selectedTerms": [],
            "selected": false,
            "termsByName": {},
            "termCount": 2,
            "selectedTermCount": 0
        }
    ],
    "searchTerms": [
        {
            "facetName": "organ",
            "termName": "blood",
            "count": 100
        },
        {
            "facetName": "organ",
            "termName": "bone",
            "count": 83
        },
        {
            "facetName": "organ",
            "termName": "brain",
            "count": 58
        },
        {
            "facetName": "organ",
            "termName": "heart",
            "count": 36
        },
        {
            "facetName": "organ",
            "termName": "fat",
            "count": 28
        },
        {
            "facetName": "organ",
            "termName": "lymph node",
            "count": 28
        },
        {
            "facetName": "organ",
            "termName": "pancreas",
            "count": 26
        },
        {
            "facetName": "organ",
            "termName": "tumor",
            "count": 25
        },
        {
            "facetName": "organ",
            "termName": "large intestine",
            "count": 13
        },
        {
            "facetName": "organ",
            "termName": "hemopoietic organ",
            "count": 12
        },
        {
            "facetName": "organ",
            "termName": "skin",
            "count": 10
        },
        {
            "facetName": "organ",
            "termName": "thymus",
            "count": 7
        },
        {
            "facetName": "organ",
            "termName": "Brain",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "bladder ",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "kidney",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "kidney ",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "liver",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "muscle",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "spleen ",
            "count": 6
        },
        {
            "facetName": "organ",
            "termName": "tongue ",
            "count": 5
        },
        {
            "facetName": "organ",
            "termName": "trachea ",
            "count": 5
        },
        {
            "facetName": "organ",
            "termName": "diaphragm",
            "count": 4
        },
        {
            "facetName": "organ",
            "termName": "lung ",
            "count": 4
        },
        {
            "facetName": "organ",
            "termName": "mammary gland",
            "count": 4
        },
        {
            "facetName": "organ",
            "termName": "spleen",
            "count": 4
        },
        {
            "facetName": "organ",
            "termName": "esophagus",
            "count": 3
        },
        {
            "facetName": "organ",
            "termName": "lung endomucin",
            "count": 2
        },
        {
            "facetName": "organ",
            "termName": "lung epcam",
            "count": 2
        },
        {
            "facetName": "organ",
            "termName": "Unspecified",
            "count": 25
        },
        {
            "facetName": "sampleEntityType",
            "termName": "specimens",
            "count": 501
        },
        {
            "facetName": "sampleEntityType",
            "termName": "cell_lines",
            "count": 13
        },
        {
            "facetName": "sampleEntityType",
            "termName": "organoids",
            "count": 12
        },
        {
            "searchKey": "projectId",
            "entityId": "2cd14cf5-f8e0-4c97-91a2-9e8957f41ea8",
            "entityName": "Tabula Muris",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "adabd2bd-3968-4e77-b0df-f200f7351661",
            "entityName": "1M Immune Cells",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "67bc798b-a34a-4104-8cab-cad648471f69",
            "entityName": "Mouse Melanoma",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "519b58ef-6462-4ed3-8c0d-375b54f53c31",
            "entityName": "CD4+ cytotoxic T lymphocytes",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "1f9a699a-262c-40a0-8b2c-7ba960ca388c",
            "entityName": "BM_PC",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "2c4724a4-7252-409e-b008-ff5c127c7e89",
            "entityName": "HPSI human cerebral organoids",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "a5ae0428-476c-46d2-a9f2-aad955b149aa",
            "entityName": "Healthy and type 2 diabetes pancreas",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "adb384b2-cd5e-4cf5-9205-5f066474005f",
            "entityName": "Drop-seq, DroNc-seq, Fluidigm C1 Comparison",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "3eaad325-3666-4b65-a4ed-e23ff71222c1",
            "entityName": "Multiplexed scRNA-seq with barcoded antibodies",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "08e7b6ba-5825-47e9-be2d-7978533c5f8c",
            "entityName": "Single cell transcriptome analysis of human pancreas",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "81b5f43d-3c20-4575-9efa-bfb0b070a6e3",
            "entityName": "Tissue stability",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "46c58e08-4518-4e45-acfe-bdab2434975d",
            "entityName": "1M Neurons",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "a71dee10-9a4d-4ea2-a6f3-ae7314112cf1",
            "entityName": "Human Hematopoietic Profiling",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "62aa3211-bf52-4873-9029-0bcc1d09e553",
            "entityName": "Kidney biopsy scRNA-seq",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "019a935b-ea35-4d83-be75-e1a688179328",
            "entityName": "Single cell RNAseq characterization of cell types produced over time in an in vitro model of human inhibitory interneuron differentiation.",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "ae5237b4-633f-403a-afc6-cb87e6f90db1",
            "entityName": "barista_seq",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "bf4c505a-1f32-40e3-8a29-a19a94c6dabe",
            "entityName": "staging/Smart-seq2/2019-04-10T15:14:04Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "15bd39a8-6344-4aa8-b017-3c37c0f50ce3",
            "entityName": "staging/Smart-seq2/2019-04-10T15:32:35Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "a48239a3-b08d-4e44-93e2-98229980d2bc",
            "entityName": "staging/Smart-seq2/2019-04-24T14:51:08Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "0e29d21f-fc20-41e2-973c-11dc4e9395d1",
            "entityName": "staging/Smart-seq2/2019-05-08T22:00:52Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "53e1a7c1-96b1-4430-8922-011238fb4151",
            "entityName": "staging/Smart-seq2/2019-05-13T11:00:56Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "dfae0ddf-1c08-40d4-a020-4e0a26a5c138",
            "entityName": "staging/optimus/2019-04-06T11:01:26Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "1af6d535-81f1-4a3f-8626-830ae8668867",
            "entityName": "staging/optimus/2019-04-08T22:01:24Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "2f0ed590-d78b-4ddb-885e-2d313d5c4b68",
            "entityName": "staging/optimus/2019-04-10T15:14:04Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "39a55573-a100-4912-bd57-e0d7b8d642cf",
            "entityName": "staging/optimus/2019-04-10T15:32:36Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "44c2ddd4-d916-4a27-8e0f-a9f92159e155",
            "entityName": "staging/optimus/2019-04-11T11:01:18Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "bf0e4108-3958-4b02-a577-60bdc17f7b66",
            "entityName": "staging/optimus/2019-04-24T14:51:09Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "680fd369-63b9-4381-afac-e2dda87ac2b9",
            "entityName": "staging/optimus/2019-05-07T15:55:29Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "d5b49d42-4956-4bbb-8ce4-99ae74a4d9bd",
            "entityName": "staging/optimus/2019-05-07T17:45:47Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "8ba5d300-0f75-49fe-b5fa-c7d6de136c87",
            "entityName": "staging/optimus/2019-05-08T07:06:07Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "a89d8b4d-0903-4bd9-beba-636a2a38a138",
            "entityName": "staging/optimus/2019-05-08T11:01:09Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "7808789f-dbca-4ddc-92ae-d4b05f005f36",
            "entityName": "staging/optimus/2019-05-08T22:00:54Z",
            "count": 1
        },
        {
            "searchKey": "projectId",
            "entityId": "54c7dd8c-78c0-4fd2-b84f-b1d8b28a3f6b",
            "entityName": "staging/optimus/2019-05-09T11:01:34Z",
            "count": 1
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina NovaSeq 6000",
            "count": 222
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina Hiseq X 10",
            "count": 127
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina HiSeq 2500",
            "count": 111
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina NextSeq 500",
            "count": 23
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina HiSeq 4000",
            "count": 13
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina NextSeq500",
            "count": 12
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina HiSeq 2000",
            "count": 10
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Illumina Hiseq 2500",
            "count": 8
        },
        {
            "facetName": "instrumentManufacturerModel",
            "termName": "Unspecified",
            "count": 1
        },
        {
            "facetName": "institution",
            "termName": "EMBL-EBI",
            "count": 264
        },
        {
            "facetName": "institution",
            "termName": "Biohub",
            "count": 222
        },
        {
            "facetName": "institution",
            "termName": "University of California at Santa Cruz",
            "count": 222
        },
        {
            "facetName": "institution",
            "termName": "Broad Institute",
            "count": 127
        },
        {
            "facetName": "institution",
            "termName": "University of Cambridge",
            "count": 61
        },
        {
            "facetName": "institution",
            "termName": "Wellcome Trust Sanger Institute",
            "count": 61
        },
        {
            "facetName": "institution",
            "termName": "DKFZ German Cancer Research Center",
            "count": 54
        },
        {
            "facetName": "institution",
            "termName": "University of Helsinki",
            "count": 54
        },
        {
            "facetName": "institution",
            "termName": "La Jolla Institute for Allergy and Immunology",
            "count": 28
        },
        {
            "facetName": "institution",
            "termName": "EMBL-EBI European Bioinformatics Institute",
            "count": 21
        },
        {
            "facetName": "institution",
            "termName": "University of California Santa Cruz",
            "count": 14
        },
        {
            "facetName": "institution",
            "termName": "University of California, Santa Cruz",
            "count": 13
        },
        {
            "facetName": "institution",
            "termName": "Max Planck Institute for Evolutionary Anthropology",
            "count": 12
        },
        {
            "facetName": "institution",
            "termName": "The Weizmann Institute of Science",
            "count": 12
        },
        {
            "facetName": "institution",
            "termName": "Karolinska Institutet",
            "count": 10
        },
        {
            "facetName": "institution",
            "termName": "University of Chicago",
            "count": 9
        },
        {
            "facetName": "institution",
            "termName": "New York Genome Center",
            "count": 8
        },
        {
            "facetName": "institution",
            "termName": "Stanford University",
            "count": 8
        },
        {
            "facetName": "institution",
            "termName": "MRC Cancer Unit",
            "count": 7
        },
        {
            "facetName": "institution",
            "termName": "10x Genomics, Inc.",
            "count": 6
        },
        {
            "facetName": "institution",
            "termName": "University of Washington",
            "count": 5
        },
        {
            "facetName": "institution",
            "termName": "Sloan Kettering Institute",
            "count": 3
        },
        {
            "facetName": "institution",
            "termName": "The Allen Institute for Brain Science",
            "count": 1
        },
        {
            "facetName": "institution",
            "termName": "Washington University in St. Louis",
            "count": 1
        },
        {
            "facetName": "institution",
            "termName": "Unspecified",
            "count": 1
        },
        {
            "facetName": "donorDisease",
            "termName": "Unspecified",
            "count": 526
        },
        {
            "facetName": "preservationMethod",
            "termName": "cryopreservation, other",
            "count": 28
        },
        {
            "facetName": "preservationMethod",
            "termName": "fresh",
            "count": 15
        },
        {
            "facetName": "preservationMethod",
            "termName": "cryopreservation in liquid nitrogen (dead tissue)",
            "count": 5
        },
        {
            "facetName": "preservationMethod",
            "termName": "cryopreservation of live cells in liquid nitrogen",
            "count": 3
        },
        {
            "facetName": "preservationMethod",
            "termName": "Unspecified",
            "count": 475
        },
        {
            "facetName": "genusSpecies",
            "termName": "Mus musculus",
            "count": 283
        },
        {
            "facetName": "genusSpecies",
            "termName": "Homo sapiens",
            "count": 243
        },
        {
            "facetName": "projectTitle",
            "termName": "Tabula Muris: Transcriptomic characterization of 20 organs and tissues from Mus musculus at single cell resolution",
            "count": 222
        },
        {
            "facetName": "projectTitle",
            "termName": "Census of Immune Cells",
            "count": 127
        },
        {
            "facetName": "projectTitle",
            "termName": "Melanoma infiltration of stromal and immune cells",
            "count": 54
        },
        {
            "facetName": "projectTitle",
            "termName": "Precursors of human CD4+ cytotoxic T lymphocytes identified by single-cell transcriptome analysis",
            "count": 28
        },
        {
            "facetName": "projectTitle",
            "termName": "10x 1 Run Integration Test",
            "count": 12
        },
        {
            "facetName": "projectTitle",
            "termName": "Assessing the relevance of organoids to model inter-individual variation",
            "count": 12
        },
        {
            "facetName": "projectTitle",
            "termName": "Bone marrow plasma cells from hip replacement surgeries",
            "count": 12
        },
        {
            "facetName": "projectTitle",
            "termName": "Single-cell RNA-seq analysis of human pancreas from healthy individuals and type 2 diabetes patients",
            "count": 10
        },
        {
            "facetName": "projectTitle",
            "termName": "Comparison, calibration, and benchmarking of high-throughput single cell RNA-Seq techniques for unbiased cell-type classification",
            "count": 9
        },
        {
            "facetName": "projectTitle",
            "termName": "Cell hashing with barcoded antibodies enables multiplexing and doublet detection for single cell genomics ",
            "count": 8
        },
        {
            "facetName": "projectTitle",
            "termName": "Single cell transcriptome analysis of human pancreas reveals transcriptional signatures of aging and somatic mutation patterns.",
            "count": 8
        },
        {
            "facetName": "projectTitle",
            "termName": "Ischaemic sensitivity of human tissue by single cell RNA seq",
            "count": 7
        },
        {
            "facetName": "projectTitle",
            "termName": "1.3 Million Brain Cells from E18 Mice",
            "count": 6
        },
        {
            "facetName": "projectTitle",
            "termName": "SS2 1 Cell Integration Test",
            "count": 5
        },
        {
            "facetName": "projectTitle",
            "termName": "Profiling of CD34+ cells from human bone marrow to understand hematopoiesis",
            "count": 3
        },
        {
            "facetName": "projectTitle",
            "termName": "1 FOV BaristaSeq mouse SpaceTx dataset",
            "count": 1
        },
        {
            "facetName": "projectTitle",
            "termName": "Single Cell Transcriptomics of a Human Kidney Allograft Biopsy Defines a Diverse Inflammatory Response",
            "count": 1
        },
        {
            "facetName": "projectTitle",
            "termName": "Single-cell RNA-seq analysis  throughout a 125-day differentiation protocol that converted H1 human embryonic stem cells to a variety of ventrally-derived cell types.",
            "count": 1
        },
        {
            "facetName": "modelOrganPart",
            "termName": "Unspecified",
            "count": 526
        },
        {
            "facetName": "disease",
            "termName": "H syndrome",
            "count": 17
        },
        {
            "facetName": "disease",
            "termName": "normal",
            "count": 14
        },
        {
            "facetName": "disease",
            "termName": "ESRD",
            "count": 1
        },
        {
            "facetName": "disease",
            "termName": "hemolytic uremic syndrome",
            "count": 1
        },
        {
            "facetName": "disease",
            "termName": "Unspecified",
            "count": 494
        },
        {
            "facetName": "workflow",
            "termName": "cellranger",
            "count": 137
        },
        {
            "facetName": "workflow",
            "termName": "optimus",
            "count": 16
        },
        {
            "facetName": "workflow",
            "termName": "smartseq2",
            "count": 14
        },
        {
            "facetName": "workflow",
            "termName": "Unspecified",
            "count": 366
        },
        {
            "facetName": "organPart",
            "termName": "bone marrow",
            "count": 75
        },
        {
            "facetName": "organPart",
            "termName": "umbilical cord blood",
            "count": 64
        },
        {
            "facetName": "organPart",
            "termName": "peripheral blood mononuclear cell",
            "count": 28
        },
        {
            "facetName": "organPart",
            "termName": "islet of Langerhans",
            "count": 18
        },
        {
            "facetName": "organPart",
            "termName": "amygdala",
            "count": 12
        },
        {
            "facetName": "organPart",
            "termName": "tongue taste bud",
            "count": 5
        },
        {
            "facetName": "organPart",
            "termName": "epithelium of esophagus",
            "count": 3
        },
        {
            "facetName": "organPart",
            "termName": "cortex",
            "count": 2
        },
        {
            "facetName": "organPart",
            "termName": "hippocampus",
            "count": 2
        },
        {
            "facetName": "organPart",
            "termName": "ventricular zone",
            "count": 2
        },
        {
            "facetName": "organPart",
            "termName": "cortex of kidney ",
            "count": 1
        },
        {
            "facetName": "organPart",
            "termName": "Unspecified",
            "count": 314
        },
        {
            "facetName": "publicationTitle",
            "termName": "Unspecified",
            "count": 526
        },
        {
            "facetName": "cellLineType",
            "termName": "induced pluripotent",
            "count": 14
        },
        {
            "facetName": "cellLineType",
            "termName": "primary",
            "count": 9
        },
        {
            "facetName": "cellLineType",
            "termName": "stem cell-derived",
            "count": 7
        },
        {
            "facetName": "cellLineType",
            "termName": "stem cell",
            "count": 4
        },
        {
            "facetName": "cellLineType",
            "termName": "Unspecified",
            "count": 501
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "Smart-seq2",
            "count": 327
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "10X v2 sequencing",
            "count": 149
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "10x_v2",
            "count": 14
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "Chromium 3' Single Cell v2",
            "count": 12
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "MARS-seq",
            "count": 12
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "DroNc-seq ",
            "count": 8
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "Drop-seq ",
            "count": 8
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "High-throughput single-cell labeling with indexing droplets",
            "count": 1
        },
        {
            "facetName": "libraryConstructionApproach",
            "termName": "Unspecified",
            "count": 2
        },
        {
            "facetName": "biologicalSex",
            "termName": "male",
            "count": 242
        },
        {
            "facetName": "biologicalSex",
            "termName": "female",
            "count": 237
        },
        {
            "facetName": "biologicalSex",
            "termName": "unknown",
            "count": 47
        },
        {
            "facetName": "projectDescription",
            "termName": "Unspecified",
            "count": 526
        },
        {
            "facetName": "selectedCellType",
            "termName": "umbilical cord blood cell",
            "count": 64
        },
        {
            "facetName": "selectedCellType",
            "termName": "bone marrow hematopoietic cell",
            "count": 63
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD31+ endothelial",
            "count": 15
        },
        {
            "facetName": "selectedCellType",
            "termName": "TEMRA",
            "count": 15
        },
        {
            "facetName": "selectedCellType",
            "termName": "CAFs",
            "count": 13
        },
        {
            "facetName": "selectedCellType",
            "termName": "Plasma cells",
            "count": 12
        },
        {
            "facetName": "selectedCellType",
            "termName": "neural cell",
            "count": 12
        },
        {
            "facetName": "selectedCellType",
            "termName": "peripheral blood mononuclear cells",
            "count": 8
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD11b+ Macrophages/monocytes",
            "count": 7
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD8+ T cell",
            "count": 7
        },
        {
            "facetName": "selectedCellType",
            "termName": "B Cell",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD11b+CD11c+DC",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD11c+ DC",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD4+ T cell",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "ILCs",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "neuron",
            "count": 6
        },
        {
            "facetName": "selectedCellType",
            "termName": "arcuate artery endothelial cell",
            "count": 5
        },
        {
            "facetName": "selectedCellType",
            "termName": "DENV antigen specific TEMRA",
            "count": 4
        },
        {
            "facetName": "selectedCellType",
            "termName": "CD34-positive, CD38-negative hematopoietic stem cell",
            "count": 3
        },
        {
            "facetName": "selectedCellType",
            "termName": "TCM",
            "count": 3
        },
        {
            "facetName": "selectedCellType",
            "termName": "TEM",
            "count": 3
        },
        {
            "facetName": "selectedCellType",
            "termName": "DENV antigen specific TEM",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "IL7R high TEMRA",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "IL7R low TEMRA",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "endothelial cells",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "epithelial cells",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "fibroblasts",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "inhibitory interneurons",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "monocytes",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "myofibroblasts",
            "count": 1
        },
        {
            "facetName": "selectedCellType",
            "termName": "Unspecified",
            "count": 269
        },
        {
            "facetName": "workflowVersion",
            "termName": "v1.0.2",
            "count": 122
        },
        {
            "facetName": "workflowVersion",
            "termName": "v1.0.1",
            "count": 39
        },
        {
            "facetName": "workflowVersion",
            "termName": "v1.0.0",
            "count": 12
        },
        {
            "facetName": "workflowVersion",
            "termName": "v2.1.0",
            "count": 9
        },
        {
            "facetName": "workflowVersion",
            "termName": "v1.1.0",
            "count": 6
        },
        {
            "facetName": "workflowVersion",
            "termName": "v2.2.0",
            "count": 4
        },
        {
            "facetName": "workflowVersion",
            "termName": "v2.3.0",
            "count": 1
        },
        {
            "facetName": "workflowVersion",
            "termName": "Unspecified",
            "count": 366
        },
        {
            "facetName": "fileFormat",
            "termName": "fastq.gz",
            "count": 519
        },
        {
            "facetName": "fileFormat",
            "termName": "bam",
            "count": 172
        },
        {
            "facetName": "fileFormat",
            "termName": "csv",
            "count": 170
        },
        {
            "facetName": "fileFormat",
            "termName": "bai",
            "count": 163
        },
        {
            "facetName": "fileFormat",
            "termName": "unknown",
            "count": 158
        },
        {
            "facetName": "fileFormat",
            "termName": "h5",
            "count": 149
        },
        {
            "facetName": "fileFormat",
            "termName": "mtx",
            "count": 149
        },
        {
            "facetName": "fileFormat",
            "termName": "tsv",
            "count": 149
        },
        {
            "facetName": "fileFormat",
            "termName": "matrix",
            "count": 30
        },
        {
            "facetName": "fileFormat",
            "termName": "results",
            "count": 14
        },
        {
            "facetName": "fileFormat",
            "termName": "txt",
            "count": 14
        },
        {
            "facetName": "fileFormat",
            "termName": "fastq",
            "count": 6
        },
        {
            "facetName": "fileFormat",
            "termName": "json",
            "count": 1
        },
        {
            "facetName": "fileFormat",
            "termName": "tiff",
            "count": 1
        },
        {
            "facetName": "modelOrgan",
            "termName": "Brain",
            "count": 12
        },
        {
            "facetName": "modelOrgan",
            "termName": "Unspecified",
            "count": 514
        }
    ],
    "tableModel": {
        "data": [
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
                        "workflowVersion": []
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
                            "MRC Cancer Unit",
                            "Human Cell Atlas Data Coordination Platform",
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1104_LN",
                        "organ": "lymph node",
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
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "41473905-e0ba-43cf-82d5-77d8c435e7b9",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1104_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
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
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "2237e2d5-6dd3-41b9-8e62-16ec64ef4623",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1107_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
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
                            "1107"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "CD8+ T cell"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "8a5428f4-c5c5-4f73-8051-d80ee0318dc9",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1107_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
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
                            "1107"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "CD8+ T cell"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "ee68234c-dd7f-4355-ae8c-2c357c9de0e3",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1108_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
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
                            "1108"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "ILCs"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "0777301c-ca50-4ebf-bd82-1a1ebfe3fe0e",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1108_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
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
                            "1108"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "ILCs"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "ac933823-75f7-4639-99f9-df6e877a744d",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1110_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
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
                            "1110"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "B Cell"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "5130a0a4-dfd7-4127-85b7-7c8521a92cac",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1110_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
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
                            "1110"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "B Cell"
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "3a88cb9f-394a-49a6-ba36-7dca5dbf94c4",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1112_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1112_LN"
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
                            "1112"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "CD11b+CD11c+DC"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 10955528686
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "ab511a31-2aba-4a26-a333-49d62420895c",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1113_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1113_T"
                        ],
                        "organ": [
                            "tumor"
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
                            "1113"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "CD11b+CD11c+DC"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 7271723177
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "ba078193-c0d6-4e17-8bfb-6376c3d6a75a",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1115_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1115_LN"
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
                            "1115"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "CD11c+ DC"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 4299389989
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "9e8e28fe-f778-429c-a8cd-7f7b4a3294e4",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1115_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1115_T"
                        ],
                        "organ": [
                            "tumor"
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
                            "1115"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "CD11c+ DC"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 5317596803
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "b2b10c2a-8b3c-42ee-98f0-b2161069d4c1",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1117_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1117_LN"
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
                            "1117"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "selectedCellType": [
                            "CD11b+ Macrophages/monocytes"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 510451750
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "8db748de-87a4-42a5-a841-9b46b7d457af",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1117_T",
                        "organ": "tumor",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1117_T"
                        ],
                        "organ": [
                            "tumor"
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
                            "1117"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
                        "disease": null
                    }
                ],
                "organoids": [],
                "cellSuspensions": [
                    {
                        "organ": [
                            "tumor"
                        ],
                        "organPart": [],
                        "selectedCellType": [
                            "CD11b+ Macrophages/monocytes"
                        ],
                        "totalCells": 91
                    }
                ],
                "fileTypeSummaries": [
                    {
                        "fileType": "fastq.gz",
                        "count": 182,
                        "totalSize": 4602641978
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
                        "workflow": [],
                        "workflowVersion": []
                    }
                ],
                "entryId": "2aa7dbdc-5deb-47e8-9e71-f453d99d120c",
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
                            "Sarah Teichmann"
                        ]
                    }
                ],
                "samples": [
                    {
                        "sampleEntityType": "specimens",
                        "id": "1118_LN",
                        "organ": "lymph node",
                        "organPart": [],
                        "disease": [],
                        "preservationMethod": null,
                        "source": "specimen_from_organism"
                    }
                ],
                "specimens": [
                    {
                        "id": [
                            "1118_LN"
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
                            "1118"
                        ],
                        "genusSpecies": [
                            "Mus musculus"
                        ],
                        "organismAge": [
                            "6-12"
                        ],
                        "biologicalSex": [
                            "female"
                        ],
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
                        "totalSize": 4403772209
                    }
                ]
            }
        ],
        "pagination": {
            "count": 15,
            "total": 526,
            "size": 15,
            "search_after": "1118_LN",
            "search_after_uid": "doc#2aa7dbdc-5deb-47e8-9e71-f453d99d120c",
            "search_before": null,
            "search_before_uid": null,
            "pages": 36,
            "sort": "sampleId",
            "order": "asc"
        },
        "tableName": "samples",
        "termCountsByFacetName": new Map()
    }
};

function buildDefaultProjectsEntitySearchResults(json): EntitySearchResults {

    const fileFacets = json.fileFacets.map(facet => {

        const terms = facet.terms.map(term => {
            return new Term(term.name, term.count, term.selected);
        });
        
        return new FileFacet(facet.name, facet.total, terms);
    }); 

    return {
        facets: fileFacets as any,
        searchEntities: [],
        searchTerms: [],
        tableModel: json.tableModel
    };
}

export const DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS =
    buildDefaultProjectsEntitySearchResults(DEFAULT_PROJECTS_ENTITY_SEARCH_RESULTS_JSON);
