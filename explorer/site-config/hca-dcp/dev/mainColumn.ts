// Core dependencies
import { Typography } from "@mui/material";

// App dependencies
import * as C from "../../../app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectResponse } from "app/models/responses";
import * as T from "./transformer";

export const mainColumn = [
  {
    component: C.Stack,
    props: {
      border: true,
    },
    children: [
      {
        component: C.Section,
        props: {
          collapsable: false,
          title: "Description",
        },
        children: [
          {
            component: Typography,
            transformer: T.projectsToProjDescription,
          } as ComponentConfig<typeof Typography, ProjectResponse>,
        ],
      } as ComponentConfig<typeof C.Section, ProjectResponse>,
      {
        component: C.Section,
        props: {
          collapsable: true,
          title: "Contact",
        },
        children: [
          {
            component: C.Contacts,
            transformer: T.projectToContacts,
          } as ComponentConfig<typeof C.Contacts, ProjectResponse>,
        ],
      } as ComponentConfig<typeof C.Section, ProjectResponse>,
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
        component: C.Section,
        props: {
          title: "Citation",
        },
        children: [
          {
            component: C.Stack,
            props: {
              gap: 1,
            },
            children: [
              {
                component: C.Text,
                transformer: T.projectsToCitationsLabel,
              } as ComponentConfig<typeof C.Text>,
              {
                component: C.Links,
                props: {
                  showCopyButton: true,
                },
                transformer: T.projectsToCitations,
              } as ComponentConfig<typeof C.Links>,
            ],
          } as ComponentConfig<typeof C.Stack>,
        ],
      } as ComponentConfig<typeof C.Section, ProjectResponse>,
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
        component: C.Section,
        props: {
          title: "Data Release Policy",
        },
        children: [
          {
            component: C.TextLinks,
            transformer: T.projectsToDataRlsPolicy,
          } as ComponentConfig<typeof C.TextLinks>,
        ],
      } as ComponentConfig<typeof C.Section, ProjectResponse>,
    ],
  } as ComponentConfig<typeof C.Stack, ProjectResponse>,
];
