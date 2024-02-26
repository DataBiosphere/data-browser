import { ComponentCreator } from "@clevercanary/data-explorer-ui/lib/components/ComponentCreator/ComponentCreator";
import { ComponentsConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
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
