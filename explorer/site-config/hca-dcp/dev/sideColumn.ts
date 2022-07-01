import { ComponentConfig } from "app/config/model";
import * as C from "../../../app/components";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const sideColumn = [
  {
    children: [
      {
        component: C.IconList,
        transformer: T.projectsToAnalysisPortals,
      } as ComponentConfig<typeof C.IconList, ProjectsResponse>,
    ],
    component: C.Section,
    props: {
      title: "Analysis Portals",
    },
  } as ComponentConfig<typeof C.Section>,
  {
    children: [
      {
        children: [
          {
            component: C.LabelValue,
            transformer: T.projectsToProjectLabel,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToSpecies,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToSampleType,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToAnatomicalEntity,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToOrganPart,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToDiseaseSpecimen,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToDiseaseDonor,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToDevelopmentStage,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToLibConstMethod,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToNucleicAcidSrc,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToPairedEnd,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToAnalysisProtocol,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToFileFormat,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToCellCount,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
          {
            component: C.LabelValue,
            transformer: T.projectsToDonorCount,
          } as ComponentConfig<typeof C.LabelValue, ProjectsResponse>,
        ],
        component: C.Stack,
        props: {
          gap: 4,
        },
      } as ComponentConfig<typeof C.Stack>,
    ],
    component: C.Section,
    props: {
      title: "Project Details",
    },
  } as ComponentConfig<typeof C.Section>,
  {
    children: [
      {
        component: C.FileCounts,
        transformer: T.projectsToFileCounts,
      } as ComponentConfig<typeof C.FileCounts, ProjectsResponse>,
    ],
    component: C.Section,
    props: {
      title: "File Counts",
    },
  } as ComponentConfig<typeof C.Section>,
];
