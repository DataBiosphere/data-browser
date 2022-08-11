import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ROOT_URL } from "../../shared/constants";
import { ButtonPrimary } from "../common/Button/button.styles";
import { AlertIcon } from "../common/CustomIcon/components/AlertIcon/alertIcon";
import { PRIORITY, StatusIcon } from "../common/StatusIcon/statusIcon";
import { Error as CustomError, SectionContent } from "./error.styles";

export const Error = (): JSX.Element => {
  return (
    <CustomError>
      <StatusIcon priority={PRIORITY.HIGH} StatusIcon={AlertIcon} />
      <SectionContent>
        <Typography component="h1" variant="text-heading-xlarge">
          Error
        </Typography>
        <Typography variant="text-body-large-400">
          An error occurred processing your request
        </Typography>
      </SectionContent>
      {ROOT_URL && (
        <Link href={ROOT_URL} passHref>
          <ButtonPrimary href="passHref">To Homepage</ButtonPrimary>
        </Link>
      )}
    </CustomError>
  );
};
