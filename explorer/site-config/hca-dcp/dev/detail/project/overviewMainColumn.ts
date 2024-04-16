import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "app/components";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as MDX from "../../../../../app/components/common/MDXContent/hca-dcp";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

export const mainColumn = [
  {
    component: C.Description,
    viewBuilder: V.buildDescription,
  } as ComponentConfig<typeof C.Description, ProjectsResponse>,
  {
    component: C.Contacts,
    viewBuilder: V.buildContacts,
  } as ComponentConfig<typeof C.Contacts, ProjectsResponse>,
  {
    component: C.Publications,
    viewBuilder: V.buildPublications,
  } as ComponentConfig<typeof C.Publications, ProjectsResponse>,
  {
    component: C.Contributors,
    viewBuilder: V.buildContributors,
  } as ComponentConfig<typeof C.Contributors, ProjectsResponse>,
  {
    component: C.CollaboratingOrganizations,
    viewBuilder: V.buildCollaboratingOrganizations,
  } as ComponentConfig<typeof C.CollaboratingOrganizations, ProjectsResponse>,
  {
    component: C.DataCurators,
    viewBuilder: V.buildDataCurators,
  } as ComponentConfig<typeof C.DataCurators, ProjectsResponse>,
  {
    component: C.Citation,
    viewBuilder: V.buildCitation,
  } as ComponentConfig<typeof C.Citation, ProjectsResponse>,
  {
    component: C.SupplementaryLinks,
    viewBuilder: V.buildSupplementaryLinks,
  } as ComponentConfig<typeof C.SupplementaryLinks>,
  {
    children: [
      {
        component: C.KeyValuePairs,
        viewBuilder: V.buildAccessions,
      } as ComponentConfig<typeof C.KeyValuePairs, ProjectsResponse>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: true,
      title: "Accessions",
    },
  } as ComponentConfig<typeof C.CollapsableSection>,
  {
    children: [
      {
        component: MDX.DataReleasePolicy,
      } as ComponentConfig<typeof MDX.DataReleasePolicy>,
    ],
    component: C.CollapsableSection,
    props: {
      collapsable: false,
      title: "Data Access Policy",
    },
  } as ComponentConfig<typeof C.CollapsableSection>,
];
