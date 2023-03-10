import {
  BackPageConfig,
  ComponentConfig,
} from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/content/lungmap";
import { exportConfig as hcaExportConfig } from "../../../hca-dcp/dev/export/export";

export const exportConfig: BackPageConfig = {
  ...hcaExportConfig,
  tabs: [
    {
      ...hcaExportConfig.tabs[0],
      sideColumn: [
        {
          children: [
            {
              children: [
                {
                  component: MDX.DataReleasePolicy,
                } as ComponentConfig<typeof MDX.DataReleasePolicy>,
              ],
              component: MDX.Section,
            } as ComponentConfig<typeof MDX.Section>,
          ],
          component: C.FluidPaper,
        } as ComponentConfig<typeof C.FluidPaper>,
      ],
    },
  ],
};
