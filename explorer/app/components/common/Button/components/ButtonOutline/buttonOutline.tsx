import { ButtonProps as DXButtonProps } from "@databiosphere/findable-ui/lib/components/common/Button/button";
import { ButtonOutline as DXButtonOutline } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonOutline/buttonOutline";

export const ButtonOutline = ({ ...props }: DXButtonProps): JSX.Element => {
  return <DXButtonOutline {...props} />;
};
