import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { ProjectsResponse } from "../../../../app/apis/azul/hca-dcp/common/responses";
import {
  getProjectId,
  getTitle,
} from "../../../../app/apis/azul/hca-dcp/common/utils";
import * as C from "../../../../app/components";
import { projectEdits } from "../../../../app/viewModelBuilders/azul/hca-dcp/common/projectMapper/projectEdits/projectEdits";
import * as V from "../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";
import { HCA_DCP_CATEGORY_KEY, HCA_DCP_CATEGORY_LABEL } from "../../category";
import { mainColumn as exportMainColumn } from "../detail/project/exportMainColumn";
import { sideColumn as exportSideColumn } from "../detail/project/exportSideColumn";
import { mainColumn as matricesMainColumn } from "../detail/project/matricesMainColumn";
import { mainColumn as metadataMainColumn } from "../detail/project/metadataMainColumn";
import { sideColumn as metadataSideColumn } from "../detail/project/metadataSideColumn";
import { mainColumn as overviewMainColumn } from "../detail/project/overviewMainColumn";
import { sideColumn as overviewSideColumn } from "../detail/project/overviewSideColumn";
import { mainColumn as projectFilesMainColumn } from "../detail/project/projectFilesMainColumn";
import { sideColumn as projectFilesSideColumn } from "../detail/project/projectFilesSideColumn";
import { top } from "../detail/project/top";
import { subTitleHero } from "../listView/subTitleHero";

export const PROJECT_ENTITY_ROUTE = {
  EXPORT_TO_TERRA: "export-to-terra",
  GET_CURL_COMMAND: "get-curl-command",
  OVERVIEW: "",
  PROJECT_MATRICES: "project-matrices",
  PROJECT_METADATA: "project-metadata",
};

/**
 * Entity config object responsible to config anything related to the /projects route.
 */
export const projectsEntityConfig: EntityConfig = {
  apiPath: "index/projects",
  detail: {
    detailOverviews: ["Overview"],
    staticLoad: true,
    tabs: [
      {
        label: "Overview",
        mainColumn: overviewMainColumn,
        route: PROJECT_ENTITY_ROUTE.OVERVIEW,
        sideColumn: overviewSideColumn,
      },
      {
        label: "Metadata",
        mainColumn: metadataMainColumn,
        route: PROJECT_ENTITY_ROUTE.PROJECT_METADATA,
        sideColumn: metadataSideColumn,
      },
      {
        label: "Matrices",
        mainColumn: matricesMainColumn,
        route: PROJECT_ENTITY_ROUTE.PROJECT_MATRICES,
      },
      {
        label: "Download",
        mainColumn: projectFilesMainColumn,
        route: PROJECT_ENTITY_ROUTE.GET_CURL_COMMAND,
        sideColumn: projectFilesSideColumn,
      },
      {
        label: "Export",
        mainColumn: exportMainColumn,
        route: PROJECT_ENTITY_ROUTE.EXPORT_TO_TERRA,
        sideColumn: exportSideColumn,
      },
    ],
    top: top,
  },
  exploreMode: EXPLORE_MODE.SS_FETCH_SS_FILTERING,
  getId: getProjectId,
  getTitle: getTitle,
  label: "Projects",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Link,
          viewBuilder: V.buildProjectTitle,
        } as ComponentConfig<typeof C.Link, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.PROJECT_TITLE,
        id: HCA_DCP_CATEGORY_KEY.PROJECT_TITLE,
        width: { max: "2fr", min: "374px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildTissueAtlas,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.TISSUE_ATLAS,
        id: HCA_DCP_CATEGORY_KEY.TISSUE_ATLAS,
        width: { max: "1fr", min: "116px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorGenusSpecies,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: "Species", // TODO confirm header
        id: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
        width: { max: "1fr", min: "136px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSampleEntityType,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SAMPLE_ENTITY_TYPE,
        id: HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE,
        width: { max: "1fr", min: "148px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenOrgan,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
        id: HCA_DCP_CATEGORY_KEY.ANATOMICAL_ENTITY,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenOrganPart,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.ORGAN_PART,
        id: HCA_DCP_CATEGORY_KEY.ORGAN_PART,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSampleModelOrgan,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.MODEL_ORGAN,
        id: HCA_DCP_CATEGORY_KEY.MODEL_ORGAN,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedCellSuspensionSelectedCellType,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.SELECTED_CELL_TYPE,
        id: HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE,
        width: { max: "1fr", min: "146px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolLibraryConstructionApproach,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
        id: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
        width: { max: "1fr", min: "126px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolNucleicAcidSource,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.NUCLEIC_ACID_SOURCE,
        id: HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregatedProtocolPairedEnd,
        } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.PAIRED_END,
        id: HCA_DCP_CATEGORY_KEY.PAIRED_END,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedProtocolWorkflow,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.WORKFLOW,
        id: HCA_DCP_CATEGORY_KEY.WORKFLOW,
        width: { max: "1fr", min: "146px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedSpecimenDisease,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: "Disease (Specimen)",
        id: HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE,
        width: { max: "1fr", min: "146px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorDisease,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: "Disease (Donor)",
        id: HCA_DCP_CATEGORY_KEY.DONOR_DISEASE,
        width: { max: "1fr", min: "128px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildAggregatedDonorDevelopmentStage,
        } as ComponentConfig<typeof C.NTagCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.DEVELOPMENT_STAGE,
        id: HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE,
        width: { max: "1fr", min: "148px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregatedDonorCount,
        } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.DONOR_COUNT,
        id: HCA_DCP_CATEGORY_KEY.DONOR_COUNT,
        width: { max: "1fr", min: "124px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildEstimateCellCount,
        } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.EFFECTIVE_CELL_COUNT,
        id: HCA_DCP_CATEGORY_KEY.EFFECTIVE_CELL_COUNT,
        width: { max: "1fr", min: "124px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregateSubmissionDate,
        } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.AGGREGATE_SUBMISSION_DATE,
        id: HCA_DCP_CATEGORY_KEY.AGGREGATE_SUBMISSION_DATE,
        width: { max: "1fr", min: "224px" },
      },
      {
        columnVisible: true,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAggregateLastModifiedDate,
        } as ComponentConfig<typeof C.BasicCell, ProjectsResponse>,
        header: HCA_DCP_CATEGORY_LABEL.AGGREGATE_LAST_MODIFIED_DATE,
        id: HCA_DCP_CATEGORY_KEY.AGGREGATE_LAST_MODIFIED_DATE,
        width: { max: "1fr", min: "224px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.DESCENDING,
      id: HCA_DCP_CATEGORY_KEY.AGGREGATE_LAST_MODIFIED_DATE,
    },
  } as ListConfig<ProjectsResponse>,
  listView: {
    subTitleHero,
  },
  overrides: projectEdits,
  route: "projects",
};
