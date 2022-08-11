// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Filter } from "./filter";
import { DefaultFilterLabel } from "../FilterLabel/filterLabel.stories";
import {
  DefaultFilterMenu,
  DonorDiseaseFilterMenu,
} from "../FilterMenu/filterMenu.stories";

export default {
  argTypes: {
    Target: { control: { disable: true } },
    content: { control: { disable: true } },
    tags: { control: { disable: true } },
  },
  component: Filter,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/Filter",
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

const onFilter = (): void => {
  // onFilter function
};

export const DefaultFilter = Template.bind({});
DefaultFilter.args = {
  Target: (props): JSX.Element => {
    return (
      <DefaultFilterLabel
        count={DefaultFilterLabel.args?.count}
        disabled={DefaultFilterLabel.args?.disabled || false}
        label={DefaultFilterLabel.args?.label || "Label"}
        {...props}
      />
    );
  },
  content: (
    <DefaultFilterMenu
      categoryKey={DefaultFilterMenu.args?.categoryKey || "defaultKey"}
      onFilter={DefaultFilterMenu.args?.onFilter || onFilter}
      values={
        DefaultFilterMenu.args?.values || [
          {
            count: 1,
            key: "item1",
            label: "Item 1",
            selected: true,
          },
        ]
      }
    />
  ),
};

export const DonorDiseaseFilter = Template.bind({});
DonorDiseaseFilter.args = {
  Target: (props): JSX.Element => {
    return (
      <DefaultFilterLabel disabled={false} label={"Donor Disease"} {...props} />
    );
  },
  content: (
    <DonorDiseaseFilterMenu
      categoryKey={DonorDiseaseFilterMenu.args?.categoryKey || "donorDisease"}
      onFilter={DonorDiseaseFilterMenu.args?.onFilter || onFilter}
      values={
        DonorDiseaseFilterMenu.args?.values || [
          {
            count: 1,
            key: "item1",
            label: "Item 1",
            selected: true,
          },
        ]
      }
    />
  ),
};
