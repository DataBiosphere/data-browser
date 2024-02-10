import { AnVILCatalogWorkspace } from "../../app/apis/catalog/anvil-catalog/common/entities";

type WorkspaceEdit = Partial<AnVILCatalogWorkspace> &
  Pick<AnVILCatalogWorkspace, "workspaceName">;

export const workspaceEdits: WorkspaceEdit[] = [
  {
    bucketSize: 59.43e12,
    workspaceName: "AnVIL_GREGOR_RELEASE_01_GRU",
  },
  {
    bucketSize: 6.22e12,
    workspaceName: "AnVIL_GREGOR_RELEASE_01_HMB",
  },
];
