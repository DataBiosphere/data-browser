// Core dependencies
import { Link as EmailLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

// App dependencies
import { SectionContent } from "../Section/components/SectionContent/sectionContent";
import { SectionDetailsEmpty } from "../Section/components/SectionDetailsEmpty/sectionDetailsEmpty";

// Styles
import { SectionContentListItem } from "../Section/components/SectionContent/sectionContent.styles";

interface Contact {
  email?: string;
  institution?: string;
  name: string;
}

interface Props {
  contacts: Contact[];
}

export const Contacts = ({ contacts }: Props): JSX.Element => {
  return (
    <SectionContent gap={4}>
      {contacts.length > 0 ? (
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
    </SectionContent>
  );
};
