import { AccessibilityBadge as DXAccessibilityBadge } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/AccessibilityBadge/accessibilityBadge";
import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const AccessibilityBadge = styled(DXAccessibilityBadge)`
  &.MuiChip-root {
    ${mediaTabletUp} {
      margin-top: -8px;
    }
  }
` as typeof DXAccessibilityBadge;
