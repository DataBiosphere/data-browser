// App dependencies
import * as C from "app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const mainColumn = [
  {
    component: C.Description,
    transformer: T.projectsToProjDescription,
  } as ComponentConfig<typeof C.Description, ProjectResponse>,
  {
    component: C.Contacts,
    transformer: T.projectToContacts,
  } as ComponentConfig<typeof C.Contacts, ProjectResponse>,
  {
    component: C.Section,
    props: {
      title: "Contributors",
    },
    children: [
      {
        component: C.Citations,
        transformer: T.projectsToContributors,
      } as ComponentConfig<typeof C.Citations, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Section, ProjectResponse>,
  {
    component: C.Section,
    props: {
      title: "Collaborating Organizations",
    },
    children: [
      {
        component: C.Citations,
        transformer: T.projectsToOrganizations,
      } as ComponentConfig<typeof C.Citations, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Section, ProjectResponse>,
  {
    component: C.Section,
    props: {
      title: "Data Curators",
    },
    children: [
      {
        component: C.TextLinks,
        transformer: T.projectsToDataCurators,
      } as ComponentConfig<typeof C.TextLinks, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Section, ProjectResponse>,
  {
    component: C.Citation,
    transformer: T.projectsToCitation,
  } as ComponentConfig<typeof C.Citation, ProjectResponse>,
  {
    component: C.Section,
    props: {
      title: "Supplementary Links",
    },
    children: [
      {
        component: C.Stack,
        props: {
          gap: 2,
        },
        children: [
          {
            component: C.Text,
            transformer: T.projectsToSupplementaryLinksLabel,
          } as ComponentConfig<typeof C.Text>,
          {
            component: C.Links,
            props: {
              showCopyButton: true,
              enumerate: true,
            },
            transformer: T.projectsToSupplementaryLinks,
          } as ComponentConfig<typeof C.Links>,
        ],
      } as ComponentConfig<typeof C.Stack>,
    ],
  } as ComponentConfig<typeof C.Section, ProjectResponse>,
  {
    component: C.Section,
    props: {
      title: "Accessions",
    },
    children: [
      {
        component: C.TextLinks,
        transformer: T.projectsToAccessions,
      } as ComponentConfig<typeof C.TextLinks>,
    ],
  } as ComponentConfig<typeof C.Section, ProjectResponse>,
  {
    component: C.DataReleasePolicy,
  } as ComponentConfig<typeof C.DataReleasePolicy>,
];
