import { AccessibilityBadgeProps } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/AccessibilityBadge/accessibilityBadge";
import { AccessibilityBadge as Badge } from "./accessibilityBadge.styles";

export const AccessibilityBadge = ({
  badgeProps,
  fadeProps,
}: AccessibilityBadgeProps): JSX.Element => {
  return <Badge badgeProps={badgeProps} fadeProps={fadeProps} />;
};
