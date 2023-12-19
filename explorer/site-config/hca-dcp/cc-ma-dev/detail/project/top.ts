import { ComponentConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import * as C from "../../../../../app/components";
import * as V from "../../../../../app/viewModelBuilders/azul/hca-dcp/common/viewModelBuilders";

const TOP_ACCESSIBILITY_BADGE: ComponentConfig = {
  component: C.AccessibilityBadge,
  viewBuilder: V.buildProjectAccessibilityBadge,
};

/**
 * Returns managed access detail top components.
 * @param top - Top components.
 * @returns managed access detail top components.
 */
export function getMAProjectDetailTop(
  top: ComponentConfig[]
): ComponentConfig[] {
  const cloneTop = [...top];
  const topHero = cloneTop[0];
  topHero.children = [TOP_ACCESSIBILITY_BADGE];
  return cloneTop;
}
