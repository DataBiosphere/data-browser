import { ComponentCreator } from "@databiosphere/findable-ui/lib/components/ComponentCreator/ComponentCreator";
import { ComponentsConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { Fragment } from "react";

export interface RenderComponentsProps {
  components?: ComponentsConfig;
}

export const RenderComponents = ({
  components,
}: RenderComponentsProps): JSX.Element => {
  return (
    <Fragment>
      {components && <ComponentCreator components={components} response={{}} />}
    </Fragment>
  );
};
