import { ButtonPrimary } from "@clevercanary/data-explorer-ui/lib/components/common/Button/button.styles";
import { AlertIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/AlertIcon/alertIcon";
import { SectionActions } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import {
  PRIORITY,
  StatusIcon,
} from "@clevercanary/data-explorer-ui/lib/components/common/StatusIcon/statusIcon";
import { Typography } from "@mui/material";
import { AxiosError, isAxiosError } from "axios";
import Link from "next/link";
import React from "react";
import { ErrorBox } from "./components/errorBox";
import {
  Error as CustomError,
  ErrorSection,
  SectionContent,
} from "./error.styles";

interface ErrorProps {
  error?: Error | AxiosError;
  rootPath?: string;
}

export const Error = ({ error, rootPath }: ErrorProps): JSX.Element => {
  const { code, message, request } = isAxiosError(error)
    ? {
        ...error,
        code: error.response?.status,
        request: error.request.responseURL,
      }
    : { ...error, code: null, request: null };
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
        {code && <ErrorBox title="Error Code" message={`${code}`} />}
        {request && <ErrorBox title="Request URL" message={request} />}
        {message && <ErrorBox title="Error Message" message={message} />}
      </ErrorSection>
    </CustomError>
  );
};
