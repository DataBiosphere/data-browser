import NLink from "next/link";
import React from "react";
import { ButtonPrimary } from "../../button.styles";
import { CallToActionButton as CallToActionButtonProps } from "../../common/entities";

interface Props {
  callToAction: CallToActionButtonProps;
  className?: string;
}

export const CallToActionButton = ({
  callToAction,
  className,
}: Props): JSX.Element => {
  const { label, target, url } = callToAction;
  return (
    <NLink href={url} passHref>
      <ButtonPrimary
        className={className}
        href="passHref"
        rel="noopener"
        target={target}
      >
        {label}
      </ButtonPrimary>
    </NLink>
  );
};
