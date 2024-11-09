import { Banner } from "@databiosphere/findable-ui/lib/components/common/Banner/components/SessionTimeout/sessionTimeout.styles";

export const SessionTimeout = ({ ...props }): JSX.Element => {
  return (
    <Banner {...props}>
      For your security, you have been logged out due to 15 minutes of
      inactivity.
    </Banner>
  );
};
