import { Link as EmailLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Contact } from "../../common/entities";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";
import { Section } from "../Section/section";
import { SectionContentListItem } from "../Section/section.styles";

interface Props {
  contacts?: Contact[];
}

export const Contacts = ({ contacts }: Props): JSX.Element => {
  return (
    <Section collapsable title="Contact">
      {contacts ? (
        contacts.map(({ email, institution, name }, c) => (
          <SectionContentListItem key={`${name}${c}`}>
            <Typography variant="text-body-500-2lines">{name}</Typography>
            {institution && <span>{institution}</span>}
            {email && (
              <Link href={`mailto:${email}`} passHref>
                <EmailLink>{email}</EmailLink>
              </Link>
            )}
          </SectionContentListItem>
        ))
      ) : (
        <SectionDetailsEmpty />
      )}
    </Section>
  );
};
