import { ANALYSIS_PORTAL, AnalysisPortal, ProjectEdit } from "./entities";

const cxgIcon = "/images/icons/cxg.png";
const genomeBrowserIcon = "/images/icons/ucsc-genome.svg";
const lgeaIcon = "/images/icons/lgea.png";
const lungmapIcon = "/images/icons/lungmap.svg";
const shinyIcon = "/images/icons/shiny.png";
const singleCellIcon = "/images/icons/single-cell.png";
const stemCellHubIcon = "/images/icons/stem.svg";
const toppCellIcon = "/images/icons/toppcell.png";
const ucscCellBrowserIcon = "/images/icons/ucsc-cell.svg";

/**
 * CZ CELLxGENE analysis portal.
 */
export const CZ_CELLXGENE: Omit<AnalysisPortal, "url"> = {
  icon: cxgIcon,
  label: "CZ CELLxGENE",
  name: ANALYSIS_PORTAL.CZ_CELLXGENE,
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
 * LGEA analysis portal.
 */
const LGEA: Omit<AnalysisPortal, "url"> = {
  icon: lgeaIcon,
  label: "LGEA",
  name: ANALYSIS_PORTAL.LGEA,
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
 * Shiny analysis portal.
 */
const SHINY: Omit<AnalysisPortal, "url"> = {
  icon: shinyIcon,
  label: "Shiny",
  name: ANALYSIS_PORTAL.SHINY,
};

/**
 * Single Cell analysis portal.
 */
const SINGLE_CELL: Omit<AnalysisPortal, "url"> = {
  icon: singleCellIcon,
  label: "Single Cell Portal",
  name: ANALYSIS_PORTAL.SINGLE_CELL,
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
 * ToppCell analysis portal.
 */
const TOPPCELL: Omit<AnalysisPortal, "url"> = {
  icon: toppCellIcon,
  label: "ToppCell",
  name: ANALYSIS_PORTAL.TOPPCELL,
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
 * Project edits to be used as a basis when generating the full list of project edits.
 */
export const baseProjectEdits: ProjectEdit[] = [
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/4d74781b-8186-4c9a-b659-ff4dc4601d91",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a9254216-6cd8-4186-b32c-349363777584",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://placenta-decidua.cells.ucsc.edu",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?db=hg38&g=placentaVentoTormo&position=default",
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
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/24d42e5e-ce6d-45ff-a66b-a3b3b715deaf",
      },
    ],
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/bd5230f4-cd76-4d35-9ee5-89b3e7475659",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/2b02dff7-e427-4cdc-96fb-c0f354c099aa",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/120e86b4-1195-48c5-845b-b98054105eec",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?db=hg38&g=kidneyStewart&position=default",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/7681c7d7-0168-4892-a547-6f02a6430ace",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/3472f32d-4a33-48e2-aad5-666d4631bf4c",
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b52eb423-5d0d-4645-b217-e1c6d38b2e72",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?db=hg38&g=heartCellAtlas&position=default",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://heart-cell-atlas.cells.ucsc.edu",
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a238e9fa-2bdf-41df-8522-69046f99baff",
      },
      {
        ...STEM_CELL_HUB,
        url: "https://cirm.ucsc.edu/cgi-bin/cdwGetFile/quakeAdultAgingPancreas1/summary/index.html",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://adultPancreas.cells.ucsc.edu",
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
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTracks?db=mm10&tabulamurisBarChart=pack",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://tabulamuris.cells.ucsc.edu",
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/16c1e722-96ae-4bf6-b408-cd7f8918484f",
      },
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
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/4f889ffc-d4bc-4748-905b-8eb9db47a2ed",
      },
    ],
    entryId: "95f07e6e-6a73-4e1b-a880-c83996b3aa5c",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/de13e3e2-23b6-40ed-a413-e9e12d7d3910",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/558385a4-b7b7-4eca-af0c-9e54d010e8dc",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://quake-gbm.cells.ucsc.edu",
      },
    ],
    entryId: "2d846095-8a33-4f3c-97d4-585bafac13b4",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/cdfb9ead-cb58-4a53-879d-5e4ed5329e73",
      },
      {
        ...STEM_CELL_HUB,
        url: "https://cirm.ucsc.edu/cgi-bin/cdwGetFile/gompertsLungOrganoids/summary/index.html",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-smoking.cells.ucsc.edu",
      },
    ],
    entryId: "2a64db43-1b55-4639-aabb-8dba0145689d",
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/38833785-fac5-48fd-944a-0f62a4c23ed1",
      },
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
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/c9706a92-0e5f-46c1-96d8-20e42467f287",
      },
    ],
    entryId: "a004b150-1c36-4af6-9bbd-070c06dbc17d",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/db468083-041c-41ca-8f6f-bf991a070adf",
      },
    ],
    entryId: "87d52a86-bdc7-440c-b84d-170f7dc346d9",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/f8057c47-fcd8-4fcf-88b0-e2f930080f6e",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://retinal-pigment-epi.cells.ucsc.edu",
      },
    ],
    entryId: "7880637a-35a1-4047-b422-b5eac2a2a358",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/c114c20f-1ef4-49a5-9c2e-d965787fb90c",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?hgsid=1280204515_ghYsRY4Rvd6xWbNT4JaYmq8NbAb3&db=hg38&c=chr12&g=fetalGeneAtlas",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://fetal-gene-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "a9301beb-e9fa-42fe-b75c-84e8a460c733",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/af893e86-8e9f-41f1-a474-ef05359b1fb7",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://retina-atac.cells.ucsc.edu/",
      },
    ],
    entryId: "9c20a245-f2c0-43ae-82c9-2232ec6b594f",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/8191c283-0816-424b-9b61-c3e1d6258a77",
      },
    ],
    entryId: "e9f36305-d857-44a3-93f0-df4e6007dc97",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/48d354f5-a5ca-4f35-a3bb-fa3687502252",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://lungmap.net/breath-omics-experiment-page/?experiment_id=LMEX0000004391",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-mm-timecourse",
      },
      {
        ...TOPPCELL,
        url: "https://toppcell.cchmc.org/biosystems/go/index3/shred/czidl/Lungmap/Output%20by%20developmental_time%20by%20Lineage%20by%20Cell%20group%20by%20Cell%20type-2",
      },
    ],
    entryId: "00f056f2-73ff-43ac-97ff-69ca10e38c89",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/6e067060-f7e4-466c-86f3-ec3dd33c0381",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://lungmap.net/breath-omics-experiment-page/?experiment_id=LMEX0000004394",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-rhesuslung",
      },
      {
        ...TOPPCELL,
        url: "https://toppcell.cchmc.org/biosystems/go/index3/shred/Lungmap_PretermPrimateLungAtlas/Output%20by%20treatmentGroup%20by%20Lineage%20by%20cell_type_level1%20by%20cell_type_level2-4",
      },
    ],
    entryId: "26204979-55a3-49b2-8d2b-53e0bdfcb176",
  },
  {
    analysisPortals: [
      {
        ...LGEA,
        url: "https://research.cchmc.org/pbge/lunggens/SCLAB.html",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://lungmap.net/breath-omics-experiment-page/?experiment_id=LMEX0000001222",
      },
    ],
    entryId: "1bdcecde-16be-4208-88f4-78cd2133d11d",
  },
  {
    analysisPortals: [
      {
        ...LGEA,
        url: "https://research.cchmc.org/pbge/lunggens/LM2/scrna_cellquery.html",
      },
      {
        ...LUNGMAP_APPS,
        url: "https://lungmap.net/breath-omics-experiment-page/?experiment_id=LMEX0000004388",
      },
      {
        ...SHINY,
        url: "https://devapp.lungmap.net/app/shinycell-lungmap-single-cell-multiomic",
      },
      {
        ...TOPPCELL,
        url: "https://toppcell.cchmc.org/biosystems/go/index3/shred/single_cell_projects/Lung_development_from_XinSun/Output%20by%20Lineage%20by%20Cell%20type%20by%20age%20group%20by%20donor-2",
      },
    ],
    entryId: "20037472-ea1d-4ddb-9cd3-56a11a6f0f76",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/e2a4a67f-6a18-431a-ab9c-6e77dd31cc80",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://prostate-prostatic-urethra.cells.ucsc.edu",
      },
    ],
    entryId: "53c53cd4-8127-4e12-bc7f-8fe1610a715c",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/9b02383a-9358-4f0f-9795-a891ec523bcc",
      },
    ],
    entryId: "2af52a13-65cb-4973-b513-39be38f2df3f",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/1b014f39-f202-45ae-bb7d-9286bddd8d8b",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cbl-dev.cells.ucsc.edu",
      },
    ],
    entryId: "85a9263b-0887-48ed-ab1a-ddfa773727b6",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://www.nupulmonary.org/resources/?ds=fig1",
      },
    ],
    entryId: "daf9d982-7ce6-43f6-ab51-272577290606",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/03f821b4-87be-4ff4-b65a-b5fc00061da7",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-infection-response.cells.ucsc.edu",
      },
    ],
    entryId: "1538d572-bcb7-426b-8d2c-84f3a7f87bb0",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/44531dd9-1388-4416-a117-af0a99de2294",
      },
    ],
    entryId: "8a666b76-daaf-4b1f-9414-e4807a1d1e8b",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/436154da-bcf1-4130-9c8b-120ff9a888f2",
      },
    ],
    entryId: "9fc0064b-84ce-40a5-a768-e6eb3d364ee0",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/83ed3be8-4cb9-43e6-9aaa-3fbbf5d1bd3a",
      },
    ],
    entryId: "dbd836cf-bfc2-41f0-9834-41cc6c0b235a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://teichmann-asthma.cells.ucsc.edu",
      },
    ],
    entryId: "c0518445-3b3b-49c6-b8fc-c41daa4eacba",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/e5f58829-1a66-40b5-a624-9046778e74f5",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?hgsid=1437536541_FfasmBrAlAiA7oFphu1csVv0KHgc&db=hg38&c=chrX&g=tabulaSapiens",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://tabula-sapiens.cells.ucsc.edu/",
      },
    ],
    entryId: "10201832-7c73-4033-9b65-3ef13d81656a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://airway-cf.cells.ucsc.edu",
      },
    ],
    entryId: "e526d91d-cf3a-44cb-80c5-fd7676b55a1d",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/c353707f-09a4-4f12-92a0-cb741e57e5f0",
      },
      {
        ...GENOME_BROWSER,
        url: "https://genome.ucsc.edu/cgi-bin/hgTrackUi?db=hg38&g=skinSoleBoldo&position=default",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://aging-human-skin.cells.ucsc.edu",
      },
    ],
    entryId: "51f02950-ee25-4f4b-8d07-59aa99bb3498",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://colorectal-cancer.cells.ucsc.edu",
      },
    ],
    entryId: "c715cd2f-dc7c-44a6-9cd5-b6a6d9f075ae",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/ddfad306-714d-4cc0-9985-d9072820c530",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-pbmc.cells.ucsc.edu",
      },
    ],
    entryId: "b963bd4b-4bc1-4404-8425-69d74bc636b8",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a3ffde6c-7ad2-498a-903c-d58e732f7470",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cross-tissue-maps.cells.ucsc.edu",
      },
    ],
    entryId: "31887183-a72c-4308-9eac-c6140313f39c",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/33d19f34-87f5-455b-8ca5-9023a2e5453d",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-colon.cells.ucsc.edu",
      },
    ],
    entryId: "cd61771b-661a-4e19-b269-6e5d95350de6",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/64b24fda-6591-4ce1-89e7-33eb6c43ad7b",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://intestine-epithelium.cells.ucsc.edu",
      },
    ],
    entryId: "73769e0a-5fcd-41f4-9083-41ae08bfa4c1",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/fc77d2ae-247d-44d7-aa24-3f4859254c2c",
      },
    ],
    entryId: "21ea8ddb-525f-4f1f-a820-31f0360399a2",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/2902f08c-f83c-470e-a541-e463e25e5058",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://ovarian-follicle-recon.cells.ucsc.edu",
      },
    ],
    entryId: "faeedcb0-e046-4be7-b1ad-80a3eeabb066",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/2f4c738f-e2f3-4553-9db2-0582a38ea4dc",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://roska-retina-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "1dddae6e-3753-48af-b20e-fa22abad125d",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/32f2fd23-ec74-486f-9544-e5b2f41725f5",
      },
    ],
    entryId: "2b38025d-a5ea-4c0f-b22e-367824bcaf4c",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/793fdaec-5067-428a-a9db-ecefe135c945",
      },
    ],
    entryId: "04ad400c-58cb-40a5-bc2b-2279e13a910b",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/e33ffcd3-7cbf-4b8c-b0f4-85587ad5019a",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://intestine-fetal-adult.cells.ucsc.edu",
      },
    ],
    entryId: "fde199d2-a841-4ed1-aa65-b9e0af8969b1",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/60358420-6055-411d-ba4f-e8ac80682a2e",
      },
    ],
    entryId: "fa3f460f-4fb9-4ced-b548-8ba6a8ecae3f",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/6ff3401b-d72c-4940-a00c-3f0792397082",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://eils-lung.cells.ucsc.edu",
      },
    ],
    entryId: "58028aa8-0ed2-49ca-b60f-15e2ed5989d5",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a261413d-835b-4f1e-ab0c-dada55ea6afd",
      },
    ],
    entryId: "2084526b-a66f-4c40-bb89-6fd162f2eb38",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b1a879f6-5638-48d3-8f64-f6592c1b1561",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://fetal-immune.cells.ucsc.edu",
      },
    ],
    entryId: "fcaa53cd-ba57-4bfe-af9c-eaa958f95c1a",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a98b828a-622a-483a-80e0-15703678befd",
      },
    ],
    entryId: "29ed827b-c539-4f4c-bb6b-ce8f9173dfb7",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://hippo-lifespan.cells.ucsc.edu",
      },
    ],
    entryId: "258c5e15-d125-4f2d-8b4c-e3122548ec9b",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/eb735cc9-d0a7-48fa-b255-db726bf365af",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-autoimmune-pbmc.cells.ucsc.edu",
      },
    ],
    entryId: "2d4d89f2-ebeb-467c-ae60-a3efc5e8d4ba",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/63d03351-06be-478e-a0db-f7a653b6b19b",
      },
    ],
    entryId: "16e99159-78bc-44aa-b479-55a5e903bf50",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/3a2af25b-2338-4266-aad3-aa8d07473f50",
      },
    ],
    entryId: "24d0dbbc-54eb-4904-8141-934d26f1c936",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/dde06e0f-ab3b-46be-96a2-a8082383c4a1",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://eqtl-autoimmune.cells.ucsc.edu",
      },
    ],
    entryId: "f2078d5f-2e7d-4844-8552-f7c41a231e52",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b0cf0afa-ec40-4d65-b570-ed4ceacc6813",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://multimodal-pbmc.cells.ucsc.edu",
      },
    ],
    entryId: "3ce9ae94-c469-419a-9637-5d138a4e642f",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/8f126edf-5405-4731-8374-b5ce11f53e82",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-blood-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "cdabcf0b-7602-4abf-9afb-3b410e545703",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/ed9185e3-5b82-40c7-9824-b2141590c7f0",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-fatal.cells.ucsc.edu",
      },
    ],
    entryId: "ae62bb31-55ca-4127-b0fb-b1771a604645",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/e4c9ed14-e560-4900-a3bf-b0f8d2ce6a10",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-cellular-targets.cells.ucsc.edu",
      },
    ],
    entryId: "d7845650-f6b1-4b1c-b2fe-c0795416ba7b",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/dfc09a93-bce0-4c77-893d-e153d1b7f9fa",
      },
    ],
    entryId: "8ab8726d-81b9-4bd2-acc2-4d50bee786b4",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/ced320a1-29f3-47c1-a735-513c7084d508",
      },
    ],
    entryId: "f0f89c14-7460-4bab-9d42-22228a91f185",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/74e10dc4-cbb2-4605-a189-8a1cd8e44d8c",
      },
    ],
    entryId: "425c2759-db66-4c93-a358-a562c069b1f1",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/2a0b02c0-fea6-47bd-92b9-9b03f5d2580c",
      },
    ],
    entryId: "a29952d9-925e-40f4-8a1c-274f118f1f51",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/125eef58-0f61-4963-9b08-53e851ab65fb",
      },
    ],
    entryId: "d8ae869c-39c2-4cdd-b3fc-2d0d8f60e7b8",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/10bf5c50-8d85-4c5f-94b4-22c1363d9f31",
      },
    ],
    entryId: "575c0ad9-c78e-469b-9fdf-9a68dd881137",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/3f50314f-bdc9-40c6-8e4a-b0901ebfbe4c",
      },
    ],
    entryId: "12f32054-8f18-4dae-8959-bfce7e3108e7",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/0a839c4b-10d0-4d64-9272-684c49a2c8ba",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-critical-immuno.cells.ucsc.edu",
      },
    ],
    entryId: "5f607e50-ba22-4598-b1e9-f3d9d7a35dcc",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/35d0b748-3eed-43a5-a1c4-1dade5ec5ca0",
      },
    ],
    entryId: "111d272b-c25a-49ac-9b25-e062b70d66e0",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/a48f5033-3438-4550-8574-cdff3263fdfd",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://htan-vumc.cells.ucsc.edu",
      },
    ],
    entryId: "50154d1e-2308-44bf-9608-10c7afaa560b",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/6d203948-a779-4b69-9b3f-1ee1dadc3980",
      },
    ],
    entryId: "da74b507-60ee-4dd1-bd02-807bb051a337",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/5c868b6f-62c5-4532-9d7f-a346ad4b50a7",
      },
    ],
    entryId: "cae461de-ecbd-482f-a5d4-11d607fc12ba",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/348da6dc-5bf6-435d-adc5-37747b9ae38a",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://chang-retina-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "4f4f0193-ede8-4a82-8cb0-7a0a22f06e63",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/1a486c4c-c115-4721-8c9f-f9f096e10857",
      },
    ],
    entryId: "07d5987e-7f9e-4f34-b0fb-a185a35504f5",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b3e2c6e3-9b05-4da9-8f42-da38a664b45b",
      },
    ],
    entryId: "3d49e5e5-976f-44cb-b6b9-079016c31c56",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/1d1c7275-476a-49e2-9022-ad1b1c793594",
      },
    ],
    entryId: "30dc3964-1135-4b56-b393-ce2dcbc6e379",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/1df8c90d-d299-4b2e-a54d-a5a80f36e780",
      },
    ],
    entryId: "7c599029-7a3c-4b5c-8e79-e72c9a9a65fe",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/62ef75e4-cbea-454e-a0ce-998ec40223d3",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://pan-immune.cells.ucsc.edu/",
      },
    ],
    entryId: "04e4292c-f62f-4098-ae9b-fd69ae002a90",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/9d63fcf1-5ca0-4006-8d8f-872f3327dbe9",
      },
    ],
    entryId: "73011a86-4755-48ac-9f70-a28903b4ad77",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://early-brain.cells.ucsc.edu",
      },
    ],
    entryId: "ef1d9888-fa86-47a4-bb72-0ab0f20f7004",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://lupus-pbmc.cells.ucsc.edu",
      },
    ],
    entryId: "9dd2d2a5-d8d3-4e61-a7f7-6ad82fbae140",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-cytokine-storm.cells.ucsc.edu",
      },
    ],
    entryId: "7e2c5b39-a60b-479f-be01-56fc9a6347fd",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid-airways.cells.ucsc.edu",
      },
    ],
    entryId: "7ac8822c-4ef0-4194-adf0-74290611b1c6",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid-hypertension.cells.ucsc.edu",
      },
    ],
    entryId: "769a08d1-b8a4-4f1e-95f7-6071a9827555",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://hca-lungmap-integrated.cells.ucsc.edu",
      },
    ],
    entryId: "a27dd619-25ad-46a0-ae0c-5c4940a1139b",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-epidermis.cells.ucsc.edu",
      },
    ],
    entryId: "8fd1609b-cd2d-4b4d-bb96-49ae6b8ade2f",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://head-neck.cells.ucsc.edu",
      },
    ],
    entryId: "5314e340-0e36-494f-8128-48aaf066ffce",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://covid19-periph-immuno.cells.ucsc.edu",
      },
    ],
    entryId: "1b321ae8-f777-4108-a0a5-2e13e54b85ec",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://autism.cells.ucsc.edu",
      },
    ],
    entryId: "7e20cf83-9c64-4e0f-b594-827fd098d818",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://adult-testis.cells.ucsc.edu",
      },
    ],
    entryId: "0aa3ed0d-1689-4e90-b4cd-94c9fc23bc50",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-intestine.cells.ucsc.edu",
      },
    ],
    entryId: "6ba70c55-c35a-4767-b387-1305205800d0",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cortex-dev.cells.ucsc.edu",
      },
    ],
    entryId: "6b9f70e2-1b1f-42e9-afe9-99bb25df32c8",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/73f82ac8-15cc-4fcd-87f8-5683723fce7f",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://healthy-human-skin.cells.ucsc.edu",
      },
    ],
    entryId: "c5f46615-68de-4cf4-bbc2-a0ae10f08243",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://endometrium-cycle.cells.ucsc.edu",
      },
    ],
    entryId: "379ed69e-be05-48bc-af5e-a7fc589709bf",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://healthy-human-airway.cells.ucsc.edu",
      },
    ],
    entryId: "ef1e3497-515e-4bbe-8d4c-10161854b699",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-cornea.cells.ucsc.edu",
      },
    ],
    entryId: "6ac8e777-f9a0-4288-b5b0-446e8eba3078",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-cortical-dev.cells.ucsc.edu",
      },
    ],
    entryId: "77dedd59-1376-4887-9bca-dc42b56d5b7a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-hippo-axis.cells.ucsc.edu",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/f17b9205-f61f-4a0f-a65a-73ba91c50ade",
      },
    ],
    entryId: "34cba5e9-ecb1-4d81-bf08-48987cd63073",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://fetal-lung.cells.ucsc.edu",
      },
    ],
    entryId: "b32a9915-c81b-4cbc-af53-3a66b5da3c9a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://organoids.cells.ucsc.edu",
      },
    ],
    entryId: "3e329187-a9c4-48ec-90e3-cc45f7c2311c",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://stanford-czb-hlca.cells.ucsc.edu",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/5d445965-6f1a-4b68-ba3a-b8f765155d3a",
      },
    ],
    entryId: "6936da41-3692-46bb-bca1-cd0f507991e9",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://lifespan-nasal-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "8d566d35-d8d3-4975-a351-be5e25e9b2ea",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-kidney-atac.cells.ucsc.edu",
      },
    ],
    entryId: "e4b2e4d9-2b9b-46cf-b0e0-bb23ff28030a",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://lung-smoking-effect.cells.ucsc.edu",
      },
    ],
    entryId: "34c9a62c-a610-4e31-b343-8fb7be676f8c",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/939769a8-d8d2-4d01-abfc-55699893fd49",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://hackney-retina-atlas.cells.ucsc.edu",
      },
    ],
    entryId: "e090445c-6971-4212-bc5f-ae4ec3914102",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://cells.ucsc.edu/?ds=covid19-toppcell+schulte-schrepping",
      },
    ],
    entryId: "cd9d6360-ce38-4321-97df-f13c79e3cb84",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://healthy-bal.cells.ucsc.edu",
      },
    ],
    entryId: "272b7602-66cd-4b02-a86b-2b7c9c51a9ea",
  },
  {
    analysisPortals: [
      {
        ...UCSC_CELL_BROWSER,
        url: "https://living-donor-kidney.cells.ucsc.edu",
      },
    ],
    entryId: "77c13c40-a598-4036-807f-be09209ec2dd",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/7edef704-f63a-462c-8636-4bc86a9472bd",
      },
      {
        ...UCSC_CELL_BROWSER,
        url: "https://human-fovea-periphery.cells.ucsc.edu",
      },
    ],
    entryId: "4bec484d-ca7a-47b4-8d48-8830e06ad6db",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/03cdc7f4-bd08-49d0-a395-4487c0e5a168",
      },
    ],
    entryId: "f7b46477-0f2a-4bff-a9b7-719e000499a3",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/180bff9c-c8a5-4539-b13b-ddbc00d643e6",
      },
    ],
    entryId: "7dcffc32-7c82-4396-9a4f-88b5579bfe8a",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/99f1515b-46a2-4bc4-94c3-f62659dc1eb4",
      },
    ],
    entryId: "9b876d31-0739-4e96-9846-f76e6a427279",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/f7cecffa-00b4-4560-a29a-8ad626b8ee08",
      },
    ],
    entryId: "8f1f653d-3ea1-4d8e-b4a7-b97dc852c2b1",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/4195ab4c-20bd-4cd3-8b3d-65601277e731",
      },
    ],
    entryId: "1ffa2223-28a6-4133-a5a4-badd00faf4bc",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/b0f0b447-ac37-45b0-b1bf-5c0b7d871120",
      },
    ],
    entryId: "c412be53-cf95-47c7-980c-c0a0caa2d3a0",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/e1fa9900-3fc9-4b57-9dce-c95724c88716",
      },
    ],
    entryId: "421bc6cd-bbb4-4398-ac60-a32ea94f02ae",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/5900dda8-2dc3-4770-b604-084eac1c2c82",
      },
    ],
    entryId: "581de139-461f-4875-b408-56453a9082c7",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/6e8c5415-302c-492a-a5f9-f29c57ff18fb",
      },
    ],
    entryId: "894ae6ac-5b48-41a8-a72f-315a9b60a62e",
  },
  {
    analysisPortals: [
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/3116d060-0a8e-4767-99bb-e866badea1ed",
      },
    ],
    entryId: "925f9a4c-cac0-444a-ad2c-612656ab3a85",
  },
  {
    analysisPortals: [
      {
        ...SINGLE_CELL,
        url: "https://singlecell.broadinstitute.org/single_cell/study/SCP1157/bronchiolitis-obliterans-syndrome-lungmap",
      },
    ],
    entryId: "4ae8c5c9-1520-4371-9827-6935661f6c84",
  },
  {
    duplicateOf: "9c20a245-f2c0-43ae-82c9-2232ec6b594f",
    entryId: "c3354786-c17c-4e53-b4d7-c7afbed5b208",
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/omics/?experiment_id=LMEX0000004396",
      },
      {
        ...LGEA,
        url: "https://research.cchmc.org/pbge/lunggens/tools/lung_at_glance.html?tab=reference&species=Human",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/f86d6317-7215-409e-bfda-3f4ded3dadaa",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-human-lung-cellref",
      },
      {
        ...TOPPCELL,
        url: "https://toppcell.cchmc.org/biosystems/go/index3/shred/Eric/LungMapCellRef/Output%20by%20SampleAssayType%20by%20Lineage%20by%20Lineage_subgroup%20by%20Celltype_group%20by%20celltype-3",
      },
    ],
    entryId: "6135382f-487d-4adb-9cf8-4d6634125b68",
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/omics/?experiment_id=LMEX0000004400",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-bpd",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/3a5dbf8a-9b3e-4309-b4c5-d8a024f83734",
      },
    ],
    entryId: "1977dc47-8414-4263-a870-6b0f207d8ab3",
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/omics/?experiment_id=LMEX0000004399",
      },
      {
        ...SHINY,
        url: "https://crem-bu.shinyapps.io/scRNAseq-AEC2-comparisons/",
      },
    ],
    entryId: "6511b041-b11e-4ccf-8593-2b40148c437e",
  },
  {
    analysisPortals: [
      {
        ...SHINY,
        url: "https://research.cchmc.org/pbge/lunggens/lungDisease/ACDMPV_snrna_query.html",
      },
      {
        ...LGEA,
        url: "https://research.cchmc.org/pbge/lunggens/lungDisease/ACDMPV_snrna_query.html",
      },
    ],
    entryId: "fdadee7e-2097-45d5-bf81-cc280bd8348e",
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/dataset/?experiment_id=LMEX0000004402",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-mouse-post-flu",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/606dc65c-ebd8-4f93-ac86-d0789c04863f",
      },
    ],
    entryId: "4fb36692-6240-4146-a7e6-54543543230c",
    publications: [
      {
        publicationTitle:
          "Longitudinal single-cell profiles of lung regeneration after viral infection reveal persistent injury-associated cell states",
        publicationUrl: "https://pubmed.ncbi.nlm.nih.gov/39818203/",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/dataset/?experiment_id=LMEX0000004403",
      },
      {
        ...SHINY,
        url: "https://app.lungmap.net/app/shinycell-ild-natri-2024",
      },
    ],
    entryId: "5134c97d-bbdb-4d9d-b483-cdebeaf667b3",
    publications: [
      {
        publicationTitle:
          "Cell-type-specific and disease-associated expression quantitative trait loci in the human lung",
        publicationUrl: "https://pubmed.ncbi.nlm.nih.gov/38548990/",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/dataset/?experiment_id=LMEX0000004390",
      },
      {
        ...CZ_CELLXGENE,
        url: "https://cellxgene.cziscience.com/collections/28e9d721-6816-48a2-8d0b-43bf0b0c0ebc",
      },
    ],
    entryId: "0229ea32-ef02-489e-b11e-ff15819e22c1",
  },
  {
    analysisPortals: [
      {
        ...LUNGMAP_APPS,
        url: "https://www.lungmap.net/dataset/?experiment_id=LMEX0000003691",
      },
    ],
    entryId: "e68d2111-316f-4ded-bf49-0ab332488665",
    publications: [
      {
        publicationTitle:
          "Bulk RNA sequencing of human pediatric lung cell populations reveals unique transcriptomic signature associated with postnatal pulmonary development",
        publicationUrl: "https://pubmed.ncbi.nlm.nih.gov/38442187/",
      },
    ],
  },
  {
    analysisPortals: [
      {
        ...LGEA,
        url: "https://research.cchmc.org/pbge/lunggens/LCA/LCA.html",
      },
    ],
    entryId: "ccea5717-a848-4c06-8d2d-d1b694e89441",
  },
];
