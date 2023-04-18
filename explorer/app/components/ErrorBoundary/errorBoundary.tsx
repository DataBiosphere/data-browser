import React, { PropsWithChildren, PropsWithRef } from "react";

interface ErrorBoundaryState {
  error?: Error;
}

interface ErrorBoundaryProps {
  fallbackRender: (error: Error) => React.ReactNode;
}

type ErrorBoundaryPropsType = PropsWithRef<
  PropsWithChildren<ErrorBoundaryProps>
>;

export class ErrorBoundary extends React.Component<
  ErrorBoundaryPropsType,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryPropsType) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return this.props.fallbackRender(this.state.error);
    }

    return this.props.children;
  }
}
