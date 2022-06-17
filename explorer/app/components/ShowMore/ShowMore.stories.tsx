import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShowMore } from "./ShowMore";
import { Contacts } from "../Contacts/contacts";

export default {
  title: "Components/ShowMore",
  component: ShowMore,
  argTypes: {
    lineHeight: { control: "number" },
    maxLines: { control: "number" },
    buttonLabelShow: { control: "text" },
    buttonLabelHide: { control: "text" },
  },
} as ComponentMeta<typeof ShowMore>;

const Template: ComponentStory<typeof ShowMore> = (args) => (
  <ShowMore {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  maxLines: 3,
  children: (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  ),
};

export const ContactsShowMore = Template.bind({});
ContactsShowMore.args = {
  maxLines: 3,
  buttonLabelShow: "Show More",
  buttonLabelHide: "Show Less",
  children: (
    <Contacts
      contacts={[
        {
          name: "Gervaise H Henry",
          email: "gervaise.henry@utsouthwestern.edu",
          institution: "UT Southwestern",
        },
        {
          name: "Gervaise H Henry2",
          email: "gervaise.henry@utsouthwestern.edu2",
          institution: "UT Southwestern2",
        },
      ]}
    />
  ),
};
