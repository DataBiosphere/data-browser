// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { FilterMenu } from "./filterMenu";

export default {
  argTypes: {
    argTypes: {
      categoryKey: { control: { disable: true } },
      menuWidth: { control: "number" },
      onFilter: { control: { disable: true } },
      values: { control: { disable: true } },
    },
  },
  component: FilterMenu,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ backgroundColor: "white" }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterMenu",
} as ComponentMeta<typeof FilterMenu>;

const Template: ComponentStory<typeof FilterMenu> = (args) => (
  <FilterMenu {...args} />
);

export const DefaultFilterMenu = Template.bind({});
DefaultFilterMenu.args = {
  categoryKey: "defaultKey",
  values: [
    {
      count: 1,
      key: "item1",
      label: "Item 1",
      selected: true,
    },
    {
      count: 2,
      key: "item2",
      label: "Item 2",
      selected: false,
    },
    {
      count: 3,
      key: "item3",
      label: "Item 3",
      selected: true,
    },
    {
      count: 4,
      key: "item4",
      label: "Item 4",
      selected: false,
    },
    {
      count: 5,
      key: "item5",
      label: "Item 5",
      selected: false,
    },
    {
      count: 6,
      key: "item6",
      label: "Item 6",
      selected: true,
    },
    {
      count: 7,
      key: "item7",
      label: "Item 7",
      selected: true,
    },
    {
      count: 8,
      key: "item8",
      label: "Item 8",
      selected: true,
    },
    {
      count: 9,
      key: "item9",
      label: "Item 9",
      selected: true,
    },
  ],
};

export const GenderFilterMenu = Template.bind({});
GenderFilterMenu.args = {
  categoryKey: "gender",
  menuWidth: 312,
  values: [
    {
      count: 312,
      key: "male",
      label: "Male",
      selected: false,
    },
    {
      count: 0,
      key: "female",
      label: "Female",
      selected: false,
    },
    {
      count: 3,
      key: "unknown",
      label: "Unknown",
      selected: true,
    },
  ],
};

export const DonorDiseaseFilterMenu = Template.bind({});
DonorDiseaseFilterMenu.args = {
  categoryKey: "donorDisease",
  menuWidth: 312,
  values: [
    {
      count: 312,
      key: "normal",
      label: "Normal",
      selected: false,
    },
    {
      count: 0,
      key: "abscess",
      label: "abscess",
      selected: false,
    },
    {
      count: 3,
      key: "acoustic neuroma",
      label: "acoustic neuroma",
      selected: true,
    },
    {
      count: 3,
      key: "acute kidney failure",
      label: "acute kidney failure",
      selected: true,
    },
    {
      count: 3,
      key: "acute kidney tubular necrosis",
      label: "acute kidney tubular necrosis",
      selected: true,
    },
    {
      count: 3,
      key: "alcohol abuse",
      label: "alcohol abuse",
      selected: true,
    },
    {
      count: 3,
      key: "Alzheimer disease",
      label: "Alzheimer disease",
      selected: true,
    },
    {
      count: 3,
      key: "amyotrophic lateral sclerosis",
      label: "amyotrophic lateral sclerosis",
      selected: true,
    },
    {
      count: 1,
      key: "anxiety disorder",
      label: "anxiety disorder",
      selected: true,
    },
    {
      count: 3,
      key: "aplastic anemia",
      label: "aplastic anemia",
      selected: true,
    },
    {
      count: 3,
      key: "arthritis",
      label: "arthritis",
      selected: true,
    },
    {
      count: 3,
      key: "asthma",
      label: "asthma",
      selected: true,
    },
    {
      count: 222,
      key: "atherosclerosis",
      label: "atherosclerosis",
      selected: false,
    },
    {
      count: 222,
      key: "atrial fibrillation",
      label: "atrial fibrillation",
      selected: true,
    },
    {
      count: 222,
      key: "benign prostatic hyperplasia",
      label: "benign prostatic hyperplasia",
      selected: true,
    },
  ],
};
