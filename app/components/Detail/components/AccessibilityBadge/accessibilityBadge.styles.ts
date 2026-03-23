import { AccessibilityBadge as DXAccessibilityBadge } from "@databiosphere/findable-ui/lib/components/Detail/components/AccessibilityBadge/accessibilityBadge";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const AccessibilityBadge = styled(DXAccessibilityBadge)`
  &.MuiChip-root {
    ${bpUpSm} {
      margin-top: -8px;
    }
  }
` as typeof DXAccessibilityBadge;
