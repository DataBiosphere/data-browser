// App dependencies
import * as C from "app/components";
import { ComponentConfig } from "app/config/model";
import { ProjectsResponse } from "app/models/responses";
import * as T from "./projectViewModelBuilder";

export const mainColumn = [
  {
    component: C.Description,
    transformer: T.buildDescription,
  } as ComponentConfig<typeof C.Description, ProjectsResponse>,
  {
    component: C.Contacts,
    transformer: T.buildContacts,
  } as ComponentConfig<typeof C.Contacts, ProjectsResponse>,
  {
    component: C.Contributors,
    transformer: T.buildContributors,
  } as ComponentConfig<typeof C.Contributors, ProjectsResponse>,
  {
    component: C.CollaboratingOrganizations,
    transformer: T.buildCollaboratingOrganizations,
  } as ComponentConfig<typeof C.CollaboratingOrganizations, ProjectsResponse>,
  {
    component: C.DataCurators,
    transformer: T.buildDataCurators,
  } as ComponentConfig<typeof C.DataCurators, ProjectsResponse>,
  {
    component: C.Citation,
    transformer: T.buildCitation,
  } as ComponentConfig<typeof C.Citation, ProjectsResponse>,
  {
    component: C.SupplementaryLinks,
    transformer: T.buildSupplementaryLinks,
  } as ComponentConfig<typeof C.SupplementaryLinks>,
  {
    component: C.DataReleasePolicy,
  } as ComponentConfig<typeof C.DataReleasePolicy>,
];
