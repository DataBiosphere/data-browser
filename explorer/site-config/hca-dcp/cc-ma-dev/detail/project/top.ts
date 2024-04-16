import { ComponentConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { ProjectsResponse } from "../../../../../app/apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../app/components";
import { Stack } from "../../../../../app/components/Detail/components/AccessibilityBadge/components/Stack/stack";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

/**
 * Returns managed access detail top components.
 * @returns managed access detail top components.
 */
export function getMAProjectDetailTop(): ComponentConfig[] {
  return [
    {
      children: [
        {
          children: [
            {
              component: C.DXAccessibilityBadge,
              viewBuilder: V.buildProjectAccessibilityBadge,
            } as ComponentConfig<
              typeof C.DXAccessibilityBadge,
              ProjectsResponse
            >,
            {
              component: C.SubTitle,
              viewBuilder: V.buildAggregatedDateLastModifiedDate,
            } as ComponentConfig<typeof C.SubTitle, ProjectsResponse>,
          ],
          component: Stack,
        } as ComponentConfig<typeof Stack>,
      ],
      component: C.BackPageHero,
      viewBuilder: V.buildMAHero,
    } as ComponentConfig<typeof C.BackPageHero, ProjectsResponse>,
  ];
}
