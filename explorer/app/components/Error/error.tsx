import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/button.styles";
import { AlertIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import {
  PRIORITY,
  StatusIcon,
} from "@clevercanary/data-explorer-ui/lib/components/common/StatusIcon/statusIcon";
import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  Error as CustomError,
  ErrorSection,
  SectionContent,
} from "./error.styles";

interface ErrorProps {
  rootPath?: string;
}

export const Error = ({ rootPath }: ErrorProps): JSX.Element => {
  return (
    <CustomError>
      <ErrorSection>
        <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
        <SectionContent>
          <Typography component="h1" variant="text-heading-xlarge">
            Error
          </Typography>
          <Typography variant="text-body-large-400">
            An error occurred processing your request
          </Typography>
        </SectionContent>
        {rootPath && (
          <SectionActions>
            <Link href={rootPath} passHref>
              <ButtonPrimary href="passHref">To Homepage</ButtonPrimary>
            </Link>
          </SectionActions>
        )}
      </ErrorSection>
    </CustomError>
  );
};
