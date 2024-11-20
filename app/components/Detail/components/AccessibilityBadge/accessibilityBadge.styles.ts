import { AccessibilityBadge as DXAccessibilityBadge } from "@databiosphere/findable-ui/lib/components/Detail/components/AccessibilityBadge/accessibilityBadge";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const AccessibilityBadge = styled(DXAccessibilityBadge)`
  &.MuiChip-root {
    ${mediaTabletUp} {
      margin-top: -8px;
    }
  }
` as typeof DXAccessibilityBadge;
