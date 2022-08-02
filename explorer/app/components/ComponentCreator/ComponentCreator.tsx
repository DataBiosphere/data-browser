import { ComponentsConfig } from "app/config/common/entities";
import { useConfig } from "app/hooks/useConfig";
import React from "react";
import { v4 as uuid4 } from "uuid";

interface ComponentCreatorProps<T> {
  components: ComponentsConfig;
  response: T;
}

/**
 * ComponentCreator uses React API to create components based on the component configs, instead of using JSX.
 * That way we can continue to create UI components without having to worry about if they should be able to transform model data into props.
 * This component is also responsible to call any necessary transformers to generate the component's props based on the model T.
 * @param componentCreatorProps - Custom props required for creating component.
 * @param componentCreatorProps.components - Component config to render as React elements.
 * @param componentCreatorProps.response - Response returned from API endpoint, used to populate component props.
 * @returns A set of React components.
 */
export const ComponentCreator = <T,>({
  components,
  response,
}: ComponentCreatorProps<T>): JSX.Element => {
  const config = useConfig();
  const componentsValue =
    typeof components === "function" ? components(config) : components;

  return (
    <>
      {componentsValue.map((c) => {
        const children = c.children ? (
          <ComponentCreator
            key={uuid4()}
            components={c.children}
            response={response}
          />
        ) : null;
        const props = c.viewBuilder ? c.viewBuilder(response) : {};
        return React.createElement(
          c.component,
          { ...c.props, ...props, key: uuid4() },
          [children ?? props.children]
        );
      })}
    </>
  );
};
