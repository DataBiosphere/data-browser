import * as C from "app/components";
import { ComponentConfig } from "app/config/common/entities";
import { ProjectsResponse } from "app/models/responses";
import * as T from "../../projectViewModelBuilder";

export const mainColumn = [
  {
    component: C.Description,
    viewBuilder: T.buildDescription,
  } as ComponentConfig<typeof C.Description, ProjectsResponse>,
  {
    component: C.Contacts,
    viewBuilder: T.buildContacts,
  } as ComponentConfig<typeof C.Contacts, ProjectsResponse>,
  {
    component: C.Publications,
    viewBuilder: T.buildPublications,
  } as ComponentConfig<typeof C.Publications, ProjectsResponse>,
  {
    component: C.Contributors,
    viewBuilder: T.buildContributors,
  } as ComponentConfig<typeof C.Contributors, ProjectsResponse>,
  {
    component: C.CollaboratingOrganizations,
    viewBuilder: T.buildCollaboratingOrganizations,
  } as ComponentConfig<typeof C.CollaboratingOrganizations, ProjectsResponse>,
  {
    component: C.DataCurators,
    viewBuilder: T.buildDataCurators,
  } as ComponentConfig<typeof C.DataCurators, ProjectsResponse>,
  {
    component: C.Citation,
    viewBuilder: T.buildCitation,
  } as ComponentConfig<typeof C.Citation, ProjectsResponse>,
  {
    component: C.SupplementaryLinks,
    viewBuilder: T.buildSupplementaryLinks,
  } as ComponentConfig<typeof C.SupplementaryLinks>,
  {
    component: C.DataReleasePolicy,
  } as ComponentConfig<typeof C.DataReleasePolicy>,
];
