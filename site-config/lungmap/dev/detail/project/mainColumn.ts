import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ComponentsConfig } from "@databiosphere/findable-ui/src/config/entities";
import * as C from "../../../../../app/components";
import * as MDX from "../../../../../app/components/common/MDXContent/lungmap";
import { mainColumn as hcaOverviewMainColumn } from "../../../../hca-dcp/dev/detail/project/overviewMainColumn";

// Data Release Policy
const DATA_RELEASE_POLICY: ComponentConfig = {
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
};

/**
 * Returns overview main column components.
 * @returns overview main column components.
 */
export function getOverviewMainColumn(): ComponentsConfig {
  const mainColumn = [...hcaOverviewMainColumn];
  mainColumn.pop(); // Remove the last element (HCA Data Release Policy).
  return [...mainColumn, DATA_RELEASE_POLICY];
}
