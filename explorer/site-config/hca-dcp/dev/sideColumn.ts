import { ComponentConfig } from "app/config/model";
import * as C from "../../../app/components";
import { ProjectResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const sideColumn = [
  {
    component: C.Stack,
    children: [
      {
        component: C.Section,
        props: {
          title: "Analysis Portals",
        },
        children: [
          {
            component: C.IconList,
            transformer: T.projectsToAnalysisPortals,
          } as ComponentConfig<typeof C.IconList, ProjectResponse>,
        ],
      } as ComponentConfig<typeof C.Section>,
      {
        component: C.Section,
        props: {
          title: "Project Details",
        },
        children: [
          {
            component: C.Stack,
            props: {
              gap: 4,
            },
            children: [
              {
                component: C.LabelValue,
                transformer: T.projectsToProjectLabel,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToSpecies,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToSampleType,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToAnatomicalEntity,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToOrganPart,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToDiseaseSpecimen,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToDiseaseDonor,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToDevelopmentStage,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToLibConstMethod,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToNucleicAcidSrc,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToPairedEnd,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToAnalysisProtocol,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToFileFormat,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToCellCount,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
              {
                component: C.LabelValue,
                transformer: T.projectsToDonorCount,
              } as ComponentConfig<typeof C.LabelValue, ProjectResponse>,
            ],
          } as ComponentConfig<typeof C.Stack>,
        ],
      } as ComponentConfig<typeof C.Section>,
      {
        component: C.Section,
        props: {
          title: "File Counts",
        },
        children: [
          {
            component: C.FileCounts,
            transformer: T.projectsToFileCounts,
          } as ComponentConfig<typeof C.FileCounts, ProjectResponse>,
        ],
      } as ComponentConfig<typeof C.Section>,
    ],
  } as ComponentConfig<typeof C.Stack>,
];
