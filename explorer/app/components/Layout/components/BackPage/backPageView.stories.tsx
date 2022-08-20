import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ProjectCitation } from "../../../Project/components/Citation/citation.stories";
import { ProjectCollaboratingOrganizations } from "../../../Project/components/CollaboratingOrganizations/collaboratingOrganizations.stories";
import { ProjectContacts } from "../../../Project/components/Contacts/contacts.stories";
import { ProjectContributors } from "../../../Project/components/Contributors/contributors.stories";
import { ProjectDataCurators } from "../../../Project/components/DataCurators/dataCurators.stories";
import { ProjectDataReleasePolicy } from "../../../Project/components/DataReleasePolicy/dataReleasePolicy.stories";
import { ProjectDescription } from "../../../Project/components/Description/description.stories";
import { ProjectDetails } from "../../../Project/components/Details/details.stories";
import { ProjectPublications } from "../../../Project/components/Publications/publications.stories";
import { ProjectSupplementaryLinks } from "../../../Project/components/SupplementaryLinks/supplementaryLinks.stories";
import { BackPageView } from "./backPageView";
import { ProjectHero } from "./components/BackPageHero/backPageHero.stories";

export default {
  argTypes: {
    isDetailOverview: { control: "boolean" },
    mainColumn: { table: { disable: true } },
    sideColumn: { table: { disable: true } },
    top: { table: { disable: true } },
  },
  component: BackPageView,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/BackPage",
} as ComponentMeta<typeof BackPageView>;

const Template: ComponentStory<typeof BackPageView> = (args) => (
  <BackPageView {...args} />
);

export const HCAProject = Template.bind({});
HCAProject.args = {
  isDetailOverview: true,
  mainColumn: (
    <>
      <ProjectDescription
        projectDescription={
          ProjectDescription.args?.projectDescription || "None"
        }
      />
      <ProjectContacts {...ProjectContacts.args} />
      <ProjectPublications {...ProjectPublications.args} />
      <ProjectContributors {...ProjectContributors.args} />
      <ProjectCollaboratingOrganizations
        {...ProjectCollaboratingOrganizations.args}
      />
      <ProjectDataCurators {...ProjectDataCurators.args} />
      <ProjectCitation {...ProjectCitation.args} />
      <ProjectSupplementaryLinks {...ProjectSupplementaryLinks.args} />
      <ProjectDataReleasePolicy />
    </>
  ),
  sideColumn: (
    <>
      <ProjectDetails {...ProjectDetails.args} />
    </>
  ),
  top: (
    <>
      <ProjectHero {...ProjectHero.args} />
    </>
  ),
};
