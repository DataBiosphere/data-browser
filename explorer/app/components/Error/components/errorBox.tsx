import React from "react";

interface ErrorBoxProps {
  message: string;
  title: string;
}

export const ErrorBox = ({ message, title }: ErrorBoxProps): JSX.Element => {
  return (
    <div>
      <p>{title}</p>
      <div>{message}</div>
    </div>
  );
};
