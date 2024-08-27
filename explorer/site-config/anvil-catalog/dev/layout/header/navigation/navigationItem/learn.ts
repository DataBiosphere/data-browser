import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";

const LEARN_URL = "{portalUrl}{learn}";

export const LEARN: NavLinkItem = {
  label: "Learn",
  menuItems: [
    {
      label: "Introduction",
      menuItems: [
        { label: "Introduction", url: "" },
        {
          label: "Getting Started",
          url: LEARN_URL,
        },
        {
          label: "Guides and Tutorials",
          url: `${LEARN_URL}/introduction/guides-and-tutorials`,
        },
        {
          label: "Introduction to Terra",
          url: `${LEARN_URL}/introduction/intro-to-terra`,
        },
        {
          label: "Introduction to Dockstore",
          url: `${LEARN_URL}/introduction/intro-to-dockstore`,
        },
        {
          label: "Understanding Cloud Costs",
          url: `${LEARN_URL}/introduction/understanding-cloud-costs`,
        },
        { label: "Account Setup", url: "" },
        {
          label: "Overview of Account Setup",
          url: `${LEARN_URL}/account-setup/overview-of-account-setup`,
        },
        {
          label: "Obtaining a Google ID",
          url: `${LEARN_URL}/account-setup/obtaining-a-google-id`,
        },
        {
          label: "Creating a Terra Account",
          url: `${LEARN_URL}/account-setup/creating-a-terra-account`,
        },
        { label: "Billing Setup", url: "" },
        {
          label: "Overview of Billing Concepts",
          url: `${LEARN_URL}/billing-setup/billing-concepts`,
        },
        {
          label: "Creating a Google Cloud Billing Account",
          url: `${LEARN_URL}/billing-setup/creating-a-google-cloud-billing-account`,
        },
        { label: "Accessing Data", url: "" },
        {
          label: "Discovering Data",
          url: `${LEARN_URL}/accessing-data/discovering-data`,
        },
        {
          label: "Requesting Data Access",
          url: `${LEARN_URL}/accessing-data/requesting-data-access`,
        },
        {
          label: "Data Access Controls",
          url: `${LEARN_URL}/accessing-data/data-access-controls`,
        },
        {
          label: "Bringing Your Own Data",
          url: `${LEARN_URL}/accessing-data/bringing-your-own-data`,
        },

        { label: "Running Analysis Workflows", url: "" },
        {
          label: "Using Example Workspaces",
          url: `${LEARN_URL}/analysis-workflows/using-example-workspaces`,
        },
        {
          label: "Running GATK in Terra",
          url: `${LEARN_URL}/analysis-workflows/running-gatk`,
        },
        {
          label: "Running Galaxy Workflows from Dockstore",
          url: `${LEARN_URL}/analysis-workflows/running-galaxy-workflows-from-dockstore`,
        },
        { label: "Running Interactive Analyses", url: "" },
        {
          label: "Running Jupyter Notebooks in AnVIL",
          url: `${LEARN_URL}/interactive-analysis/getting-started-with-jupyter-notebooks`,
        },
        {
          label: "Running R / Bioconductor in AnVILL",
          url: `${LEARN_URL}/interactive-analysis/getting-started-with-bioconductor`,
        },
        {
          label: "Running Galaxy in AnVIL",
          url: `${LEARN_URL}/interactive-analysis/getting-started-with-galaxy`,
        },
        { label: "MOOC", url: "" },
        {
          label: "What is AnVIL?",
          url: `${LEARN_URL}/anvil-mooc/what-is-anvil`,
        },
        {
          label: "Cloud Computing",
          url: `${LEARN_URL}/anvil-mooc/cloud-computing`,
        },
        {
          label: "Cloud Costs",
          url: `${LEARN_URL}/anvil-mooc/cloud-costs`,
        },
        {
          label: "Use Case: GATK",
          url: `${LEARN_URL}/anvil-mooc/use-case-gatk`,
        },
        {
          label: "Use Case: GWAS",
          url: `${LEARN_URL}/anvil-mooc/use-case-gwas`,
        },
        {
          label: "Use Case: eQTL",
          url: `${LEARN_URL}/anvil-mooc/use-case-eqtl`,
        },
        { label: "Video Gallery", url: "" },
        {
          label: "Anvil",
          url: `${LEARN_URL}/videos/anvil-videos`,
        },
        {
          label: "Terra",
          url: `${LEARN_URL}/videos/terra-videos`,
        },
        {
          label: "Dockstore",
          url: `${LEARN_URL}/videos/dockstore-videos`,
        },
        {
          label: "Galaxy",
          url: `${LEARN_URL}/videos/galaxy-videos`,
        },
        {
          label: "Seqr",
          url: `${LEARN_URL}/videos/seqr-videos`,
        },
        {
          label: "Workshop Archive",
          url: "",
        },
        {
          label: "Workshop Archive",
          url: `${LEARN_URL}/workshop-archive`,
        },
        {
          label: "Reference",
          url: "",
        },
        {
          label: "GTEx v8 - Free Egress Instructions",
          url: `${LEARN_URL}/reference/gtex-v8-free-egress-instructions`,
        },
        {
          label: "Cross Platform Data Access with GA4GH DRS in Terra",
          url: `${LEARN_URL}/reference/cross-platform-data-access-with-drs-uris-in-terra`,
        },
      ],
      url: LEARN_URL,
    },
    {
      label: "Data Analysts",
      menuItems: [
        {
          label: "Guides and Tutorials",
          url: `${LEARN_URL}/data-analysts`,
        },
        { label: "Bioconductor / RStudio", url: "" },
        {
          label: "Starting RStudio",
          url: `${LEARN_URL}/data-analysts/rstudio-gsg-video`,
        },
        {
          label: "Using R / Bioconductor in AnVIL",
          url: `${LEARN_URL}/data-analysts/using-r-bioconductor-in-anvil`,
        },
        {
          label: "The R / Bioconductor AnVIL Package",
          url: `${LEARN_URL}/data-analysts/the-r-bioconductor-anvil-package`,
        },
        {
          label: "Running a Workflow",
          url: `${LEARN_URL}/data-analysts/running-a-workflow`,
        },
        {
          label:
            "Single-cell RNASeq with 'Orchestrating Single Cell Analysis'\u00A0in R / Bioconductor",
          url: `${LEARN_URL}/data-analysts/single-cell-rnaseq-with-orchestrating-single-cell-analysis-in-r-bioconductor`,
        },
        {
          label: "Using AnVIL for teaching R / Bioconductor",
          url: `${LEARN_URL}/data-analysts/using-anvil-for-teaching-r-bioconductor`,
        },
        {
          label: "Reproducible Research with AnVILPublish",
          url: `${LEARN_URL}/data-analysts/reproducible-research-with-anvilpublish`,
        },
        {
          label: "Participant Stories",
          url: `${LEARN_URL}/data-analysts/participant-stories`,
        },
        { label: "Galaxy", url: "" },
        {
          label: "Starting Galaxy",
          url: `${LEARN_URL}/data-analysts/galaxy-gsg-video`,
        },
        { label: "Jupyter", url: "" },
        {
          label: "Starting Jupyter",
          url: `${LEARN_URL}/data-analysts/jupyter-gsg-video`,
        },
      ],
      url: `${LEARN_URL}/data-analysts`,
    },
    {
      label: "Investigators",
      menuItems: [
        {
          label: "Investigators Tutorial Overview",
          url: `${LEARN_URL}/investigators`,
        },
        {
          label: "Setting up Your Lab in AnVIL",
          url: `${LEARN_URL}/investigators/setting-up-lab-accounts`,
        },
        {
          label: "Preparing a Cloud Cost Budget Justification",
          url: `${LEARN_URL}/investigators/budget-templates`,
        },
      ],
      url: `${LEARN_URL}/investigators`,
    },
    {
      label: "Data Submitters",
      menuItems: [
        { label: "Data Submission Guide", url: "" },
        {
          label: "Submission Process Overview",
          url: `${LEARN_URL}/data-submitters/submission-guide/data-submitters-overview`,
        },
        {
          label: "1 - Register Study/Obtain Approvals",
          url: `${LEARN_URL}/data-submitters/submission-guide/data-approval-process`,
        },
        {
          label: "2 - Set Up a Data Model",
          url: `${LEARN_URL}/data-submitters/submission-guide/set-up-a-data-model`,
        },
        {
          label: "3 - Prepare for Submission",
          url: `${LEARN_URL}/data-submitters/submission-guide/prepare-for-submission`,
        },
        {
          label: "4 - Ingest Data",
          url: `${LEARN_URL}/data-submitters/submission-guide/ingesting-data`,
        },
        {
          label: "5 - QC Data",
          url: `${LEARN_URL}/data-submitters/submission-guide/qc-data`,
        },
        { label: "Data Submission Resources", url: "" },
        {
          label: "Consortium Data Access Guidelines",
          url: `${LEARN_URL}/data-submitters/resources/consortium-data-access-guidelines`,
        },
        {
          label: "Data Withdrawal Procedures",
          url: `${LEARN_URL}/data-submitters/resources/anvil-data-withdrawal-procedures`,
        },
      ],
      url: `${LEARN_URL}/data-submitters/submission-guide/data-submitters-overview`,
    },
  ],
  url: LEARN_URL,
};
