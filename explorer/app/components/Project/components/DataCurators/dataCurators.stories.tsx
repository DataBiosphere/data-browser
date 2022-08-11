// Core dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// App dependencies
import { DataCurators } from "./dataCurators";

export default {
  argTypes: {
    dataCurators: { control: "array" },
  },
  component: DataCurators,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof DataCurators>;

const Template: ComponentStory<typeof DataCurators> = (args) => (
  <DataCurators {...args} />
);

export const ProjectDataCurators = Template.bind({});
ProjectDataCurators.args = {
  dataCurators: ["Schwartz Rachel", "William Sullivan", "Parisa Nejad"],
};
