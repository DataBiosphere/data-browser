import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../../app/components";
import * as MDX from "../../../../app/components/common/MDXContent/lungmap";

/**
 * Returns export related data release policy configuration.
 * @returns export related data release policy configuration.
 */
export function getExportDataReleasePolicy(): ComponentConfig[] {
  return [
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
  ];
}
