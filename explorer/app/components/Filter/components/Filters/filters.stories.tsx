// Core dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// App dependencies
import { Filters } from "./filters";
import {
  DefaultFilterMenu,
  DonorDiseaseFilterMenu,
} from "../FilterMenu/filterMenu.stories";

export default {
  argTypes: {
    categories: { control: { disable: true } },
    onFilter: { control: { disable: true } },
  },
  component: Filters,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/Filters",
} as ComponentMeta<typeof Filters>;

const Template: ComponentStory<typeof Filters> = (args) => (
  <Filters {...args} />
);

const onFilter = (): void => {
  // onFilter function
};

const defaultValues = [
  {
    count: 1,
    key: "item1",
    label: "Item 1",
    selected: false,
  },
  {
    count: 10,
    key: "item2",
    label: "Item 2",
    selected: false,
  },
];

export const DefaultFilters = Template.bind({});
DefaultFilters.args = {
  categories: [
    {
      isDisabled: false,
      key: "default1",
      label: "Default 1",
      values: defaultValues,
    },
    {
      isDisabled: false,
      key: "default2",
      label: "Default 2",
      values: DefaultFilterMenu.args?.values || defaultValues,
    },
    {
      isDisabled: true,
      key: "default3",
      label: "Default 3",
      values: defaultValues,
    },
    {
      isDisabled: false,
      key: "default4",
      label: "Default 4",
      values: defaultValues,
    },
  ],
  onFilter: onFilter,
};

export const SelectCategoriesFilters = Template.bind({});
SelectCategoriesFilters.args = {
  categories: [
    {
      isDisabled: false,
      key: "genusSpecies",
      label: "Genus Species",
      values: [
        {
          count: 12,
          key: "homoSapiens",
          label: "Homo sapiens",
          selected: false,
        },
        {
          count: 6,
          key: "musMusculus",
          label: "Mus musculus",
          selected: false,
        },
      ],
    },
    {
      isDisabled: false,
      key: "donorDisease",
      label: "Donor Disease",
      values: DonorDiseaseFilterMenu.args?.values || defaultValues,
    },
    {
      isDisabled: true,
      key: "anatomicalEntity",
      label: "Anatomical Entity",
      values: [
        {
          count: 12,
          key: "oralCavity",
          label: "oral cavity",
          selected: true,
        },
        {
          count: 6,
          key: "pancreas",
          label: "pancreas",
          selected: false,
        },
      ],
    },
  ],
  onFilter: onFilter,
};
