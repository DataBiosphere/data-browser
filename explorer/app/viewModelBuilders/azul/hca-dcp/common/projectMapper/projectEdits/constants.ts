import { AnalysisPortal, ANALYSIS_PORTAL, ProjectEdit } from "./entities";

const cellxgeneIcon = "/images/icons/cellxgene.svg";
const lungmapIcon = "/images/icons/lungmap.svg";
const stemCellHubIcon = "/images/icons/stem.svg";
const ucscCellBrowserIcon = "/images/icons/ucsc-cell.svg";
const genomeBrowserIcon = "/images/icons/ucsc-genome.svg";

/**
 * Cell By Gene analysis portal.
 */
const CELLXGENE: Omit<AnalysisPortal, "url"> = {
  icon: cellxgeneIcon,
  label: "Cellxgene",
  name: ANALYSIS_PORTAL.CELLXGENE,
};

/**
 * Genome Browser analysis portal.
 */
const GENOME_BROWSER: Omit<AnalysisPortal, "url"> = {
  icon: genomeBrowserIcon,
  label: "Genome Browser",
  name: ANALYSIS_PORTAL.GENOME_BROWSER,
};

/**
 * LungMAP Apps analysis portal.
 */
const LUNGMAP_APPS: Omit<AnalysisPortal, "url"> = {
  icon: lungmapIcon,
  label: "LungMAP Apps",
  name: ANALYSIS_PORTAL.LUNGMAP_APPS,
};

/**
 * Stem Cell Hub analysis portal.
 */
const STEM_CELL_HUB: Omit<AnalysisPortal, "url"> = {
  icon: stemCellHubIcon,
  label: "Stem Cell Hub",
  name: ANALYSIS_PORTAL.STEM_CELL_HUB,
};

/**
 * UCSC Cell Browser analysis portal.
 */
const UCSC_CELL_BROWSER: Omit<AnalysisPortal, "url"> = {
  icon: ucscCellBrowserIcon,
  label: "UCSC Cell Browser",
  name: ANALYSIS_PORTAL.UCSC_CELL_BROWSER,
};

/**
 * Project edits.
 */
export const projectEdits: ProjectEdit[] = [
  {
    entryId: "f8aa201c-4ff1-45a4-890e-840d63459ca2",
    publications: [
      {
        publicationTitle:
          "Structural Remodeling of the Human Colonic Mesenchyme in Inflammatory Bowel Disease",
        publicationUrl:
          "https://www.sciencedirect.com/science/article/pii/S0092867418311681?via%3Dihub",
      },
    ],
  },
  {
    entryId: "091cf39b-01bc-42e5-9437-f419a66c8a45",
    publications: [
      {
        publicationTitle:
          "Characterization of cell fate probabilities in single-cell data with Palantir",
        publicationUrl: "https://www.nature.com/articles/s41587-019-0068-4",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://tissue-stability.cells.ucsc.edu",
      },
    ],
    contributors: [
      {
        contactName: "Sarah,A,Teichmann",
        projectRole: "Co-investigator",
      },
    ],
    entryId: "c4077b3c-5c98-4d26-a614-246d12c2e5d7",
    publications: [
      {
        publicationTitle:
          "scRNA-seq assessment of the human lung, spleen, and esophagus tissue stability after cold preservation",
        publicationUrl:
          "https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1906-x",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://placenta-decidua.cells.ucsc.edu",
      },
    ],
    entryId: "f83165c5-e2ea-4d15-a5cf-33f3550bffde",
    publications: [
      {
        publicationTitle:
          "Single-cell reconstruction of the early maternal–fetal interface in humans",
        publicationUrl: "https://www.nature.com/articles/s41586-018-0698-6",
      },
    ],
  },
  {
    entryId: "4a95101c-9ffc-4f30-a809-f04518a23803",
    publications: [
      {
        publicationTitle:
          "Single-cell transcriptomics of human T cells reveals tissue and activation signatures in health and disease",
        publicationUrl: "https://www.nature.com/articles/s41467-019-12464-3",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-liver.cells.ucsc.edu",
      },
    ],
    contributors: [
      {
        contactName: "Jeff,C,Liu",
        projectRole: "Computational Scientist",
      },
      {
        contactName: "Brendan,T,Innes",
        projectRole: "Computational Scientist",
      },
    ],
    entryId: "4d6f6c96-2a83-43d8-8fe1-0f53bffd4674",
  },
  {
    entryId: "008e40e8-66ae-43bb-951c-c073a2fa6774",
    projectShortname: "RNA-seq of human embryonic heart, lung, and cerebellum",
    redirectUrl: "https://ega-archive.org/studies/EGAS00001004375",
    withdrawn: true,
  },
  {
    deprecated: true,
    entryId: "29f53b7e-071b-44b5-998a-0ae70d0229a4",
    projectShortname:
      "Profiling of CD34+ cells from human bone marrow to understand hematopoiesis",
    supersededBy: "091cf39b-01bc-42e5-9437-f419a66c8a45",
  },
  {
    deprecated: true,
    entryId: "dd7ada84-3f14-4765-b7ce-9b64642bb3dc",
    projectShortname:
      "Single-nucleus RNA-seq profiling of the human primary motor cortex in amyotrophic lateral sclerosis and frontotemporal lobar degeneration",
  },
  {
    duplicateOf: "a004b150-1c36-4af6-9bbd-070c06dbc17d",
    entryId: "9bab0f03-a725-4a13-9ab1-196e46cd80ed",
  },
  {
    duplicateOf: "504e0cee-1688-40fa-b936-361c4a831f87",
    entryId: "992aad5e-7fab-46d9-a47d-df715e8cfd24",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-ileum.cells.ucsc.edu",
      },
    ],
    entryId: "504e0cee-1688-40fa-b936-361c4a831f87",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://ms.cells.ucsc.edu",
      },
    ],
    entryId: "ce7b12ba-664f-4f79-8fc7-3de6b1892183",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://kidney-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "abe1a013-af7a-45ed-8c26-f3793c24a1f4",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://gut-cell-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "83f5188e-3bf7-4956-9544-cea4f8997756",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://adult-retina.cells.ucsc.edu",
      },
    ],
    entryId: "8185730f-4113-40d3-9cc3-929271784c2b",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-pancreas.cells.ucsc.edu",
      },
    ],
    entryId: "f86f1ab4-1fbb-4510-ae35-3ffd752d4dfc",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://mouse-gastrulation.cells.ucsc.edu",
      },
    ],
    entryId: "1defdada-a365-44ad-9b29-443b06bd11d6",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://heart-cell-atlas.cells.ucsc.edu",
      },
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b52eb423-5d0d-4645-b217-e1c6d38b2e72",
      },
    ],
    entryId: "ad98d3cd-26fb-4ee3-99c9-8a2ab085e737",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://fetal-liver.cells.ucsc.edu",
      },
    ],
    entryId: "f2fe82f0-4454-4d84-b416-a885f3121e59",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cells.ucsc.edu/?ds=adultPancreas",
      },
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a238e9fa-2bdf-41df-8522-69046f99baff",
      },
      {
        ...STEM_CELL_HUB,
        url: "https://cirm.ucsc.edu/cgi-bin/cdwGetFile/quakeAdultAgingPancreas1/summary/index.html",
      },
    ],
    entryId: "cddab57b-6868-4be4-806f-395ed9dd635a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cells.ucsc.edu/?ds=hca-lungmap-integrated+pancreas",
      },
    ],
    entryId: "ae71be1d-ddd8-4feb-9bed-24c3ddb6e1ad",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://tabulamuris.cells.ucsc.edu",
      },
      {
        ...GENOME_BROWSER,
        url: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=mm10&tabulamurisBarChart=pack",
      },
    ],
    entryId: "e0009214-c0a0-4a7b-96e2-d6a83e966ce0",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://lung-pf-control.cells.ucsc.edu",
      },
    ],
    entryId: "c1a9a93d-d9de-4e65-9619-a9cec1052eaa",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://oligodendrocyte-ms.cells.ucsc.edu",
      },
    ],
    entryId: "38449aea-70b5-40db-84b3-1e08f32efe34",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-influenza-response.cells.ucsc.edu",
      },
    ],
    entryId: "95f07e6e-6a73-4e1b-a880-c83996b3aa5c",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://fetal-thymus.cells.ucsc.edu",
      },
    ],
    entryId: "c1810dbc-16d2-45c3-b45e-3e675f88d87b",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://quake-gbm.cells.ucsc.edu",
      },
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/558385a4-b7b7-4eca-af0c-9e54d010e8dc",
      },
    ],
    entryId: "2d846095-8a33-4f3c-97d4-585bafac13b4",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-smoking.cells.ucsc.edu",
      },
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/cdfb9ead-cb58-4a53-879d-5e4ed5329e73",
      },
      {
        ...STEM_CELL_HUB,
        url: "https://cirm.ucsc.edu/cgi-bin/cdwGetFile/gompertsLungOrganoids/summary/index.html",
      },
    ],
    entryId: "2a64db43-1b55-4639-aabb-8dba0145689d",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-fovea-periphery.cells.ucsc.edu",
      },
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/7edef704-f63a-462c-8636-4bc86a9472bd",
      },
    ],
    entryId: "4bec484d-ca7a-47b4-8d48-8830e06ad6db",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://preimplant-embryos.cells.ucsc.edu",
      },
    ],
    entryId: "03c6fce7-789e-4e78-a27a-664d562bb738",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://skeletal-muscle.cells.ucsc.edu",
      },
      {
        ...STEM_CELL_HUB,
        url: "https://cirm.ucsc.edu/cgi-bin/cdwGetFile/pyleSkeletalMuscle/summary/index.html",
      },
    ],
    entryId: "4037007b-0eff-4e6d-b7bd-8dd8eec80143",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cells.ucsc.edu/?ds=hca-lungmap-integrated+placenta-rockefeller",
      },
    ],
    entryId: "1cd1f41f-f81a-486b-a05b-66ec60f81dcf",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://aging-human-skin.cells.ucsc.edu",
      },
    ],
    entryId: "3138bf07-b24a-49c8-b1f3-61329d7abc3b",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://healthy-human-skin.cells.ucsc.edu",
      },
    ],
    entryId: "d4222caa-3813-4f66-a25a-572c1d287c1d",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-cellular-landscape.cells.ucsc.edu",
      },
    ],
    entryId: "1fac187b-1c3f-41c4-b6b6-6a9a8c0489d1",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://kidney-inflamm-response.cells.ucsc.edu",
      },
    ],
    entryId: "027c51c6-0719-469f-a7f5-640fe57cbece",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://h1-esc-diff.cells.ucsc.edu",
      },
    ],
    entryId: "2043c65a-1cf8-4828-a656-9e247d4e64f1",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/c9706a92-0e5f-46c1-96d8-20e42467f287",
      },
    ],
    entryId: "a004b150-1c36-4af6-9bbd-070c06dbc17d",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/db468083-041c-41ca-8f6f-bf991a070adf",
      },
    ],
    entryId: "87d52a86-bdc7-440c-b84d-170f7dc346d9",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://www.covid19cellatlas.org/voigt19/",
      },
    ],
    entryId: "7880637a-35a1-4047-b422-b5eac2a2a358",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/d/fetal_maternal_interface_10x-22.cxg/",
      },
    ],
    entryId: "f83165c5-e2ea-4d15-a5cf-33f3550bffde",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/c114c20f-1ef4-49a5-9c2e-d965787fb90c",
      },
    ],
    entryId: "a9301beb-e9fa-42fe-b75c-84e8a460c733",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/24d42e5e-ce6d-45ff-a66b-a3b3b715deaf",
      },
    ],
    entryId: "4a95101c-9ffc-4f30-a809-f04518a23803",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/af893e86-8e9f-41f1-a474-ef05359b1fb7",
      },
    ],
    entryId: "9c20a245-f2c0-43ae-82c9-2232ec6b594f",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/48d354f5-a5ca-4f35-a3bb-fa3687502252",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://app.lungmap.net/app/shinycell-mm-timecourse",
      },
    ],
    entryId: "00f056f2-73ff-43ac-97ff-69ca10e38c89",
  },
  {
    analysisPortals: [
      {
        ...CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/6e067060-f7e4-466c-86f3-ec3dd33c0381",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://app.lungmap.net/app/shinycell-rhesuslung",
      },
    ],
    entryId: "26204979-55a3-49b2-8d2b-53e0bdfcb176",
  },
];
